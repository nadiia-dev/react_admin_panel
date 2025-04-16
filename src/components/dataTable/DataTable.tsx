import {
  DataGrid,
  GridColDef,
  GridEventListener,
  GridToolbar,
} from "@mui/x-data-grid";
import "./dataTable.scss";
import { User } from "../../types/User";
import { Product } from "../../types/Product";
import { Link, useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Box } from "@mui/material";

interface Props {
  columns: GridColDef[];
  rows: User[] | Product[];
  slug: string;
  onDelete: (id: number) => Promise<unknown>;
}

const DataTable = (props: Props) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (id: number) => {
      return props.onDelete(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`all${props.slug}s`] });
    },
  });

  const handleDelete = (id: number) => {
    mutation.mutate(id);
  };

  const handleEvent: GridEventListener<"rowClick"> = (params) => {
    navigate(`${params.row.id}`);
  };

  const actionCol: GridColDef = {
    field: "action",
    headerName: "Action",
    width: 200,
    renderCell: (params) => {
      return (
        <div className="action">
          <Link to={`/${props.slug}/${params.row.id}`}>
            <img src="/view.svg" alt="" />
          </Link>
          <div className="delete" onClick={() => handleDelete(params.row.id)}>
            <img src="/delete.svg" alt="" />
          </div>
        </div>
      );
    },
  };

  return (
    <div>
      <DataGrid
        className="dataGrid"
        rows={props.rows}
        columns={[...props.columns, actionCol]}
        onRowClick={handleEvent}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableColumnFilter
        disableDensitySelector
        disableColumnSelector
      />
    </div>
  );
};

export default DataTable;
