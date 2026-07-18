import { useForm } from "react-hook-form";
import Button from "../Button";
import "../../styles/Modal.css";

const UpdateStockModal = ({
  open,
  onClose,
  onSubmit,
  book,
}) => {
  const {
    register,
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: {
      operation: "increase",
    },
  });

  if (!open) return null;

  const submitHandler = (data) => {
    const change =
      data.operation === "increase"
        ? Number(data.quantity)
        : -Number(data.quantity);

    onSubmit(book.id, { change });

    reset();
    onClose();
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">

        <h2>Update Stock</h2>

        <p><strong>{book.title}</strong></p>

        <p>Current Stock : {book.stock}</p>

        <form onSubmit={handleSubmit(submitHandler)}>

          <label>Quantity</label>

          <input
            type="number"
            min="1"
            {...register("quantity", {
              required: true,
              min: 1,
            })}
          />

          <label>Operation</label>

          <select {...register("operation")}>
            <option value="increase">
              Increase
            </option>

            <option value="decrease">
              Decrease
            </option>
          </select>

          <div className="modal-buttons">
            <Button
              variant="secondary"
              onClick={onClose}
            >
              Cancel
            </Button>

            <Button type="submit">
              Update
            </Button>
          </div>

        </form>

      </div>
    </div>
  );
};

export default UpdateStockModal;