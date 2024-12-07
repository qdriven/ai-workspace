import { promises as fs } from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { notFound } from 'next/navigation'
import { Markdown } from '@/components/markdown'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import remarkToc from 'remark-toc'
import remarkGfm from 'remark-gfm'

interface PageProps {
  params: {
    slug: string
  }
}

interface TOCItem {
  id: string
  text: string
  level: number
}

function extractTOC(content: string): TOCItem[] {
  const headings: TOCItem[] = []
  const lines = content.split('\n')
  
  lines.forEach(line => {
    const match = line.match(/^(#{1,6})\s+(.+)$/)
    if (match) {
      const level = match[1].length
      const text = match[2]
      const id = text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')
      
      headings.push({ id, text, level })
    }
  })
  
  return headings
}

async function getCheatsheetFromSlug(slug: string) {
  try {
    const filePath = path.join(process.cwd(), 'src/content/cheatsheets', `${slug}.md`)
    const fileContents = await fs.readFile(filePath, 'utf8')
    const { data, content } = matter(fileContents)
    
    return {
      metadata: {
        title: data.title || '',
        description: data.description || '',
        category: data.category || 'Uncategorized',
        tags: data.tags || []
      },
      content
    }
  } catch (error) {
    return null
  }
}

export async function generateStaticParams() {
  const cheatsheetsDirectory = path.join(process.cwd(), 'src/content/cheatsheets')
  const filenames = await fs.readdir(cheatsheetsDirectory)
  
  return filenames.map((filename) => ({
    slug: filename.replace('.md', ''),
  }))
}

export default async function Page({ params }: PageProps) {
  const cheatsheet = await getCheatsheetFromSlug(params.slug)

  if (!cheatsheet) {
    notFound()
  }

  const toc = extractTOC(cheatsheet.content)

  return (
    <article className="container max-w-4xl py-8 mx-auto px-4">
      <div className="space-y-4 mb-8">
        <h1 className="text-4xl font-bold">{cheatsheet.metadata.title}</h1>
        {cheatsheet.metadata.description && (
          <p className="text-lg text-muted-foreground">{cheatsheet.metadata.description}</p>
        )}
        <div className="flex gap-2 flex-wrap">
          <span className="px-2 py-1 text-sm bg-primary/10 rounded-md">
            {cheatsheet.metadata.category}
          </span>
          {cheatsheet.metadata.tags?.map((tag: string) => (
            <span
              key={tag}
              className="px-2 py-1 text-sm bg-secondary text-secondary-foreground rounded-md"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Table of Contents */}
        {toc.length > 0 && (
          <aside className="md:w-64 flex-shrink-0">
            <div className="sticky top-4">
              <h2 className="text-lg font-semibold mb-4">Table of Contents</h2>
              <nav className="space-y-2">
                {toc.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className="block text-muted-foreground hover:text-foreground transition-colors"
                    style={{ paddingLeft: `${(item.level - 1) * 12}px` }}
                  >
                    {item.text}
                  </a>
                ))}
              </nav>
            </div>
          </aside>
        )}

        {/* Content */}
        <div className="prose prose-zinc dark:prose-invert max-w-none flex-1">
          <Markdown
            content={cheatsheet.content}
            options={{
              remarkPlugins: [
                remarkGfm,
                [remarkToc, { heading: 'table of contents' }]
              ],
              rehypePlugins: [
                rehypeSlug,
                [rehypeAutolinkHeadings, { behavior: 'wrap' }]
              ],
            }}
          />
        </div>
      </div>
    </article>
  )
}
