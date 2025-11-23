import MainLayout from "./layout/MainLayout";
import Dashboard from "./Pages/Dashboard";
import StatsPage from "./Pages/StatsPage";
import NotFound from "./Pages/NotFound";
import HealthCheck from "./Pages/HealthCheck";
import { Routes, Route } from "react-router-dom";
import RedirectHandler from "./Pages/RedirectHandler";

const App = () => {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/:code" element={<RedirectHandler />} />
        <Route path="/code/:code" element={<StatsPage />} />
        <Route path="/healthz" element={<HealthCheck />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </MainLayout>
  );
};

export default App;
