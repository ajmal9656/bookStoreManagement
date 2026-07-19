import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import BookList from "../pages/BookList";
import MainLayout from "../layout/MainLayout";
import AuthorList from "../pages/AuthorList";
import AuthorDetails from "../pages/AuthorDetails";


export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Navigate to="/books" replace />} />
          <Route path="/books" element={<BookList />} />
          <Route path="/authors" element={<AuthorList />} />
          <Route path="/authors/:id" element={<AuthorDetails />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}