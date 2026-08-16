#!/usr/bin/env node
/**
 * Capture a mobile (iPhone) viewport screenshot of a URL.
 * Usage: node mobile-screenshot.mjs <url> <output.png>
 */
import { spawn } from 'node:child_process'
import { existsSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { mkdir } from 'node:fs/promises'

const url = process.argv[2]
const outArg = process.argv[3]

if (!url || !outArg) {
  console.error('Usage: node mobile-screenshot.mjs <url> <output.png>')
  process.exit(1)
}

const outPath = resolve(outArg)
const viewport = { width: 390, height: 844, deviceScaleFactor: 2 }
const userAgent =
  'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1'

const chromeCandidates = [
  process.env.CHROME_PATH,
  '/usr/bin/google-chrome',
  '/usr/bin/google-chrome-stable',
  '/usr/bin/chromium-browser',
  '/usr/bin/chromium',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
].filter(Boolean)

const chromePath = chromeCandidates.find((p) => existsSync(p))
if (!chromePath) {
  console.error('Chrome/Chromium not found. Set CHROME_PATH.')
  process.exit(1)
}

const port = 9222 + Math.floor(Math.random() * 100)
const userDataDir = `/tmp/chrome-screenshot-${Date.now()}`
const chrome = spawn(
  chromePath,
  [
    '--headless=new',
    '--disable-gpu',
    '--no-sandbox',
    '--disable-setuid-sandbox',
    '--hide-scrollbars',
    `--user-data-dir=${userDataDir}`,
    `--remote-debugging-port=${port}`,
    `--window-size=${viewport.width},${viewport.height}`,
    `--user-agent=${userAgent}`,
  ],
  { stdio: 'ignore' }
)

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

async function waitForCdp(retries = 40) {
  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(`http://127.0.0.1:${port}/json/version`)
      if (res.ok) return await res.json()
    } catch {
      // chrome still starting
    }
    await sleep(250)
  }
  throw new Error('Chrome DevTools not ready')
}

try {
  const version = await waitForCdp()
  const ws = new WebSocket(version.webSocketDebuggerUrl)
  await new Promise((resolveWs, rejectWs) => {
    ws.addEventListener('open', resolveWs)
    ws.addEventListener('error', rejectWs)
  })

  let id = 1
  const send = (method, params, sessionId) =>
    new Promise((res, rej) => {
      const currentId = id++
      const onMessage = (event) => {
        const msg = JSON.parse(event.data)
        if (msg.id === currentId) {
          ws.removeEventListener('message', onMessage)
          if (msg.error) rej(new Error(JSON.stringify(msg.error)))
          else res(msg.result)
        }
      }
      ws.addEventListener('message', onMessage)
      ws.send(JSON.stringify({ id: currentId, method, params, sessionId }))
    })

  const { targetId } = await send('Target.createTarget', { url: 'about:blank' })
  const { sessionId } = await send('Target.attachToTarget', { targetId, flatten: true })
  const s = (method, params) => send(method, params, sessionId)

  await s('Emulation.setDeviceMetricsOverride', {
    width: viewport.width,
    height: viewport.height,
    deviceScaleFactor: viewport.deviceScaleFactor,
    mobile: true,
  })
  await s('Emulation.setTouchEmulationEnabled', { enabled: true })
  await s('Network.setUserAgentOverride', { userAgent })
  await s('Page.enable')
  await s('Page.navigate', { url })

  await new Promise((resolveNav) => {
    const onMessage = (event) => {
      const msg = JSON.parse(event.data)
      if (msg.method === 'Page.loadEventFired' && msg.sessionId === sessionId) {
        ws.removeEventListener('message', onMessage)
        resolveNav()
      }
    }
    ws.addEventListener('message', onMessage)
  })

  await sleep(4000)

  await s('Runtime.evaluate', {
    expression: `
      (() => {
        const buttons = [...document.querySelectorAll('button, a, [role="button"]')];
        const reject = buttons.find((el) =>
          /ablehnen|reject|odrzuc|decline|nie zgadzam/i.test(el.textContent || '')
        );
        if (reject) reject.click();
        const closeInstall = buttons.find((el) => {
          const t = ((el.getAttribute('aria-label') || '') + ' ' + (el.textContent || '')).trim();
          return /^(×|✕|x|close|schließen|zamknij)$/i.test(t);
        });
        if (closeInstall) closeInstall.click();
        document.querySelectorAll(
          '#cc-main, .cm-wrapper, [id*="cookie"], [class*="cookie"], [class*="Cookie"]'
        ).forEach((el) => el.remove());
        document.querySelectorAll('[class*="install"], [id*="install"], [class*="pwa"]').forEach((el) => {
          const t = el.textContent || '';
          if (/installieren|startbildschirm|add to home|zainstaluj/i.test(t)) el.remove();
        });
        document.querySelectorAll('button, a, div, span').forEach((el) => {
          const t = (el.getAttribute('aria-label') || '') + ' ' + (el.textContent || '');
          if (/cookie/i.test(t) && el.getBoundingClientRect().width < 80) el.remove();
        });
      })()
    `,
  })

  await sleep(1200)

  const { data } = await s('Page.captureScreenshot', {
    format: 'png',
    fromSurface: true,
    captureBeyondViewport: false,
  })

  await mkdir(dirname(outPath), { recursive: true })
  writeFileSync(outPath, Buffer.from(data, 'base64'))
  console.log(`Saved ${outPath}`)
  ws.close()
} finally {
  chrome.kill('SIGTERM')
}
