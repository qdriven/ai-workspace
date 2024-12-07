"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Search, Filter, X } from "lucide-react"
import { useState, useEffect } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface Cheatsheet {
  slug: string
  title: string
  description: string
  category: string
  tags: string[]
  content: string
}

interface HomeProps {
  initialCheatsheets: Cheatsheet[]
  categories: string[]
  tags: string[]
}

export default function HomeClient({ initialCheatsheets, categories, tags }: HomeProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedTags, setSelectedTags] = useState<Set<string>>(new Set())
  const [filteredCheatsheets, setFilteredCheatsheets] = useState(initialCheatsheets)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false)

  // Filter cheatsheets based on search query, category, and tags
  useEffect(() => {
    let filtered = initialCheatsheets

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        cheatsheet =>
          (cheatsheet.title?.toLowerCase().includes(query) || '') ||
          (cheatsheet.description?.toLowerCase().includes(query) || '') ||
          (cheatsheet.content?.toLowerCase().includes(query) || '')
      )
    }

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter(
        cheatsheet => cheatsheet.category === selectedCategory
      )
    }

    // Filter by tags
    if (selectedTags.size > 0) {
      filtered = filtered.filter(
        cheatsheet => cheatsheet.tags.some(tag => selectedTags.has(tag))
      )
    }

    setFilteredCheatsheets(filtered)
  }, [searchQuery, selectedCategory, selectedTags, initialCheatsheets])

  const toggleTag = (tag: string) => {
    const newTags = new Set(selectedTags)
    if (newTags.has(tag)) {
      newTags.delete(tag)
    } else {
      newTags.add(tag)
    }
    setSelectedTags(newTags)
  }

  const clearFilters = () => {
    setSelectedCategory(null)
    setSelectedTags(new Set())
  }

  const FilterPanel = () => (
    <div className="space-y-6">
      <div>
        <h4 className="font-medium mb-4">Categories</h4>
        <div className="grid grid-cols-1 gap-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "secondary" : "ghost"}
              className="justify-start h-auto py-2 px-3"
              onClick={() => setSelectedCategory(selectedCategory === category ? null : category)}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      <div>
        <h4 className="font-medium mb-4">Tags</h4>
        <div className="grid grid-cols-1 gap-2">
          {tags.map((tag) => (
            <Button
              key={tag}
              variant={selectedTags.has(tag) ? "secondary" : "ghost"}
              className="justify-start h-auto py-2 px-3"
              onClick={() => toggleTag(tag)}
            >
              {tag}
            </Button>
          ))}
        </div>
      </div>
    </div>
  )

  const FilterPopover = () => (
    <div className="space-y-6">
      <div>
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-medium">Categories</h4>
          {(selectedCategory || selectedTags.size > 0) && (
            <Button variant="ghost" size="sm" onClick={clearFilters}>
              Clear all
            </Button>
          )}
        </div>
        <div className="grid grid-cols-4 gap-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "secondary" : "outline"}
              size="sm"
              className="h-auto py-2 truncate"
              onClick={() => setSelectedCategory(selectedCategory === category ? null : category)}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      <div>
        <h4 className="font-medium mb-4">Tags</h4>
        <div className="grid grid-cols-4 gap-2">
          {tags.map((tag) => (
            <Button
              key={tag}
              variant={selectedTags.has(tag) ? "secondary" : "outline"}
              size="sm"
              className="h-auto py-2 truncate"
              onClick={() => toggleTag(tag)}
            >
              {tag}
            </Button>
          ))}
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen flex">
      {/* Left Sidebar - Hidden on Mobile */}
      <aside className="hidden md:block w-64 p-6 border-r min-h-screen">
        <FilterPanel />
      </aside>

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section with Search */}
        <section className="py-20 px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Developer Cheatsheets</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Quick reference guides for developers
          </p>
          {/* Centered Search Box */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search cheatsheets..." 
                className="pl-8 pr-20" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <div className="absolute right-1 top-1">
                <Popover open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                  <PopoverTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Filter className="h-4 w-4" />
                      {(selectedCategory || selectedTags.size > 0) && (
                        <span className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full" />
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[320px] p-5" align="end">
                    <FilterPopover />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>
        </section>

        {/* Cheatsheets Grid */}
        <section className="max-w-4xl mx-auto px-4 pb-20">
          {/* Active Filters */}
          {(selectedCategory || selectedTags.size > 0) && (
            <div className="mb-6 flex flex-wrap gap-2">
              {selectedCategory && (
                <div className="flex items-center gap-2 px-2 py-1 bg-secondary rounded-md text-sm">
                  {selectedCategory}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-4 w-4 p-0"
                    onClick={() => setSelectedCategory(null)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              )}
              {Array.from(selectedTags).map(tag => (
                <div key={tag} className="flex items-center gap-2 px-2 py-1 bg-secondary rounded-md text-sm">
                  {tag}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-4 w-4 p-0"
                    onClick={() => toggleTag(tag)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
          )}

          {/* Results Count */}
          <div className="mb-6">
            <p className="text-sm text-muted-foreground">
              {filteredCheatsheets.length} {filteredCheatsheets.length === 1 ? 'result' : 'results'}
            </p>
          </div>

          {/* Cheatsheets Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCheatsheets.map((cheatsheet) => (
              <Link key={cheatsheet.slug} href={`/cheatsheets/${cheatsheet.slug}`}>
                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle>{cheatsheet.title}</CardTitle>
                        <CardDescription>{cheatsheet.description}</CardDescription>
                      </div>
                      <span className="px-2 py-1 text-sm bg-primary/10 rounded-md whitespace-nowrap">
                        {cheatsheet.category}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-2 flex-wrap">
                      {cheatsheet.tags?.length > 0 ? (
                        cheatsheet.tags.map((tag: string) => (
                          <span
                            key={tag}
                            className="px-2 py-1 bg-secondary text-secondary-foreground rounded-md text-sm"
                          >
                            {tag}
                          </span>
                        ))
                      ) : (
                        <span className="text-sm text-muted-foreground">No tags</span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
