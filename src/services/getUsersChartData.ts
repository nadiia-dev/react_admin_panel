import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebaseConfig";
import { getDay } from "date-fns";
import { User } from "../types/User";

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const calcPercentage = (current: number, previous: number) => {
  if (previous === 0) return 100;
  return Math.round(((current - previous) / previous) * 100);
};

export const getUserChartData = async () => {
  const userSnapshot = await getDocs(collection(db, "users"));
  const users: User[] = userSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<User, "id">),
  }));

  const totalUsers = users.length;

  const chartData = days.map((day) => ({ name: day, users: 0 }));

  users.forEach((user) => {
    const createdAt = new Date(user.createdAt);
    if (createdAt) {
      const dayIndex = getDay(createdAt);
      chartData[dayIndex].users += 1;
    }
  });

  const dailyAverage = totalUsers / 7;
  const estimatedPrevious = dailyAverage * 7;

  return {
    color: "#8884d8",
    icon: "/userIcon.svg",
    title: "Total Users",
    number: totalUsers.toLocaleString("en-US"),
    dataKey: "users",
    percentage: calcPercentage(dailyAverage, estimatedPrevious),
    chartData,
    period: "this week",
  };
};
