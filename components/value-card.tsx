import { LucideIcon } from 'lucide-react'

interface ValueCardProps {
  icon: LucideIcon
  title: string
  description: string
}

export function ValueCard({ icon: Icon, title, description }: ValueCardProps) {
  return (
    <div className="text-center">
      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary">
        <Icon className="h-8 w-8 text-white" />
      </div>
      <h3 className="mb-2 font-serif text-xl font-bold text-foreground">
        {title}
      </h3>
      <p className="text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>
    </div>
  )
}
