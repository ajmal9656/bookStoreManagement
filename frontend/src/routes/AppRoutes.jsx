import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import BookList from "../pages/BookList";
import MainLayout from "../layout/MainLayout";


export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Navigate to="/books" replace />} />
          <Route path="/books" element={<BookList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}