import { BaseLayout } from "@/components/layouts/base-layout"
import { ChartAreaInteractive } from "./components/chart-area-interactive"
import { DataTable } from "./components/data-table"
import { SectionCards } from "./components/section-cards"

import data from "./data/data.json"
import pastPerformanceData from "./data/past-performance-data.json"
import keyPersonnelData from "./data/key-personnel-data.json"
import focusDocumentsData from "./data/focus-documents-data.json"

export default function Page() {
  return (
    <BaseLayout title="Dashboard" description="Welcome to your admin dashboard">
        <div className="@container/main px-4 lg:px-6 space-y-6">
          <SectionCards />
          <ChartAreaInteractive />
        </div>
        <div className="@container/main">
          <DataTable 
            data={data} 
            pastPerformanceData={pastPerformanceData}
            keyPersonnelData={keyPersonnelData}
            focusDocumentsData={focusDocumentsData}
          />
        </div>
    </BaseLayout>
  )
}
