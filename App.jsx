import { BrowserRouter } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { NavigationMenu } from "@shopify/app-bridge-react";
import Routes from "./Routes";
import { AppBody, MainContent } from "./components/common/commonStyle";
import {
  AppBridgeProvider,
  QueryProvider,
  PolarisProvider,
  Sidebar,
} from "./components";

export default function App() {
  // Any .tsx or .jsx files in /pages will become a route
  // See documentation for <Routes /> for more info
  const pages = import.meta.globEager("./pages/**/!(*.test.[jt]sx)*.([jt]sx)");
  const { t } = useTranslation();

  return (
    <PolarisProvider>
      <BrowserRouter>
        <AppBridgeProvider>
          <QueryProvider>
            <NavigationMenu
              navigationLinks={[
                {
                  label: t("NavigationMenu.pageName"),
                  destination: "/pagename",
                },
              ]}
            />
            <AppBody>
              <Sidebar />
              <MainContent>
                <Routes pages={pages} />
              </MainContent>
            </AppBody>
          </QueryProvider>
        </AppBridgeProvider>
      </BrowserRouter>
    </PolarisProvider>
  );
}
