import { contentItems } from '../../const/contentItems'
import fs from 'node:fs'
import path from 'node:path'

interface SitemapImage { loc: string; caption?: string; title?: string }
interface SitemapEntry { loc: string; lastmod?: string; images: SitemapImage[] }

// --- Helpers ---

/** Recursively find all .vue files in a directory */
function getVueFiles(dir: string, fileList: string[] = []): string[] {
  const files = fs.readdirSync(dir)
  for (const file of files) {
    if (file.startsWith('.')) continue
    const filePath = path.join(dir, file)
    if (fs.statSync(filePath).isDirectory()) {
      getVueFiles(filePath, fileList)
    } else if (file.endsWith('.vue')) {
      fileList.push(filePath)
    }
  }
  return fileList
}

/** Extract images from HTML/Vue template content */
function extractImages(content: string): SitemapImage[] {
  const images: SitemapImage[] = []
  // Matches full tags: <tag ... >
  const tagRegex = /<(?:NuxtPicture|NuxtImg|video|img)([^>]+)>/g
  let match
  while ((match = tagRegex.exec(content)) !== null) {
    const attrs = match[1]
    // Capture src or poster attributes
    const srcMatch = attrs.match(/(?:src|poster)=["']([^"']+)["']/)
    
    if (srcMatch) {
      const src = srcMatch[1]
      // Skip data URIs and external links
      if (src && !src.startsWith('data:') && !src.startsWith('http')) {
        images.push({
          loc: src,
          caption: attrs.match(/alt=["']([^"']+)["']/)?.[1],
          title: attrs.match(/title=["']([^"']+)["']/)?.[1]
        })
      }
    }
  }
  return images
}

/** Resolve component file content by name */
function getComponentContent(compName: string): string | null {
  // Look for components/Name.vue or components/Name/index.vue
  const candidates = [
    path.resolve(process.cwd(), 'components', `${compName}.vue`),
    path.resolve(process.cwd(), 'components', compName, 'index.vue')
  ]
  const found = candidates.find(p => fs.existsSync(p))
  return found ? fs.readFileSync(found, 'utf-8') : null
}

// --- Main Handler ---

export default defineEventHandler(async () => {
  const pagesDir = path.resolve(process.cwd(), 'pages')
  const files = getVueFiles(pagesDir)
  const sitemapEntries: SitemapEntry[] = []

  for (const filePath of files) {
    // Generate route from file path
    let route = '/' + path.relative(pagesDir, filePath).replace(/\\/g, '/').replace(/\.vue$/, '')
    if (route.endsWith('/index')) route = route.slice(0, -6) || '/'
    
    // Skip dynamic/ignored routes
    if (route.includes('[') || route.includes(']')) continue

    const contentItem = contentItems.find(item => item.link === route)
    const content = fs.readFileSync(filePath, 'utf-8')
    
    // 1. Extract images from the page
    const images = extractImages(content)

    // 2. Scan for components used in this page to extract their images
    // Regex matches <PascalCaseComponent ...
    const compRegex = /<([A-Z][a-zA-Z0-9]+)\b/g
    const processedDeps = new Set<string>()
    let compMatch
    while ((compMatch = compRegex.exec(content)) !== null) {
      const compName = compMatch[1]
      if (processedDeps.has(compName)) continue
      processedDeps.add(compName)
      
      const compContent = getComponentContent(compName)
      if (compContent) {
        images.push(...extractImages(compContent))
      }
    }

    // 3. Add featured image from metadata if missing
    if (contentItem?.image && !images.some(i => i.loc === contentItem.image)) {
        images.unshift({ 
            loc: contentItem.image, 
            title: typeof contentItem.name === 'string' ? contentItem.name : undefined 
        })
    }

    if (images.length || contentItem?.lastmod) {
      sitemapEntries.push({
        loc: route,
        lastmod: contentItem?.lastmod,
        images
      })
    }
  }

  return sitemapEntries
})
