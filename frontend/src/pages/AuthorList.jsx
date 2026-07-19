import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

import Button from "../components/Button";
import Loader from "../components/Loader";
import AddAuthorModal from "../components/Modals/AddAuthorModal";
import { useNavigate } from "react-router-dom";

import {
  getAuthorList,
  createAuthor,
  deleteAuthor,
} from "../services/authorService";

import "../styles/bookList.css";
import useDebounce from "../hook/useDebounce";

const AuthorList = () => {
  const [authors, setAuthors] = useState([]);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(false);

  const [openAuthorModal, setOpenAuthorModal] = useState(false);

  const debouncedSearch = useDebounce(search, 500);

  const navigate = useNavigate();

  const loadAuthors = async () => {
    try {
      setLoading(true);

      const params = {
        page,
        limit: 5,
      };

      if (debouncedSearch.trim()) {
        params.search = debouncedSearch;
      }

      const response = await getAuthorList(params);

      setAuthors(response.data.authors);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      toast.error(
        error.response?.data?.error?.message || "Failed to load authors.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAuthors();
  }, [page, debouncedSearch]);

  const handleCreateAuthor = async (data) => {
    const response = await createAuthor(data);

    toast.success("Author added successfully.");

    await loadAuthors();

    return response;
  };

  const handleDeleteAuthor = async (id) => {
    const result = await Swal.fire({
      title: "Delete Author?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#d33",
    });

    if (!result.isConfirmed) return;

    try {
      await deleteAuthor(id);

      toast.success("Author deleted successfully.");

      await loadAuthors();
    } catch (error) {
      toast.error(
        error.response?.data?.error?.message || "Failed to delete author.",
      );
    }
  };

  const handleCloseAuthorModal = async (refresh = false) => {
    if (refresh) {
      await loadAuthors();
    }

    setOpenAuthorModal(false);
  };

  const handleViewAuthor = (id) => {
    navigate(`/authors/${id}`);
  };

  return (
    <div className="book-page">
      <h2>Authors</h2>

      <div className="page-header">
        <div className="filters">
          <input
            type="text"
            placeholder="Search by author name"
            value={search}
            onChange={(e) => {
              setPage(1);
              setSearch(e.target.value);
            }}
          />
        </div>

        <Button onClick={() => setOpenAuthorModal(true)}>Add Author</Button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Bio</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {loading ? (
            <tr>
              <td
                colSpan="3"
                style={{
                  textAlign: "center",
                  padding: "20px",
                }}
              >
                <Loader />
              </td>
            </tr>
          ) : authors.length > 0 ? (
            authors.map((author) => (
              <tr key={author.id}>
                <td>{author.name}</td>

                <td>
                  {author.bio.length > 80
                    ? `${author.bio.slice(0, 80)}...`
                    : author.bio}
                </td>

                <td
                  style={{
                    display: "flex",
                    gap: "10px",
                  }}
                >
                  <Button
                    variant="secondary"
                    onClick={() => handleViewAuthor(author.id)}
                  >
                    View
                  </Button>

                  <Button
                    variant="danger"
                    onClick={() => handleDeleteAuthor(author.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="3"
                style={{
                  textAlign: "center",
                  padding: "20px",
                }}
              >
                No authors found.
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

      {openAuthorModal && (
        <AddAuthorModal
          open={openAuthorModal}
          onClose={handleCloseAuthorModal}
          onSubmit={handleCreateAuthor}
        />
      )}
    </div>
  );
};

export default AuthorList;
