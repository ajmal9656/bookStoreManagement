import { BrowserRouter, Routes, Route } from "react-router-dom";

import BookList from "../pages/BookList";


export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BookList />} />
      </Routes>
    </BrowserRouter>
  );
}