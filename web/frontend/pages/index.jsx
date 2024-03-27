import { useAppBridge } from "@shopify/app-bridge-react"
import React, { lazy, Suspense } from "react"

const Dashboard = lazy(() => import("../components/Dashboard/Dashboard.jsx"))

export default function HomePage() {
  const app = useAppBridge()

  return (
    <Suspense fallback={null}>
      <Dashboard app={app} />
    </Suspense>
  )
}
