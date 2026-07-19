import { useForm, Controller } from "react-hook-form";
import Button from "../Button";
import "../../styles/addBookModal.css";
import useDebounce from "../../hook/useDebounce";
import { useEffect, useState, useCallback } from "react";
import toast from "react-hot-toast";
import { getAuthors } from "../../services/bookService";
import Select from "react-select";

const AddBookModal = ({ open, onClose, onSubmit }) => {
  const {
    register,
    control,
    handleSubmit,
    reset,
    clearErrors,
    setError,
    formState: { errors, isSubmitting },
  } = useForm();

  const [authors, setAuthors] = useState([]);
  const [search, setSearch] = useState("");
  const [loadingAuthors, setLoadingAuthors] = useState(false);

  const debouncedSearch = useDebounce(search, 500);

  const loadAuthors = useCallback(async () => {
    try {
      setLoadingAuthors(true);

      const params = {};

      if (debouncedSearch.trim()) {
        params.search = debouncedSearch;
      }

      const response = await getAuthors(params);

      setAuthors(response.data.authors);
    } catch (error) {
      toast.error(
        error.response?.data?.error?.message || "Failed to load authors",
      );
    } finally {
      setLoadingAuthors(false);
    }
  }, [debouncedSearch]);

  useEffect(() => {
    if (!open) return;

    loadAuthors();
  }, [open, debouncedSearch]);

  if (!open) return null;

  const handleClose = async (refresh = false) => {
    reset();
    clearErrors();
    setSearch("");
    setAuthors([]);

    await onClose(refresh);
  };

  const submitHandler = async (data) => {
    try {
      await onSubmit(data);

      reset();
      clearErrors();
      setSearch("");
      setAuthors([]);

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
        error.response?.data?.error?.message || "Something went wrong",
      );
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2 className="modal-heading">Add Book</h2>

        <form onSubmit={handleSubmit(submitHandler)}>
          <input
            type="text"
            placeholder="Book Title"
            {...register("title", {
              required: "Title is required",
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
          {errors.title && <p className="error">{errors.title.message}</p>}
          <Controller
            name="authorId"
            control={control}
            rules={{
              required: "Author is required",
            }}
            render={({ field }) => (
              <Select
                {...field}
                isLoading={loadingAuthors}
                isClearable
                filterOption={() => true}
                placeholder="Search and Select Author"
                options={authors.map((author) => ({
                  value: author.id,
                  label: author.name,
                }))}
                value={
                  authors
                    .map((author) => ({
                      value: author.id,
                      label: author.name,
                    }))
                    .find((option) => option.value === field.value) || null
                }
                onChange={(selected) => {
                  field.onChange(selected?.value || "");
                }}
                onInputChange={(inputValue, { action }) => {
                  if (action === "input-change") {
                    setSearch(inputValue);
                  }
                }}
                noOptionsMessage={() =>
                  loadingAuthors ? "Loading..." : "No authors found"
                }
                styles={{
                  control: (base) => ({
                    ...base,
                    minHeight: 38,
                    backgroundColor: "#414141",
                    borderColor: "#a0a0a0",
                    fontSize: "14px",
                  }),
                  singleValue: (base) => ({
                    ...base,
                    color: "#fff",
                    fontSize: "14px",
                  }),
                  placeholder: (base) => ({
                    ...base,
                    fontSize: "14px",
                  }),
                }}
              />
            )}
          />

          {errors.authorId && (
            <p className="error">{errors.authorId.message}</p>
          )}

          <input
            type="text"
            inputMode="decimal"
            placeholder="Price"
            {...register("price", {
              required: "Price is required",
              pattern: {
                value: /^\d+(\.\d{1,2})?$/,
                message: "Enter a valid price",
              },
              validate: (value) =>
                parseFloat(value) > 0 || "Price must be positive",
              setValueAs: (value) => parseFloat(value),
              onChange: (e) => {
                const value = e.target.value;

                if (!/^\d*\.?\d{0,2}$/.test(value)) {
                  e.target.value = value.slice(0, -1);
                }
              },
            })}
          />

          {errors.price && <p className="error">{errors.price.message}</p>}

          <input
            type="text"
            inputMode="numeric"
            placeholder="Stock"
            {...register("stock", {
              required: "Stock is required",
              pattern: {
                value: /^\d+$/,
                message: "Stock must be a valid number",
              },
              validate: (value) =>
                Number(value) >= 0 || "Stock cannot be negative",
              setValueAs: (value) => Number(value),
              onChange: (e) => {
                const value = e.target.value;

                if (!/^\d*$/.test(value)) {
                  e.target.value = value.replace(/\D/g, "");
                }
              },
            })}
          />

          {errors.stock && <p className="error">{errors.stock.message}</p>}

          <div className="modal-buttons">
            <Button variant="secondary" onClick={() => handleClose(true)}>
              Cancel
            </Button>

            <Button type="submit" disabled={loadingAuthors || isSubmitting}>
              {isSubmitting ? "Saving..." : "Save"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBookModal;
