import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import Button from "../components/Button";
import Loader from "../components/Loader";

import { getAuthorById } from "../services/authorService";

import "../styles/AuthorDetails.css";

const AuthorDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [author, setAuthor] = useState(null);
  const [books, setBooks] = useState([]);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [loading, setLoading] = useState(false);

  const loadAuthor = async () => {
    try {
      setLoading(true);

      const response = await getAuthorById(id, {
        page,
        limit: 5,
      });
      console.log("response", response.data);

      setAuthor(response.data.author);
      setBooks(response.data.books);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      toast.error(
        error.response?.data?.error?.message || "Failed to load author.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAuthor();
  }, [id, page]);

  return (
    <div className="book-page">
      <div className="page-header-back">
        <Button variant="secondary" onClick={() => navigate("/authors")}>
          ← Back
        </Button>
      </div>

      {loading ? (
        <Loader />
      ) : (
        <>
          <div
            style={{
              marginTop: "20px",
              marginBottom: "30px",
            }}
          >
            <h2>Name : Mr. {author?.name}</h2>

            <p
              style={{
                marginTop: "10px",
              }}
            >
              Bio : {author?.bio}
            </p>
          </div>

          <h3>Books</h3>

          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>ISBN</th>
                <th>Price</th>
                <th>Stock</th>
              </tr>
            </thead>

            <tbody>
              {books.length > 0 ? (
                books.map((book) => (
                  <tr key={book.id}>
                    <td>{book.title}</td>
                    <td>{book.isbn}</td>
                    <td>₹{book.price}</td>
                    <td>{book.stock}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    style={{
                      textAlign: "center",
                      padding: "20px",
                    }}
                  >
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
        </>
      )}
    </div>
  );
};

export default AuthorDetails;
