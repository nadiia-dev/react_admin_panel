import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebaseConfig";
import { getDay } from "date-fns";
import { Product } from "../types/Product";

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const calcPercentage = (current: number, previous: number) => {
  if (previous === 0) return 100;
  return Math.round(((current - previous) / previous) * 100);
};

export const getProductsChartData = async () => {
  const productSnapshot = await getDocs(collection(db, "products"));
  const products: Product[] = productSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<Product, "id">),
  }));

  const totalProducts = products.length;

  const chartData = days.map((day) => ({
    name: day,
    products: 0,
  }));

  products.forEach((product) => {
    const createdAt = new Date(product.createdAt);
    if (createdAt) {
      const dayIndex = getDay(createdAt);
      chartData[dayIndex].products += 1;
    }
  });

  const dailyAverage = totalProducts / 7;
  const estimatedPrevious = dailyAverage * 7;

  return {
    color: "skyblue",
    icon: "/productIcon.svg",
    title: "Total Products",
    number: totalProducts.toLocaleString("en-US"),
    dataKey: "products",
    percentage: calcPercentage(dailyAverage, estimatedPrevious),
    chartData,
    period: "this week",
  };
};
