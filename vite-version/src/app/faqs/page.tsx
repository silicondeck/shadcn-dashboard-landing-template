import { BaseLayout } from "@/components/layouts/base-layout"
import { FAQList } from "./components/faq-list"
import { FeaturesGrid } from "./components/features-grid"

// Import data
import categoriesData from "./data/categories.json"
import faqsData from "./data/faqs.json"
import featuresData from "./data/features.json"

export default function FAQsPage() {
  return (
    <BaseLayout title="Frequently Asked Questions" description="Everything you need to know about our different services.">
      <div className="px-4 lg:px-6">
        <FAQList faqs={faqsData} categories={categoriesData} />
        <FeaturesGrid features={featuresData} />
      </div>
    </BaseLayout>
  )
}
