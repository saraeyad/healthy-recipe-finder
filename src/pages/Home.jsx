import Hero from '../components/marketing/Hero'
import RecipeMarquee from '../components/marketing/RecipeMarquee'
import HowItWorks from '../components/marketing/HowItWorks'
import FeatureBento from '../components/marketing/FeatureBento'
import RealLife from '../components/marketing/RealLife'
import Commitments from '../components/marketing/Commitments'
import CTA from '../components/CTA'

function Home() {
  return (
    <div>
      <Hero />
      <RecipeMarquee />
      <HowItWorks />
      <FeatureBento />
      <RealLife />
      <Commitments />
      <CTA />
    </div>
  )
}

export default Home
