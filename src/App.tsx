import "./App.module.css";
import { Routes, Route, Outlet } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import GovernancePolicies from "./pages/GovernancePolicies";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import Debugger from "./pages/Debugger.tsx";
import { CustomHeader } from "./components/CustomHeader";
import Sidebar from "./components/Sidebar";

const AppLayout: React.FC = () => (
  <div style={{ display: "flex", height: "100vh" }}>
    <Sidebar />
    <div style={{ flex: 1, marginLeft: "280px", display: "flex", flexDirection: "column" }}>
      <CustomHeader />
      <main style={{ flex: 1, overflow: "auto" }}>
        <Outlet />
      </main>
    </div>
  </div>
);

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<GovernancePolicies />} />
        <Route path="/governance" element={<GovernancePolicies />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/debug" element={<Debugger />} />
        <Route path="/debug/:contractName" element={<Debugger />} />
      </Route>
    </Routes>
  );
}

export default App;
