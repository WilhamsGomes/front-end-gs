import { Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./view/pages/Dashboard";
import Assets from "./view/pages/Assets";
import Settings from "./view/pages/Settings";
import { AppLayout } from "./view/layout/AppLayout";

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
