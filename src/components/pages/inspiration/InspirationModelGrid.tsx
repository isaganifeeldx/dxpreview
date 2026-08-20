import Image from 'next/image'
import type { InspirationModel } from '@/lib/inspiration/types'

type InspirationModelGridProps = {
  models: InspirationModel[]
  intro: string
}

export default function InspirationModelGrid({ models, intro }: InspirationModelGridProps) {
  return (
    <section className="glass-panel !rounded-[16px] !p-4 sm:!p-6">
      <h2 className="text-[18px] font-semibold text-[#2A3040] sm:text-[20px]">
        3D models ({models.length})
      </h2>
      <p className="mt-2 max-w-[720px] text-[13px] leading-relaxed text-[#696969] sm:text-[14px]">
        {intro}
      </p>

      <div className="mt-5 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-2">
        {models.map((model) => (
          <article
            key={model.id}
            className="overflow-hidden rounded-[8px] border border-[#ECEEF2] bg-[#F4F6FA]"
          >
            <div className="relative h-[250px] w-full overflow-hidden bg-[#E8ECF2]">
              <Image
                src={model.image}
                alt={model.imageAlt}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 240px"
                className="object-cover"
              />
            </div>
            <p className="px-3 py-2.5 text-[12px] leading-snug text-[#2A3040] sm:text-[13px]">
              {model.title}
            </p>
          </article>
        ))}
      </div>
    </section>
  )
}
