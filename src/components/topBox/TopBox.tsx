import { useQuery } from "@tanstack/react-query";
import "./topBox.scss";
import { getTopDealUsers } from "../../services/usersApi";

const TopBox = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["topDealUsers"],
    queryFn: getTopDealUsers,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error instanceof Error) return <p>Error: {error.message}</p>;

  return (
    <div className="topBox">
      <h1>Top Deals</h1>
      <div className="list">
        {data &&
          data.map((user) => (
            <div className="listItem" key={user.id}>
              <div className="user">
                <img src={user.img} alt="user avatar" />
                <div className="userTexts">
                  <span className="username">
                    {user.firstName} {user.lastName}
                  </span>
                  <span className="email">{user.email}</span>
                </div>
              </div>
              <span className="amount">${user.amount}</span>
            </div>
          ))}
      </div>
    </div>
  );
};

export default TopBox;
