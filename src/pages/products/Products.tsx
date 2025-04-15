import { GridColDef } from "@mui/x-data-grid";
import "./products.scss";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import DataTable from "../../components/dataTable/DataTable";
import Add from "../../components/add/Add";
import { deleteProduct, getProducts } from "../../services/productsApi";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "img",
    headerName: "Image",
    width: 100,
    renderCell: (params) => {
      return <img src={params.row.img || "/noavatar.png"} alt="" />;
    },
  },
  {
    field: "title",
    type: "string",
    headerName: "Title",
    width: 250,
  },
  {
    field: "color",
    type: "string",
    headerName: "Color",
    width: 150,
  },
  {
    field: "price",
    type: "string",
    headerName: "Price",
    width: 200,
  },
  {
    field: "producer",
    headerName: "Producer",
    type: "string",
    width: 200,
  },
  {
    field: "createdAt",
    headerName: "Created At",
    width: 200,
    type: "string",
  },
  {
    field: "inStock",
    headerName: "In Stock",
    width: 150,
    type: "boolean",
  },
];

const Products = () => {
  const [open, setIsOpen] = useState(false);
  const {
    data: products,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["allProducts"],
    queryFn: getProducts,
  });

  const handleOpen = (val: boolean) => {
    setIsOpen(val);
  };

  if (isLoading) return <p>Loading...</p>;
  if (error instanceof Error) return <p>Error: {error.message}</p>;

  return (
    <div className="products">
      <div className="info">
        <h1>All Products</h1>
        <button onClick={() => handleOpen(true)}>Add New Product</button>
      </div>
      {products && (
        <DataTable
          slug="Product"
          columns={columns}
          rows={products}
          onDelete={deleteProduct}
        />
      )}
      {open && <Add slug="Product" columns={columns} setOpen={handleOpen} />}
    </div>
  );
};

export default Products;
