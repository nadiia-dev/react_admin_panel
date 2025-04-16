export const generateMockUser = () => {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const chartData = days.map((day) => ({
    name: day,
    visits: Math.floor(Math.random() * 5000),
    clicks: Math.floor(Math.random() * 5000),
  }));

  const chart = {
    dataKeys: [
      { name: "visits", color: "#82ca9d" },
      { name: "clicks", color: "#8884d8" },
    ],
    data: chartData,
  };

  const sampleProducts = [
    "Playstation 5 Digital Edition",
    "Sony Bravia KD-32w800",
    "3 items",
    "1 item",
    "Samsung TV 4K SmartTV",
    "Dell Laptop KR211822",
  ];
  const actions = ["purchased", "added into wishlist", "reviewed the product"];

  const randomTime = () => {
    const values = ["3 days ago", "1 week ago", "2 weeks ago", "1 month ago"];
    return values[Math.floor(Math.random() * values.length)];
  };

  const activities = Array.from({ length: 6 }, (_, i) => {
    const product = sampleProducts[i];
    const action = actions[Math.floor(Math.random() * actions.length)];
    return {
      text: `This user ${action} ${product}`,
      time: randomTime(),
    };
  });

  return { chart, activities };
};
