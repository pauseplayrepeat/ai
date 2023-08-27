import { SearchInput } from '@/components/companion/search-input'
import prismadb from '@/lib/prismadb'
import Category from '@/components/companion/category'
import { Companions } from '@/components/companion/companions'

interface CompanionPageProps {
  searchParams: {
      categoryId: string;
      name: string;
  }
} 

const CompanionPage = async ({
  searchParams
}: CompanionPageProps) => {

  const data = await prismadb.companion.findMany({
    where: {
      category: {
        id: searchParams.categoryId,
      },
      name: {
        search: searchParams.name
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      _count: {
        select: {
          messages: true,
        },
      },
    }
  })

  const categories = await prismadb.category.findMany()
  

  return (
    <div className="h-full p-4 space-y-2">
      <SearchInput />
      <Category data={categories} />
      <Companions data={data}/>
    </div>
  )
}

export default CompanionPage