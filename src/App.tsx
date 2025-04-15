import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Home from "./pages/home/Home";
import Users from "./pages/users/Users";
import Products from "./pages/products/Products";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Menu from "./components/menu/Menu";
import "./styles/global.scss";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// import { collection, addDoc } from "firebase/firestore";
// import { db } from "./services/firebaseConfig";
// import { useEffect } from "react";

// const dummyProjects = [
//   {
//     id: 1,
//     img: "https://images.pexels.com/photos/8405873/pexels-photo-8405873.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
//     lastName: "Hubbard",
//     firstName: "Eula",
//     email: "hubbard@gmail.com",
//     phone: "423 452 729",
//     createdAt: "05.07.2023",
//     verified: true,
//     amount: "1.111",
//   },
//   {
//     id: 2,
//     img: "https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=1600",
//     lastName: "Manning",
//     firstName: "Stella",
//     email: "manning@gmail.com",
//     phone: "422 426 715",
//     createdAt: "03.07.2023",
//     verified: true,
//     amount: "1.960",
//   },
//   {
//     id: 3,
//     img: "https://images.pexels.com/photos/1587009/pexels-photo-1587009.jpeg?auto=compress&cs=tinysrgb&w=1600",
//     lastName: "Greer",
//     firstName: "Mary",
//     email: "greer@hottmail.com",
//     phone: "563 632 325",
//     createdAt: "02.07.2023",
//     verified: true,
//     amount: "2.660",
//   },
//   {
//     id: 4,
//     img: "https://images.pexels.com/photos/871495/pexels-photo-871495.jpeg?auto=compress&cs=tinysrgb&w=1600",
//     lastName: "Williamson",
//     firstName: "Mildred",
//     email: "williamson@gmail.com",
//     phone: "534 522 125",
//     createdAt: "12.06.2023",
//     verified: true,
//     amount: "2.260",
//   },
//   {
//     id: 5,
//     img: "https://images.pexels.com/photos/1758144/pexels-photo-1758144.jpeg?auto=compress&cs=tinysrgb&w=1600",
//     lastName: "Gross",
//     firstName: "Jose",
//     email: "gobtagbes@yahoo.com",
//     phone: "462 252 624",
//     createdAt: "10.06.2023",
//     amount: "1.500",
//   },
//   {
//     id: 6,
//     img: "https://images.pexels.com/photos/769745/pexels-photo-769745.jpeg?auto=compress&cs=tinysrgb&w=1600",
//     lastName: "Sharp",
//     firstName: "Jeremy",
//     email: "vulca.eder@mail.com",
//     phone: "735 523 563",
//     createdAt: "11.05.2023",
//     verified: true,
//     amount: "1.110",
//   },
//   {
//     id: 7,
//     img: "https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=1600",
//     lastName: "Lowe",
//     firstName: "Christina",
//     email: "reso.bilic@gmail.com",
//     phone: "235 734 574",
//     createdAt: "04.05.2023",
//     amount: "2.580",
//   },
//   {
//     id: 8,
//     img: "https://images.pexels.com/photos/428364/pexels-photo-428364.jpeg?auto=compress&cs=tinysrgb&w=1600",
//     lastName: "Dean",
//     firstName: "Garrett",
//     email: "codaic@mail.com",
//     phone: "377 346 834",
//     createdAt: "08.04.2023",
//     verified: true,
//     amount: "1.360",
//   },
//   {
//     id: 9,
//     img: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=1600",
//     lastName: "Parsons",
//     firstName: "Leah",
//     email: "parsons@gmail.com",
//     phone: "745 677 345",
//     createdAt: "04.04.2023",
//     amount: "1.932",
//   },
//   {
//     id: 10,
//     img: "https://images.pexels.com/photos/775358/pexels-photo-775358.jpeg?auto=compress&cs=tinysrgb&w=1600",
//     lastName: "Reid",
//     firstName: "Elnora",
//     email: "elnora@gmail.com",
//     phone: "763 345 346",
//     createdAt: "01.04.2023",
//     verified: true,
//     amount: "1.560",
//   },
//   {
//     id: 11,
//     img: "https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=1600",
//     lastName: "Dunn",
//     firstName: "Gertrude",
//     email: "gertrude@gmail.com",
//     phone: "124 456 789",
//     createdAt: "05.04.2023",
//     verified: true,
//     amount: "2.512",
//   },
//   {
//     id: 12,
//     img: "https://images.pexels.com/photos/774095/pexels-photo-774095.jpeg?auto=compress&cs=tinysrgb&w=1600",
//     lastName: "Williams",
//     firstName: "Mark",
//     email: "williams@hotmail.com",
//     phone: "626 235 345",
//     createdAt: "01.03.2023",
//     amount: "2.134",
//   },
//   {
//     id: 13,
//     img: "https://images.pexels.com/photos/761977/pexels-photo-761977.jpeg?auto=compress&cs=tinysrgb&w=1600",
//     lastName: "Cruz",
//     firstName: "Charlotte",
//     email: "charlotte@gmail.com",
//     phone: "673 547 343",
//     createdAt: "03.02.2023",
//     amount: "2.998",
//   },
//   {
//     id: 14,
//     img: "https://images.pexels.com/photos/927022/pexels-photo-927022.jpeg?auto=compress&cs=tinysrgb&w=1600",
//     lastName: "Harper",
//     firstName: "Sara",
//     email: "harper@hotmail.com",
//     phone: "734 234 234",
//     createdAt: "01.02.2023",
//     amount: "3.256",
//   },
//   {
//     id: 15,
//     img: "https://images.pexels.com/photos/8405873/pexels-photo-8405873.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
//     lastName: "Griffin",
//     firstName: "Eric",
//     email: "griffin@gmail.com",
//     phone: "763 234 235",
//     createdAt: "01.01.2023",
//     amount: "3.668",
//   },
// ];

const queryClient = new QueryClient();

function App() {
  // const uploadProjects = async () => {
  //   try {
  //     const projectsRef = collection(db, "users");
  //     for (const project of dummyProjects) {
  //       await addDoc(projectsRef, project);
  //     }
  //     console.log("Всі проєкти додано!");
  //   } catch (error) {
  //     console.error("Помилка при додаванні:", error);
  //   }
  // };

  // useEffect(() => {
  //   uploadProjects();
  // });

  const Layout = () => {
    return (
      <div className="main">
        <Navbar />
        <div className="container">
          <div className="menuContainer">
            <Menu />
          </div>
          <div className="contentContainer">
            <QueryClientProvider client={queryClient}>
              <Outlet />
            </QueryClientProvider>
          </div>
        </div>
        <Footer />
      </div>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/users",
          element: <Users />,
        },
        {
          path: "/products",
          element: <Products />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
