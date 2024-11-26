"use client";
import { Favorite } from "@mui/icons-material";
import { Rating, Tooltip } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useEffect, useState } from "react";
import "./details.modeul.css";
import { Triangle } from "react-loader-spinner";
import { Flip, toast, ToastContainer } from "react-toastify";

const DetailsProduct = ({ idproduct }) => {
  const [count, setCount] = useState(1);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  const handelCount = () => {
    setCount(count + 1);
  };

  const handelDecrement = () => {
    if (count === 0) {
      return;
    }
    setCount(count - 1);
  };

  const fetchProduct = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://node-js-ecommerce-sand.vercel.app/api/products/${idproduct}`
      );

      const data = await response.json();

      setProduct(data.data.Products);

      if (data.status === "Fail") {
        toast.error(data.data.Message, {
          position: "top-left",
          autoClose: 2200,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
        });
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const AddToCart = async (Titel, Price, Categroire) => {
    if (!token) {
      return toast.error("You Must Login Before", {
        position: "top-left",
        autoClose: 2200,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
    }

    const body = {
      Titel,
      Price,
      Categroire,
    };

    const response = await fetch(
      `https://node-js-ecommerce-sand.vercel.app/api/users/cartshopping`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      }
    );
    const data = await response.json();

    if (response.ok) {
      toast.success("Added to cart successfully", {
        position: "top-left",
        autoClose: 2200,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
    }
    if (data.status === "Fail") {
      toast.error(data.data.Message, {
        position: "top-left",
        autoClose: 2200,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
    }
  };

  const SaveProduct = async (productId) => {
    if (!token) {
      return toast.error("You Must Login Before", {
        position: "top-left",
        autoClose: 2200,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
    }
    const response = await fetch(
      `https://node-js-ecommerce-sand.vercel.app/api/users/save/${productId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();

    if (response.ok) {
      toast.success("Added to Saved successfully", {
        position: "top-left",
        autoClose: 2200,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
    }
    if (data.status === "Fail") {
      toast.error(data.data.Message, {
        position: "top-left",
        autoClose: 2200,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <>
      {loading ? (
        <div className="d-flex justify-content-start w-75">
          <Triangle
            visible={true}
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="triangle-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
      ) : !product ? null : (
        <div className="d-flex flex-column  ms-3 details w-100">
          <div className="" style={{ width: "fit-content" }}>
            <h3>{product.Titel}</h3>
            <p>{product.Details}</p>
            <Rating name="read-only" value={3} readOnly />
            <p>${product.Price}</p>
            <p className="w-50">{product.Detaials}</p>
            <div className="d-flex" style={{ height: 45, width: "100%" }}>
              <Tooltip title="KG" arrow>
                <div
                  className="rounded d-flex justify-content-center align-items-center me-4 bg-white fs-5 border"
                  style={{ borderColor: "green" }}
                >
                  <button
                    className="m-2 fw-bold"
                    onClick={handelDecrement}
                    style={{
                      backgroundColor: "transparent",
                      border: 0,
                      fontSize: 29,
                    }}
                  >
                    -
                  </button>
                  {count}
                  <button
                    className="m-2"
                    onClick={handelCount}
                    style={{
                      backgroundColor: "transparent",
                      border: 0,
                      fontSize: 30,
                      fontWeight: "bold",
                    }}
                  >
                    +
                  </button>
                </div>
              </Tooltip>
              <Tooltip title="AddToCart" arrow>
                <button
                  className="bg-black text-white rounded p-3 d-flex justify-content-center align-items-center"
                  style={{ width: "35%" }}
                  onClick={() =>
                    AddToCart(product.Titel, product.Price, product.Categroire)
                  }
                >
                  Add to Cart
                </button>
              </Tooltip>
              <Tooltip title="Favorite" arrow>
                <button
                  onClick={() => SaveProduct(product._id)}
                  className="rounded p-3 d-flex justify-content-center align-items-center ms-4 bg-white border"
                >
                  <FavoriteBorderIcon />
                </button>
              </Tooltip>
            </div>
          </div>
        </div>
      )}
      <ToastContainer
        position="top-left"
        autoClose={2200}
        limit={2}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Flip}
      />
    </>
  );
};

export default DetailsProduct;
