import { useParams } from "react-router-dom";
import "./product.scss";
import { useQuery } from "@tanstack/react-query";
import { getOneProduct } from "../../services/productsApi";
import { Product as productType } from "../../types/Product";
import { generateMockProduct } from "../../helpers/generateMockProduct";
import SingleProduct from "../../components/singleProduct/SingleProduct";

const Product = () => {
  const { id } = useParams<{ id: string }>();

  const {
    data: product,
    isLoading,
    error,
  } = useQuery<productType>({
    queryKey: ["oneProduct", id],
    queryFn: () => getOneProduct(id!),
  });

  if (isLoading) return <p>Loading...</p>;
  if (error instanceof Error) return <p>Error: {error.message}</p>;

  const chartData = generateMockProduct();

  return (
    <div>
      {product && <SingleProduct data={product} chartData={chartData} />}
    </div>
  );
};

export default Product;
