import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import AddTask from "./pages/AddTask";
import ProtectedRoutes from "./ProtectedRoutes";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route element={<ProtectedRoutes />}>
        <Route path="/dashboard" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/AddTask" element={<AddTask />} />
      </Route>
    </Routes>
  );
}

export default App;
