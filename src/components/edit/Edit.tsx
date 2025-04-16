import "./edit.scss";

interface ItemData {
  field: string;
  headerName: string;
  width: number;
  value: string | number;
}

interface Props {
  data: ItemData[];
  slug: string;
  setOpen: (val: boolean) => void;
  onSubmit: (formData: Record<string, string>) => void;
}

const Edit = (props: Props) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData: Record<string, string> = {};

    props.data.forEach(({ field }) => {
      const fieldValue = form.elements.namedItem(field) as HTMLInputElement;
      if (fieldValue) {
        formData[field] = fieldValue.value;
      }
    });

    props.onSubmit({ ...formData });
    props.setOpen(false);
  };

  return (
    <div className="add">
      <div className="modal">
        <span className="close" onClick={() => props.setOpen(false)}>
          X
        </span>
        <h1>Edit {props.slug}</h1>
        <form onSubmit={handleSubmit}>
          {props.data
            .filter((item) => item.field !== "id" && item.field !== "createdAt")
            .map((column) => (
              <div className="item" key={column.headerName}>
                <label>{column.headerName}</label>
                <input
                  type="string"
                  placeholder={column.field}
                  name={column.field}
                  defaultValue={column.value}
                />
              </div>
            ))}
          <button>Send</button>
        </form>
      </div>
    </div>
  );
};

export default Edit;
