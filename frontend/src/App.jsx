import "./App.css";
import { Home, Login, Signup } from "./pages/index";
import { Header, Footer } from "./component/index";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Admin from "./pages/Admin";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/admin" element={<Admin />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Signup />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
