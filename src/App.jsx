import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Transfer from "./pages/Transfer";
import Transactions from "./pages/Transactions";



function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
  path="/transfer"
  element={
    <ProtectedRoute>
      <Transfer />
    </ProtectedRoute>
  }
/>
<Route path="/transactions/:accountId" element={<Transactions />} />



    </Routes>
  );
}

export default App;
