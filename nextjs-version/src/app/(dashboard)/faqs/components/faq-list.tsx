"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { cn } from "@/lib/utils"
import { Search } from "lucide-react"

interface FAQ {
  id: number
  question: string
  answer: string
  category: string
}

interface Category {
  name: string
  count: number
}

interface FAQListProps {
  faqs: FAQ[]
  categories: Category[]
}

export function FAQList({ faqs, categories }: FAQListProps) {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")

  // Filter FAQs based on selected category and search query
  const filteredFaqs = faqs.filter(faq => {
    const matchesCategory = selectedCategory === "All" || faq.category === selectedCategory
    const matchesSearch = searchQuery === "" || 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="grid grid-cols-1 lg:grid-cols-6 xl:grid-cols-4 gap-6">
      {/* Categories Sidebar */}
      <Card className="lg:col-span-2 xl:col-span-1">
        <CardHeader>
          <CardTitle className="text-lg">Categories</CardTitle>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search FAQs..." 
              className="pl-10 cursor-pointer"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </CardHeader>
        <CardContent className="space-y-2">
          {categories.map((category) => (
            <div
              key={category.name}
              className={cn(
                "flex items-center justify-between px-3 py-2 rounded-lg hover:bg-muted cursor-pointer transition-colors group",
                selectedCategory === category.name && "bg-muted"
              )}
              onClick={() => setSelectedCategory(category.name)}
            >
              <span className="font-medium">{category.name}</span>
              <Badge 
                variant="secondary" 
                className={cn(
                  "transition-colors",
                  selectedCategory === category.name && "bg-background"
                )}
              >
                {category.name === "All" ? faqs.length : category.count}
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* FAQs List */}
      <div className="lg:col-span-4 xl:col-span-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">
              {selectedCategory === "All" ? "All FAQs" : `${selectedCategory} FAQs`}
              <span className="text-sm font-normal text-muted-foreground ml-2">
                ({filteredFaqs.length} {filteredFaqs.length === 1 ? 'question' : 'questions'})
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[570px] pr-4">
              {filteredFaqs.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <p>No FAQs found matching your search criteria.</p>
                </div>
              ) : (
                <Accordion type='single' className='space-y-4' defaultValue="item-1">
                  {filteredFaqs.map((item) => (
                    <AccordionItem 
                      key={item.id}  
                      value={`item-${item.id}`} 
                      className='rounded-md !border'
                    >
                      <AccordionTrigger className='cursor-pointer px-4 hover:no-underline'>
                        <div className="flex items-start text-left">
                          <span>{item.question}</span>
                          <Badge variant="outline" className="ms-3 mt-0.5 shrink-0 text-xs">
                            {item.category}
                          </Badge>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className='text-muted-foreground px-4'>
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              )}
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
