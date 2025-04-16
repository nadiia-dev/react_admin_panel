import { useQuery } from "@tanstack/react-query";
import "./user.scss";
import { getOneUser } from "../../services/usersApi";
import { User as userType } from "../../types/User";
import { useParams } from "react-router-dom";
import SingleUser from "../../components/singleUser/SingleUser";
import { generateMockUser } from "../../helpers/generateMockUser";

const User = () => {
  const { id } = useParams<{ id: string }>();

  const {
    data: user,
    isLoading,
    error,
  } = useQuery<userType>({
    queryKey: ["oneUser", id],
    queryFn: () => getOneUser(id!),
  });

  if (isLoading) return <p>Loading...</p>;
  if (error instanceof Error) return <p>Error: {error.message}</p>;

  const chartData = generateMockUser();

  return <div>{user && <SingleUser data={user} chartData={chartData} />}</div>;
};

export default User;
