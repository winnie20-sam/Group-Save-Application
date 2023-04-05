import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./components/Login";
import Users from "./pages/Users";
import Savings from "./pages/Savings";
import AddUser from "./pages/AddUser";
import EditUser from "./pages/EditUser";
import AddSavings from "./pages/AddSaving";
import EditSaving from "./pages/EditSaving";
import HomePage from "./components/HomePage";
import Payment from "./pages/payment";


function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/homepage" element={< HomePage />} />
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/add" element={<AddUser />} />
          <Route path="/users/edit/:id" element={<EditUser />} />
          <Route path="/saving" element={< Savings/>} />
          <Route path="/saving/add" element={<AddSavings />} />
          <Route path="/saving/edit/:id" element={<EditSaving />} />
          <Route path="/payment" element={<Payment />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
