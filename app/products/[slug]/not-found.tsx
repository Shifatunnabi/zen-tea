import Link from 'next/link'
import { ArrowLeft, Package } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function ProductNotFound() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-center px-4 py-24 text-center sm:px-6 lg:px-8">
        <Package className="mb-6 h-20 w-20 text-muted-foreground/40" />
        <h1 className="mb-3 font-serif text-3xl font-bold text-foreground">
          Product Not Found
        </h1>
        <p className="mb-8 max-w-md text-lg text-muted-foreground">
          The product you are looking for does not exist or may have been removed.
        </p>
        <Link href="/products">
          <Button className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Products
          </Button>
        </Link>
      </div>
    </div>
  )
}
