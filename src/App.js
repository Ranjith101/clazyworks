import { ColorModeContext, useMode } from "./components/dashboard/theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import { MyProSidebarProvider } from "./components/dashboard/pages/global/sidebar/sidebarContext";

import Topbar from "./components/dashboard/pages/global/Topbar";

import Dashboard from "./components/dashboard/Dashboard";
import Team from "./components/dashboard/pages/team";
import Invoices from "./components/dashboard/pages/invoices";
import Contacts from "./components/dashboard/pages/contacts";
import Form from "./components/dashboard/pages/form";
import Calendar from "./components/dashboard/pages/calendar";
import Bar from "./components/dashboard/pages/bar";
import Line from "./components/dashboard/pages/line";
import Pie from "./components/dashboard/pages/pie";
import FAQ from "./components/dashboard/pages/faq";
import Geography from "./components/dashboard/pages/geography";

const App = () => {
  const [theme, colorMode] = useMode();
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <MyProSidebarProvider>
          <div style={{ height: "100%", width: "100%" }}>
            <main>
              <Topbar />
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/team" element={<Team />} />
                <Route path="/contacts" element={<Contacts />} />
                <Route path="/invoices" element={<Invoices />} />
                <Route path="/form" element={<Form />} />
                <Route path="/bar" element={<Bar />} />
                <Route path="/pie" element={<Pie />} />
                <Route path="/line" element={<Line />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/calendar" element={<Calendar />} />
                <Route path="/geography" element={<Geography />} />
              </Routes>
            </main>
          </div>
        </MyProSidebarProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default App;
