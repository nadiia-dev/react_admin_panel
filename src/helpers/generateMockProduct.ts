export const generateMockProduct = () => {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const chartData = days.map((day) => ({
    name: day,
    visits: Math.floor(Math.random() * 5000),
    orders: Math.floor(Math.random() * 5000),
  }));

  const chart = {
    dataKeys: [
      { name: "visits", color: "#82ca9d" },
      { name: "orders", color: "#8884d8" },
    ],
    data: chartData,
  };

  const sampleUsers = ["John", "Jane", "Mike", "Anna", "Michael", "Helen"];
  const actions = ["purchased", "added into wishlist", "reviewed"];

  const randomTime = () => {
    const values = ["3 days ago", "1 week ago", "2 weeks ago", "1 month ago"];
    return values[Math.floor(Math.random() * values.length)];
  };

  const activities = Array.from({ length: 6 }, (_, i) => {
    const user = sampleUsers[i];
    const action = actions[Math.floor(Math.random() * actions.length)];
    return {
      text: `${user} ${action} this product`,
      time: randomTime(),
    };
  });

  return { chart, activities };
};
