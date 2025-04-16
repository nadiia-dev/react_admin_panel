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
  return (
    <div className="single">
      <div className="view">
        <div className="info">
          <div className="topInfo">
            {props.data.img && <img src={props.data.img} alt="" />}
            <h1>{props.data.title}</h1>
            <button>Update</button>
          </div>
          <div className="details">
            <div className="item">
              <span className="itemTitle">Price:</span>
              <span className="itemValue">{props.data.color}</span>
            </div>
            <div className="item">
              <span className="itemTitle">Color:</span>
              <span className="itemValue">{props.data.price}</span>
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
    </div>
  );
};

export default SingleProduct;
