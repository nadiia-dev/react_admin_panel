import {
  Legend,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Line,
} from "recharts";
import { Product } from "../../types/Product";
import "./single.scss";
import { useState } from "react";
import Edit from "../edit/Edit";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProduct } from "../../services/productsApi";
import { toBoolean } from "../../helpers/toBoolean";

type ChartDataKey = {
  name: string;
  color: string;
};

type ChartDataItem = {
  name: string;
  visits: number;
  orders: number;
};

type Activity = {
  text: string;
  time: string;
};

interface Props {
  data: Product;
  chartData: {
    chart: {
      dataKeys: ChartDataKey[];
      data: ChartDataItem[];
    };
    activities: Activity[];
  };
}

const SingleProduct = (props: Props) => {
  const singleProduct = [
    {
      field: "id",
      headerName: "ID",
      type: "string",
      width: 90,
      value: props.data.id,
    },
    {
      field: "img",
      headerName: "Image",
      type: "string",
      width: 100,
      value: props.data.img,
    },
    {
      field: "title",
      type: "string",
      headerName: "Title",
      width: 250,
      value: props.data.title,
    },
    {
      field: "color",
      type: "string",
      headerName: "Color",
      width: 150,
      value: props.data.color,
    },
    {
      field: "price",
      type: "string",
      headerName: "Price",
      width: 200,
      value: props.data.price,
    },
    {
      field: "producer",
      headerName: "Producer",
      type: "string",
      width: 200,
      value: props.data.producer,
    },
    {
      field: "createdAt",
      headerName: "Created At",
      width: 200,
      type: "string",
      value: props.data.createdAt,
    },
    {
      field: "inStock",
      headerName: "In Stock",
      width: 150,
      type: "string",
      value: String(props.data.inStock),
    },
  ];

  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ id, productData }: { id: number; productData: Product }) =>
      updateProduct(id, productData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["oneProduct", String(props.data.id)],
      });
    },
  });

  const onSubmit = (data: Record<string, string>) => {
    const fieldData = {
      title: data.title,
      price: data.price,
      color: data.color,
      producer: data.producer,
      inStock: toBoolean(data.inStock),
      img: data.img,
      id: props.data.id,
      createdAt: props.data.createdAt,
    };

    mutation.mutate({ id: Number(props.data.id), productData: fieldData });
  };

  return (
    <div className="single">
      <div className="view">
        <div className="info">
          <div className="topInfo">
            {props.data.img && <img src={props.data.img} alt="" />}
            <h1>{props.data.title}</h1>
            <button onClick={() => setIsOpen(true)}>Update</button>
          </div>
          <div className="details">
            <div className="item">
              <span className="itemTitle">Price:</span>
              <span className="itemValue">{props.data.price}</span>
            </div>
            <div className="item">
              <span className="itemTitle">Color:</span>
              <span className="itemValue">{props.data.color}</span>
            </div>
            <div className="item">
              <span className="itemTitle">Producer:</span>
              <span className="itemValue">{props.data.producer}</span>
            </div>
          </div>
        </div>
        <hr />
        {props.chartData.chart && (
          <div className="chart">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                width={500}
                height={300}
                data={props.chartData.chart.data}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                {props.chartData.chart.dataKeys.map((dataKey) => (
                  <Line
                    type="monotone"
                    dataKey={dataKey.name}
                    stroke={dataKey.color}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
      <div className="activities">
        <h2>Latest Activities</h2>
        {props.chartData.activities && (
          <ul>
            {props.chartData.activities.map((activity) => (
              <li key={activity.text}>
                <div>
                  <p>{activity.text}</p>
                  <time>{activity.time}</time>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      {isOpen && (
        <Edit
          slug="Product"
          data={singleProduct}
          setOpen={setIsOpen}
          onSubmit={onSubmit}
        />
      )}
    </div>
  );
};

export default SingleProduct;
