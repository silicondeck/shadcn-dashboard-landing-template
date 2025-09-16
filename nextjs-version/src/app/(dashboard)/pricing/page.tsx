import { PricingPlans } from "@/components/pricing-plans"
import { FeaturesGrid } from "./components/features-grid"
import { FAQSection } from "./components/faq-section"

// Import data
import featuresData from "./data/features.json"
import faqsData from "./data/faqs.json"

export default function PricingPage() {
  return (
    <div className="px-4 lg:px-6">
      {/* Pricing Cards */}
      <section className='pb-12' id='pricing'>
        <PricingPlans mode="pricing" />
      </section>

      {/* Features Section */}
      <FeaturesGrid features={featuresData} />

      {/* FAQ Section */}
      <FAQSection faqs={faqsData} />
    </div>
  )
}
