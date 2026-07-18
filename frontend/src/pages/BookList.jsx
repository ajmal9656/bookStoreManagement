import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import Button from "../components/Button";
import Loader from "../components/Loader";
// import AddBookModal from "../components/modals/AddBookModal";
// import UpdateStockModal from "../components/modals/UpdateStockModal";

import {
  getBooks
} from "../services/bookService";

import "../styles/bookList.css";
import useDebounce from "../../hook/useDebounce";

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1);
const [totalPages, setTotalPages] = useState(1);

const [search, setSearch] = useState("");
const [minPrice, setMinPrice] = useState("");
const [inStock, setInStock] = useState(false);

  const [loading, setLoading] = useState(false);

  const [openBookModal, setOpenBookModal] = useState(false);

  const [openStockModal, setOpenStockModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  const debouncedSearch = useDebounce(search, 3000);
  const debouncedMinPrice = useDebounce(minPrice, 3000);

  const loadBooks = async () => {
  try {
    setLoading(true);

    const response = await getBooks({
      page,
      search,
      minPrice,
      inStock,
    });

    setBooks(response.data.books);
    setTotalPages(response.data.totalPages);
  } catch (error) {
    toast.error(
      error.response?.data?.error?.message || "Failed to load books"
    );
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    loadBooks();
  }, [page, debouncedSearch, debouncedMinPrice, inStock]);

  const handleCreateBook = async (data) => {
    try {
      // await createBook(data);

      toast.success("Book added");

      loadBooks();
    } catch (error) {
      toast.error(error.response?.data?.error?.message);
    }
  };

  const handleUpdateStock = async (id, data) => {
    try {
      // await updateBookStock(id, data);

      toast.success("Stock updated");

      loadBooks();
    } catch (error) {
      toast.error(error.response?.data?.error?.message);
    }
  };


  return (
    <div className="book-page">
      <h2>Books</h2>

      <div className="page-header">
        <div className="filters">

  <input
    type="text"
    placeholder="Search by title"
    value={search}
    onChange={(e) => {
      setPage(1);
      setSearch(e.target.value);
    }}
  />

  <input
    type="number"
    placeholder="Min Price"
    value={minPrice}
    onChange={(e) => {
      setPage(1);
      setMinPrice(e.target.value);
    }}
  />

  <label>
    <input
      type="checkbox"
      checked={inStock}
      onChange={(e) => {
        setPage(1);
        setInStock(e.target.checked);
      }}
    />
    In Stock
  </label>

</div>
        

        <Button onClick={() => setOpenBookModal(true)}>
          Add Book
        </Button>
      </div>

      <table>

        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
  {loading ? (
    <tr>
      <td colSpan="5" style={{ textAlign: "center", padding: "20px" }}>
        <Loader />
      </td>
    </tr>
  ) : books.length > 0 ? (
    books.map((book) => (
      <tr key={book.id}>
        <td>{book.title}</td>

        <td>{book.author?.name}</td>

        <td>₹ {book.price}</td>

        <td>{book.stock}</td>

        <td>
          <Button
            variant="secondary"
            onClick={() => {
              setSelectedBook(book);
              setOpenStockModal(true);
            }}
          >
            Update Stock
          </Button>
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="5" style={{ textAlign: "center", padding: "20px" }}>
        No books found.
      </td>
    </tr>
  )}
</tbody>

      </table>
      <div className="pagination">

  <Button
    variant="secondary"
    disabled={page === 1}
    onClick={() => setPage((prev) => prev - 1)}
  >
    Previous
  </Button>

  <span>
    Page {page} of {totalPages}
  </span>

  <Button
    variant="secondary"
    disabled={page === totalPages}
    onClick={() => setPage((prev) => prev + 1)}
  >
    Next
  </Button>

</div>

      {/* <AddBookModal
        open={openBookModal}
        onClose={() => setOpenBookModal(false)}
        onSubmit={handleCreateBook}
      /> */}

      {/* {selectedBook && (

        <UpdateStockModal
          open={openStockModal}
          onClose={() => setOpenStockModal(false)}
          book={selectedBook}
          onSubmit={handleUpdateStock}
        />

      )} */}

    </div>
  );
};

export default BookList;