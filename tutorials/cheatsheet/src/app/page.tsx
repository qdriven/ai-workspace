import { promises as fs } from 'fs'
import path from 'path'
import matter from 'gray-matter'
import HomeClient from '@/components/home-client'

interface Cheatsheet {
  slug: string
  title: string
  description: string
  category: string
  tags: string[]
  content: string
}

async function getCheatsheets() {
  const cheatsheetsDirectory = path.join(process.cwd(), 'src/content/cheatsheets')
  const filenames = await fs.readdir(cheatsheetsDirectory)
  
  const cheatsheets = await Promise.all(
    filenames.map(async (filename) => {
      const filePath = path.join(cheatsheetsDirectory, filename)
      const fileContents = await fs.readFile(filePath, 'utf8')
      const { data, content } = matter(fileContents)
      
      return {
        slug: filename.replace('.md', ''),
        title: data.title || '',
        description: data.description || '',
        category: data.category || 'Uncategorized',
        tags: data.tags || [],
        content: content || '', 
      }
    })
  )

  // Get unique categories and tags
  const categories = Array.from(new Set(cheatsheets.map(c => c.category)))
  const tags = Array.from(new Set(cheatsheets.flatMap(c => c.tags)))

  return {
    cheatsheets,
    categories,
    tags
  }
}

export default async function Home() {
  const { cheatsheets, categories, tags } = await getCheatsheets()
  
  return <HomeClient initialCheatsheets={cheatsheets} categories={categories} tags={tags} />
}