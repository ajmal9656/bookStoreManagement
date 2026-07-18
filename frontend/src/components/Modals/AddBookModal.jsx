import { useForm } from "react-hook-form";
import Button from "../Button";
import "../../styles/Modal.css";

const AddBookModal = ({
  isOpen,
  onClose,
  onSubmit,
  authors = [],
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  if (!isOpen) return null;

  const submitHandler = (data) => {
    onSubmit(data);
    reset();
    onClose();
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>Add Book</h2>

        <form onSubmit={handleSubmit(submitHandler)}>

          <input
            type="text"
            placeholder="Book Title"
            {...register("title", {
              required: "Title is required",
            })}
          />
          <p>{errors.title?.message}</p>

          <select
            {...register("authorId", {
              required: "Author is required",
            })}
          >
            <option value="">Select Author</option>

            {authors.map((author) => (
              <option
                key={author.id}
                value={author.id}
              >
                {author.name}
              </option>
            ))}
          </select>
          <p>{errors.authorId?.message}</p>

          <input
            type="number"
            placeholder="Price"
            {...register("price", {
              required: "Price is required",
            })}
          />
          <p>{errors.price?.message}</p>

          <input
            type="number"
            placeholder="Stock"
            {...register("stock", {
              required: "Stock is required",
            })}
          />
          <p>{errors.stock?.message}</p>

          <div className="modal-buttons">
            <Button
              variant="secondary"
              onClick={onClose}
            >
              Cancel
            </Button>

            <Button type="submit">
              Save
            </Button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default AddBookModal;