import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

// ESM workaround for __dirname
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const pagesDir = path.resolve(__dirname, '../pages')
const componentsDir = path.resolve(__dirname, '../components')
const contentItemsPath = path.resolve(__dirname, '../const/contentItems.ts')
const outputFile = path.resolve(__dirname, '../const/sitemapData.json')

/** Recursively find all .vue files in a directory */
function getVueFiles(dir, fileList = []) {
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
function extractImages(content) {
    const images = []
    const tagRegex = /<(?:NuxtPicture|NuxtImg|video|img)([^>]+)>/g
    let match
    while ((match = tagRegex.exec(content)) !== null) {
        const attrs = match[1]
        const srcMatch = attrs.match(/(?:src|poster)=["']([^"']+)["']/)

        if (srcMatch) {
            const src = srcMatch[1]
            if (src && !src.startsWith('data:') && !src.startsWith('http')) {
                images.push({
                    loc: src.startsWith('/') ? src : `/${src}`,
                    caption: attrs.match(/alt=["']([^"']+)["']/)?.[1],
                    title: attrs.match(/title=["']([^"']+)["']/)?.[1]
                })
            }
        }
    }
    return images
}

/** Resolve component file content by name */
function getComponentContent(compName) {
    const candidates = [
        path.resolve(componentsDir, `${compName}.vue`),
        path.resolve(componentsDir, compName, 'index.vue')
    ]
    const found = candidates.find(p => fs.existsSync(p))
    return found ? fs.readFileSync(found, 'utf-8') : null
}

/** Parse contentItems from the TypeScript file */
function parseContentItems() {
    const content = fs.readFileSync(contentItemsPath, 'utf-8')
    const items = []

    // Match each object in the array
    const itemRegex = /\{\s*name:[^}]*link:\s*['"]([^'"]+)['"][^}]*(?:lastmod:\s*['"]([^'"]+)['"])?[^}]*(?:image:\s*['"]([^'"]+)['"])?[^}]*\}/gs
    let match

    while ((match = itemRegex.exec(content)) !== null) {
        const fullMatch = match[0]

        // Extract link
        const linkMatch = fullMatch.match(/link:\s*['"]([^'"]+)['"]/)
        if (!linkMatch) continue

        // Extract lastmod if present
        const lastmodMatch = fullMatch.match(/lastmod:\s*['"]([^'"]+)['"]/)

        // Extract image if present
        const imageMatch = fullMatch.match(/image:\s*['"]([^'"]+)['"]/)

        items.push({
            link: linkMatch[1],
            lastmod: lastmodMatch?.[1],
            image: imageMatch?.[1]
        })
    }

    return items
}

function generateSitemapData() {
    const files = getVueFiles(pagesDir)
    const contentItems = parseContentItems()
    const sitemapEntries = []

    for (const filePath of files) {
        let route = '/' + path.relative(pagesDir, filePath).replace(/\\/g, '/').replace(/\.vue$/, '')
        if (route.endsWith('/index')) route = route.slice(0, -6) || '/'

        // Skip dynamic routes
        if (route.includes('[') || route.includes(']')) continue

        const contentItem = contentItems.find(item => item.link === route)
        const content = fs.readFileSync(filePath, 'utf-8')

        // Extract images from page
        const images = extractImages(content)

        // Scan components used in this page
        const compRegex = /<([A-Z][a-zA-Z0-9]+)\b/g
        const processedDeps = new Set()
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

        // Add featured image from contentItems if not already present
        if (contentItem?.image) {
            const imageLoc = contentItem.image.startsWith('/') ? contentItem.image : `/${contentItem.image}`
            if (!images.some(i => i.loc === imageLoc)) {
                images.unshift({ loc: imageLoc })
            }
        }

        sitemapEntries.push({
            loc: route,
            lastmod: contentItem?.lastmod,
            images
        })
    }

    // Write to JSON file
    fs.writeFileSync(outputFile, JSON.stringify(sitemapEntries, null, 2))
    console.log(`✅ Generated sitemap data with ${sitemapEntries.length} entries to ${outputFile}`)
}

generateSitemapData()
