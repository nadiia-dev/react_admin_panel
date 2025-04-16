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
  return (
    <div className="single">
      <div className="view">
        <div className="info">
          <div className="topInfo">
            {props.data.img && <img src={props.data.img} alt="" />}
            <h1>
              {props.data.firstName} {props.data.lastName}
            </h1>
            <button>Update</button>
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
    </div>
  );
};

export default SingleUser;
