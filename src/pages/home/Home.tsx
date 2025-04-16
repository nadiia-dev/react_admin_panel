import { useEffect, useState } from "react";
import BarChartBox from "../../components/barChart/BarChartBox";
import BigChartBox from "../../components/bigChartBox/BigChartBox";
import ChartBox from "../../components/chartBox/ChartBox";
import PieChartBox from "../../components/pieChartBox/PieChartBox";
import TopBox from "../../components/topBox/TopBox";
import {
  barChartBoxRevenue,
  barChartBoxVisit,
  chartBoxConversion,
  chartBoxRevenue,
} from "../../data";
import "./home.scss";
import { getUserChartData } from "../../services/getUsersChartData";
import { getProductsChartData } from "../../services/getProductsChartData";

export type ChartBoxData = {
  color: string;
  icon: string;
  title: string;
  number: string;
  dataKey: string;
  percentage: number;
  chartData: object[];
  period: string;
};

const Home = () => {
  const [userChart, setUserChart] = useState<ChartBoxData>();
  const [productChart, setProductChart] = useState<ChartBoxData>();

  useEffect(() => {
    const fetchChart = async () => {
      const data = await getUserChartData();
      setUserChart(data);
    };

    fetchChart();
  }, []);

  useEffect(() => {
    const fetchChart = async () => {
      const data = await getProductsChartData();
      setProductChart(data);
    };

    fetchChart();
  }, []);

  return (
    <div className="home">
      <div className="box box1">
        <TopBox />
      </div>
      <div className="box box2">{userChart && <ChartBox {...userChart} />}</div>
      <div className="box box3">
        <ChartBox {...chartBoxConversion} />
      </div>
      <div className="box box4">
        <PieChartBox />
      </div>
      <div className="box box5">
        {productChart && <ChartBox {...productChart} />}
      </div>
      <div className="box box6">
        <ChartBox {...chartBoxRevenue} />
      </div>
      <div className="box box7">
        <BigChartBox />
      </div>
      <div className="box box8">
        <BarChartBox {...barChartBoxRevenue} />
      </div>
      <div className="box box9">
        <BarChartBox {...barChartBoxVisit} />
      </div>
    </div>
  );
};

export default Home;
