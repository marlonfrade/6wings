'use client'

import { useState, useEffect } from 'react'
import Typography from '@/components/typography'
import {
  CategoriesTabs,
  IconCardSkeleton
} from '@/components/products-showcase/categoriesTabs'
import { getCategoryIcon } from '@/components/products-showcase/categories/categoryIcons'
import { Category, getCategories } from '@/services/categoryService'
import { useTranslations } from 'next-intl'
import SubCategoriesTabs from './subCategoriesTabs'

export const ProductsShowcase = () => {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState<Category | null>(null)
  const t = useTranslations('homepage.products-showcase')

  // Buscar categorias
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true)
        const data = await getCategories()
        setCategories(data)

        // Define a primeira categoria como ativa por padrão
        if (data.length > 0) {
          setActiveCategory(data[0])
        }
      } catch (error) {
        console.error('Erro ao buscar categorias:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchCategories()
  }, [])

  const handleCategorySelect = (category: Category) => {
    setActiveCategory(category)
  }

  return (
    <section className="container mx-auto mt-20 px-4">
      <Typography color="primary" className="text-center" variant="h1">
        {t.rich('title', {
          highlight: (chunks) => <span className="text-primary">{chunks}</span>
        })}
      </Typography>

      <div className="mt-10 flex flex-nowrap justify-center lg:space-x-[112px]">
        {loading ? (
          Array(4)
            .fill(0)
            .map((_, index) => <IconCardSkeleton key={index} />)
        ) : (
          <CategoriesTabs
            items={categories.map((category) => ({
              id: category.id,
              icon: getCategoryIcon(false, category.nome),
              iconComponent: (active) => getCategoryIcon(active, category.nome),
              label: category.nome
            }))}
            defaultSelected={activeCategory?.id}
            onSelect={(id) =>
              id
                ? handleCategorySelect(
                    categories.find((cat) => cat.id === id) as Category
                  )
                : null
            }
          />
        )}
      </div>

      {activeCategory && (
        <div className="mt-16 flex flex-col lg:flex-row">
          <div className="w-full">
            <Typography color="primary" className="mb-6" variant="h2">
              <span className="text-primary">{activeCategory.nome}</span> para
              você
            </Typography>

            <SubCategoriesTabs
              key={activeCategory.id}
              categoryId={
                activeCategory.id ? parseInt(activeCategory.id) : undefined
              }
            />
          </div>
        </div>
      )}
    </section>
  )
}
