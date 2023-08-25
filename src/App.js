import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './components/Login';
import Register from './components/Register';
import VendorRegistrationPage from './components/VendorRegister';
import SubscriptionPage from './components/razorpay/Payment';
import EmailVerificationPage from './components/EmailVerification';

import { ColorModeContext, useMode } from "./components/dashboard/theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
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

function App() {
  const [theme, colorMode] = useMode();

  return (

      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-email" element={<EmailVerificationPage />} />
        <Route path="/payment" element={<SubscriptionPage />} />
        <Route path="/vendor-register" element={<VendorRegistrationPage />} />
        
        {/* Dashboard and related routes */}
        <Route
          path="/dashboard/*"
          element={
            <ColorModeContext.Provider value={colorMode}>
              <ThemeProvider theme={theme}>
                <CssBaseline />
                <MyProSidebarProvider>
                  <div style={{ height: "100%", width: "100%" }}>
                    <main>
                      <Topbar />
                      <Route path="/" element={<Dashboard />} />
                      <Route path="team" element={<Team />} />
                      <Route path="contacts" element={<Contacts />} />
                      <Route path="invoices" element={<Invoices />} />
                      <Route path="form" element={<Form />} />
                      <Route path="calendar" element={<Calendar />} />
                      <Route path="bar" element={<Bar />} />
                      <Route path="line" element={<Line />} />
                      <Route path="pie" element={<Pie />} />
                      <Route path="faq" element={<FAQ />} />
                      <Route path="geography" element={<Geography />} />
                    </main>
                  </div>
                </MyProSidebarProvider>
              </ThemeProvider>
            </ColorModeContext.Provider>
          }
        />
      </Routes>
  );
}

export default App;
