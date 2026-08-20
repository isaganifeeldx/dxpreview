import Image from 'next/image'
import Link from 'next/link'
import type { InspirationItem } from '@/lib/inspiration/types'

type InspirationCardProps = {
  item: InspirationItem
}

export default function InspirationCard({ item }: InspirationCardProps) {
  return (
    <Link
      href={`/inspiration/${item.slug}`}
      className="group relative block overflow-hidden rounded-[8px] bg-[#E8ECF2] outline-none focus-visible:ring-2 focus-visible:ring-[#2A3040]/30 focus-visible:ring-offset-2"
    >
      <article>
        <div className="relative aspect-[4/3] w-full overflow-hidden">
          <Image
            src={item.image}
            alt={item.imageAlt}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
        </div>
        <span className="sr-only">{item.title}</span>
      </article>
    </Link>
  )
}
