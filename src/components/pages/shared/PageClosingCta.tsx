import BusinessClosingCta from '@/components/pages/business/BusinessClosingCta'
import { pageClosingCtaDefaults, type PageClosingCtaData } from '@/lib/cta/defaults'

type PageClosingCtaProps = Partial<PageClosingCtaData>

export default function PageClosingCta({
  title = pageClosingCtaDefaults.title,
  primaryCta = pageClosingCtaDefaults.primaryCta,
  secondaryCta = pageClosingCtaDefaults.secondaryCta,
  showSecondaryCta = pageClosingCtaDefaults.showSecondaryCta,
}: PageClosingCtaProps) {
  return (
    <BusinessClosingCta
      title={title}
      primaryCta={primaryCta}
      secondaryCta={secondaryCta}
      showSecondaryCta={showSecondaryCta}
      variant="glass"
    />
  )
}
