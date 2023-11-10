import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Topbar from "./components/dashboard/scenes/global/Topbar";
import Sidebar from "./components/dashboard/scenes/global/Sidebar";
import Dashboard from "./components/dashboard/scenes/dashboard";
import Team from "./components/dashboard/scenes/team";
import Invoices from "./components/dashboard/scenes/invoices";
import Contacts from "./components/dashboard/scenes/contacts";
import Bar from "./components/dashboard/scenes/bar";
import ProductList from './components/dashboard/scenes/manage-products/product-list';
import CategoryList from './components/dashboard/scenes/manage-products/category-list';
import AddProduct from "./components/dashboard/scenes/manage-products/add-product";
import UpdateProduct from "./components/dashboard/scenes/manage-products/update-product";
import CreateCategory from "./components/dashboard/scenes/manage-products/create-category";
import UpdateCategory from './components/dashboard/scenes/manage-products/update-category';
import Line from "./components/dashboard/scenes/line";
import Pie from "./components/dashboard/scenes/pie";
import FAQ from "./components/dashboard/scenes/faq";
import Geography from "./components/dashboard/scenes/geography";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./components/dashboard/theme";
import Calendar from "./components/dashboard/scenes/calendar/calendar";


function DashboardLayout() {
    const [theme, colorMode] = useMode();
    const [isSidebar, setIsSidebar] = useState(true);
  
    return (
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div className="app">
            <Sidebar isSidebar={isSidebar} />
            <main className="content">
              <Topbar setIsSidebar={setIsSidebar} />
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="team" element={<Team />} />
                <Route path="/contacts" element={<Contacts />} />
                <Route path="/invoices" element={<Invoices />} />
                <Route path="/product-list" element={<ProductList />} />
                <Route path="/category-list" element={<CategoryList />} />
                <Route path="/add-product" element={<AddProduct />} />
                <Route path="/update-product/:id" element={<UpdateProduct />} />
                <Route path="/create-category" element={<CreateCategory />} />
                <Route path="/update-category/:id" element={<UpdateCategory />} />
                <Route path="/bar" element={<Bar />} />
                <Route path="/pie" element={<Pie />} />
                <Route path="/line" element={<Line />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/calendar" element={<Calendar />} />
                <Route path="/geography" element={<Geography />} />
              </Routes>
            </main>
          </div>
        </ThemeProvider>
      </ColorModeContext.Provider>
    );
  }

export default DashboardLayout;