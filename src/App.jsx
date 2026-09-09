import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Products from "./pages/Products";
import CreateProduct from "./pages/Create";
import EditProduct from "./pages/EditProduct";
import { Toaster } from "react-hot-toast";
import Register from "./pages/Register";
import Login from "./pages/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/sign-up" element={<Register />} />
        <Route path="/products" element={<Products />} />
        <Route path="/create" element={<CreateProduct />} />
        <Route path="/products/edit/:id" element={<EditProduct />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}

export default App;
