import { Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Assets from "../pages/Assets";
import Settings from "../pages/Settings";
import { AppLayout } from "@/layout/AppLayout";

export default function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/assets" element={<Assets />} />
        <Route path="/settings" element={<Settings />} />
      </Route>

      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}
