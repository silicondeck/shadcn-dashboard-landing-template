import { FAQList } from "./components/faq-list"
import { FeaturesGrid } from "./components/features-grid"

// Import data
import categoriesData from "./data/categories.json"
import faqsData from "./data/faqs.json"
import featuresData from "./data/features.json"

export default function FAQsPage() {
  return (
    <div className="px-4 lg:px-6">
      <FAQList faqs={faqsData} categories={categoriesData} />
      <FeaturesGrid features={featuresData} />
    </div>
  )
}
