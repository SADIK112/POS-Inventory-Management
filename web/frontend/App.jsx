import { NavigationMenu } from "@shopify/app-bridge-react"
import { useTranslation } from "react-i18next"
import { BrowserRouter } from "react-router-dom"
import Routes from "./Routes.jsx"

import {
  AppBridgeProvider,
  PolarisProvider,
  QueryProvider
} from "./components/index.js"
import { PayPosContextProvider } from "./components/providers/PayPosContext.jsx"

export default function App() {
  // Any .tsx or .jsx files in /pages will become a route
  // See documentation for <Routes /> for more info
  const pages = import.meta.globEager("./pages/**/!(*.test.[jt]sx)*.([jt]sx)")
  const { t } = useTranslation()

  return (
    <PolarisProvider>
      <BrowserRouter>
        <AppBridgeProvider>
          <QueryProvider>
            <PayPosContextProvider>
              <NavigationMenu
                navigationLinks={[
                  {
                    label: t("NavigationMenu.pageName"),
                    destination: "/pagename"
                  }
                ]}
              />
              <Routes pages={pages} />
            </PayPosContextProvider>
          </QueryProvider>
        </AppBridgeProvider>
      </BrowserRouter>
    </PolarisProvider>
  )
}
