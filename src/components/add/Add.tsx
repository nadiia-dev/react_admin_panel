import { GridColDef } from "@mui/x-data-grid";
import "./add.scss";

interface Props {
  columns: GridColDef[];
  slug: string;
  setOpen: (val: boolean) => void;
  onSubmit: (formData: Record<string, string>) => void;
}

const Add = (props: Props) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData: Record<string, string> = {};

    props.columns.forEach(({ field }) => {
      const fieldValue = form.elements.namedItem(field) as HTMLInputElement;
      if (fieldValue) {
        formData[field] = fieldValue.value;
      }
    });

    props.onSubmit(formData);
    props.setOpen(false);
  };

  return (
    <div className="add">
      <div className="modal">
        <span className="close" onClick={() => props.setOpen(false)}>
          X
        </span>
        <h1>Add new {props.slug}</h1>
        <form onSubmit={handleSubmit}>
          {props.columns
            .filter(
              (item) =>
                item.field !== "id" &&
                item.field !== "img" &&
                item.field !== "createdAt"
            )
            .map((column) => (
              <div className="item" key={column.headerName}>
                <label>{column.headerName}</label>
                <input
                  type={column.type}
                  placeholder={column.field}
                  name={column.field}
                />
              </div>
            ))}
          <button>Send</button>
        </form>
      </div>
    </div>
  );
};

export default Add;
