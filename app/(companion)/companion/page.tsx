import { SearchInput } from '@/components/companion/search-input'
import prismadb from '@/lib/prismadb'
import Category from '@/components/companion/category'

const CompanionPage = async () => {
  const categories = await prismadb.category.findMany()
  

  return (
    <div className="h-full p-4 space-y-2">
      <SearchInput />
      <Category data={categories} />
    </div>
  )
}

export default CompanionPage