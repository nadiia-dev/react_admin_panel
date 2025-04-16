import {
  Legend,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Line,
} from "recharts";
import "./single.scss";
import { User } from "../../types/User";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUser } from "../../services/usersApi";
import Edit from "../edit/Edit";
import { toBoolean } from "../../helpers/toBoolean";

type ChartDataKey = {
  name: string;
  color: string;
};

type ChartDataItem = {
  name: string;
  visits: number;
  clicks: number;
};

type Activity = {
  text: string;
  time: string;
};

interface Props {
  data: User;
  chartData: {
    chart: {
      dataKeys: ChartDataKey[];
      data: ChartDataItem[];
    };
    activities: Activity[];
  };
}

const SingleUser = (props: Props) => {
  const singleUser = [
    {
      field: "id",
      headerName: "ID",
      type: "string",
      width: 90,
      value: props.data.id,
    },
    {
      field: "img",
      headerName: "Avatar",
      type: "string",
      width: 100,
      value: props.data.img,
    },
    {
      field: "firstName",
      type: "string",
      headerName: "First name",
      width: 150,
      value: props.data.firstName,
    },
    {
      field: "lastName",
      type: "string",
      headerName: "Last name",
      width: 150,
      value: props.data.lastName,
    },
    {
      field: "email",
      type: "string",
      headerName: "Email",
      width: 200,
      value: props.data.email,
    },
    {
      field: "phone",
      type: "string",
      headerName: "Phone",
      width: 200,
      value: props.data.phone,
    },
    {
      field: "createdAt",
      headerName: "Created At",
      width: 200,
      type: "string",
      value: props.data.createdAt,
    },
    {
      field: "verified",
      headerName: "Verified",
      width: 150,
      type: "string",
      value:
        props.data.verified !== undefined ? String(props.data.verified) : "",
    },
    {
      field: "amount",
      headerName: "Amount",
      width: 150,
      type: "number",
      value: props.data.amount ?? 0,
    },
  ];

  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ id, userData }: { id: number; userData: User }) =>
      updateUser(id, userData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["oneUser", String(props.data.id)],
      });
    },
  });

  const onSubmit = (data: Record<string, string>) => {
    const fieldData = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      verified: toBoolean(data.verified),
      id: props.data.id,
      createdAt: props.data.createdAt,
      img: data.img,
    };

    mutation.mutate({ id: Number(props.data.id), userData: fieldData });
  };

  return (
    <div className="single">
      <div className="view">
        <div className="info">
          <div className="topInfo">
            {props.data.img && <img src={props.data.img} alt="" />}
            <h1>
              {props.data.firstName} {props.data.lastName}
            </h1>
            <button onClick={() => setIsOpen(true)}>Update</button>
          </div>
          <div className="details">
            <div className="item">
              <span className="itemTitle">Email:</span>
              <span className="itemValue">{props.data.email}</span>
            </div>
            <div className="item">
              <span className="itemTitle">Phone:</span>
              <span className="itemValue">{props.data.phone}</span>
            </div>
            <div className="item">
              <span className="itemTitle">Status:</span>
              <span className="itemValue">
                {props.data.verified ? "verified" : "not verified"}
              </span>
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
          slug="User"
          data={singleUser}
          setOpen={setIsOpen}
          onSubmit={onSubmit}
        />
      )}
    </div>
  );
};

export default SingleUser;
