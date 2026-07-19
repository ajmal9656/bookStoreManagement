import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import Button from "../Button";

import "../../styles/updateStockModal.css";

const UpdateStockModal = ({ book, onClose, onSubmit, onRefresh, }) => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    clearErrors,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      operation: "increase",
      quantity: "",
    },
  });

  const operation = watch("operation");

  useEffect(() => {
    if (!book) return;

    reset({
      operation: "increase",
      quantity: "",
    });
  }, [book, reset]);

  if (!book) return null;

  const handleClose = () => {
    reset({
      operation: "increase",
      quantity: "",
    });

    clearErrors();

    onClose();
  };

  const submitHandler = async (data) => {
    console.log("submitHandler", data);
    
  if (
    data.operation === "decrease" &&
    data.quantity > book.stock
  ) {
    setError("quantity", {
      type: "manual",
      message: "Quantity cannot exceed current stock.",
    });

    return;
  }

  try {
    console.log("about to api");
    
    await onSubmit(book.id, data);

    handleClose();
  } catch (error) {
    const validationErrors =
      error.response?.data?.error?.errors;

    if (validationErrors?.length > 0) {
      validationErrors.forEach((err) => {
        setError(err.field, {
          type: "server",
          message: err.message,
        });
      });

      await onRefresh();

      return;
    }

    toast.error(
      error.response?.data?.error?.message ||
        "Something went wrong."
    );
  }
};

  return (
  <div className="modal-backdrop">
    <div className="modal">
      <h2>Update Stock</h2>

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
            <input
              type="radio"
              value="increase"
              {...register("operation")}
            />
            Increase
          </label>

          <label>
            <input
              type="radio"
              value="decrease"
              {...register("operation")}
            />
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

              if (
                operation === "decrease" &&
                Number(value) > book.stock
              ) {
                return "Quantity cannot exceed current stock";
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
            onClick={handleClose}
          >
            Cancel
          </Button>

          <Button type="submit">
            Update Stock
          </Button>
        </div>
      </form>
    </div>
  </div>
);
};

export default UpdateStockModal;