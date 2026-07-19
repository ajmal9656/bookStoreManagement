import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import Button from "../Button";

import "../../styles/addAuthorModal.css";

const AddAuthorModal = ({ open, onClose, onSubmit }) => {
  const {
    register,
    handleSubmit,
    reset,
    clearErrors,
    setError,
    formState: { errors, isSubmitting },
  } = useForm();

  if (!open) return null;

  const handleClose = async (refresh = false) => {
    reset();
    clearErrors();

    await onClose(refresh);
  };

  const submitHandler = async (data) => {
    try {
      await onSubmit(data);

      reset();
      clearErrors();

      await onClose(false);
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
        error.response?.data?.error?.message ||
          "Something went wrong."
      );
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2 className="modal-heading">Add Author</h2>

        <form onSubmit={handleSubmit(submitHandler)}>
          <input
            type="text"
            placeholder="Author Name"
            {...register("name", {
              required: "Author name is required",
              minLength: {
                value: 3,
                message: "Minimum 3 characters",
              },
              maxLength: {
                value: 100,
                message: "Maximum 100 characters",
              },
            })}
          />

          {errors.name && (
            <p className="error">{errors.name.message}</p>
          )}

          <textarea
            rows="5"
            placeholder="Author Bio"
            {...register("bio", {
              required: "Bio is required",
              minLength: {
                value: 10,
                message: "Minimum 10 characters",
              },
              maxLength: {
                value: 500,
                message: "Maximum 500 characters",
              },
            })}
          />

          {errors.bio && (
            <p className="error">{errors.bio.message}</p>
          )}

          <div className="modal-buttons">
            <Button
              variant="secondary"
              type="button"
              onClick={() => handleClose(true)}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Saving..." : "Save"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAuthorModal;