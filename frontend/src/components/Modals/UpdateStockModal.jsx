import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import Button from "../Button";

import "../../styles/updateStockModal.css";
import Loader from "../Loader";
import { getBookById } from "../../services/bookService";

const UpdateStockModal = ({ open, bookId, onClose, onSubmit }) => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    clearErrors,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      operation: "increase",
      quantity: "",
    },
  });

  const [book, setBook] = useState(null);
  const [loadingBook, setLoadingBook] = useState(false);

  const operation = watch("operation");

  useEffect(() => {
    if (!open || !bookId) return;

    const loadBook = async () => {
      try {
        setLoadingBook(true);

        const response = await getBookById(bookId);

        setBook(response.data.book);

        reset({
          operation: "increase",
          quantity: "",
        });

        clearErrors();
      } catch (error) {
        toast.error(
          error.response?.data?.error?.message || "Failed to load book.",
        );

        onClose();
      } finally {
        setLoadingBook(false);
      }
    };

    loadBook();
  }, [open, bookId, reset, clearErrors, onClose]);

  if (loadingBook) {
    return (
      <div className="modal-backdrop">
        <div className="modal">
          <Loader />
        </div>
      </div>
    );
  }

  if (!book) return null;

  const handleClose = async (refresh = false) => {
    reset({
      operation: "increase",
      quantity: "",
    });

    clearErrors();

    await onClose(refresh);
  };

  const submitHandler = async (data) => {
    try {

      await onSubmit(book.id, data);

      await handleClose(false);
    } catch (error) {
      const validationErrors = error.response?.data?.error?.errors;

      if (validationErrors?.length > 0) {
        validationErrors.forEach((err) => {
          setError(err.field, {
            type: "server",
            message: err.message,
          });
        });

        return;
      }

      toast.error(
        error.response?.data?.error?.message || "Something went wrong.",
      );
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2 className="modal-heading">Update Stock</h2>

        <form onSubmit={handleSubmit(submitHandler)}>
          <input
            type="text"
            value={book.title}
            className="readonly-input"
            disabled
          />

          <input
            type="text"
            value={book.author?.name}
            className="readonly-input"
            disabled
          />

          <input
            type="text"
            value={book.stock}
            className="readonly-input"
            disabled
          />

          <div className="stock-options">
            <label>
              <input type="radio" value="increase" {...register("operation")} />
              Increase
            </label>

            <label>
              <input type="radio" value="decrease" {...register("operation")} />
              Decrease
            </label>
          </div>

          <input
            type="text"
            inputMode="numeric"
            placeholder="Quantity"
            {...register("quantity", {
              required: "Quantity is required",
              pattern: {
                value: /^\d+$/,
                message: "Quantity must be a valid number",
              },
              validate: (value) => {
                if (Number(value) <= 0) {
                  return "Quantity must be greater than 0";
                }

                return true;
              },
              setValueAs: (value) => Number(value),
              onChange: (e) => {
                const value = e.target.value;

                if (!/^\d*$/.test(value)) {
                  e.target.value = value.replace(/\D/g, "");
                }
              },
            })}
          />

          {errors.quantity && (
            <p className="error">{errors.quantity.message}</p>
          )}

          <div className="modal-buttons">
            <Button
              type="button"
              variant="secondary"
              onClick={() => handleClose(true)}
            >
              Cancel
            </Button>

            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Updating..." : "Update Stock"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateStockModal;
