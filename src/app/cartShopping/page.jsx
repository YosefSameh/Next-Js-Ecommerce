"use client";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Tooltip,
} from "@mui/material";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Triangle } from "react-loader-spinner";
import { Flip, toast, ToastContainer } from "react-toastify";
import TextField from "@mui/material/TextField";

const CartShopping = () => {
  const [idUser, setIdUser] = useState(null);
const [token, setToken] = useState(null);

  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [quantities, setQuantities] = useState({});
  const [address, setAddress] = useState("");
  const [idProductDelete, setIdProductDelete] = useState(0);
  const [openDelete, setOpenDelete] = useState(false);

  useEffect(() => {
    const storedIdUser = localStorage.getItem("idUser");
  const storedToken = localStorage.getItem("token");
  setIdUser(storedIdUser);
  setToken(storedToken);
    fetchUser();
  }, []);

  const handleClickOpenDelete = (idProduct) => {
    setIdProductDelete(idProduct);
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const handelCount = (index) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [index]: (prevQuantities[index] || 1) + 1,
    }));
  };

  const handelDecrement = (index) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [index]: prevQuantities[index] > 1 ? prevQuantities[index] - 1 : 1,
    }));
  };

  const fetchUser = async () => {
    setLoading(true);
    console.log(token, "token");
    try {
      const response = await fetch(
        `https://node-js-ecommerce-sand.vercel.app/api/users/${idUser}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      setCart(data.data.Users.cartShopping);

      const initialQuantities = data.data.Users.cartShopping.reduce(
        (acc, product, index) => {
          acc[index] = product.quantity || 1;
          return acc;
        },
        {}
      );
      setQuantities(initialQuantities);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const SendOrders = async () => {
    if (!token) {
      return toast.error("You Must Login ", {
        position: "top-left",
        autoClose: 2200,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
    }
    // Check For Input Address

    if (address.trim() === "") {
      return toast.error("Address is empty", { theme: "light" });
    }

    // calu Total Order
    const total = cart.reduce(
      (total, product, index) =>
        total + product.Price * (quantities[index] || 1),
      0
    );

    setLoading(true);
    try {
      const response = await fetch(`https://node-js-ecommerce-sand.vercel.app/api/order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ Address: address, total }),
      });

      const data = await response.json();

      if (data.status === "Successful") {
        toast.success("The order has been sent successfully.", {
          theme: "light",
        });
        fetchUser();
      } else {
        toast.error(data.data.Message, { theme: "light" });
      }
    } catch (error) {
      console.error("Error sending order:", error);
    } finally {
      setLoading(false);
    }
  };

  const DeleteCart = async (idCart) => {
    try {
      const response = await fetch(
        `https://node-js-ecommerce-sand.vercel.app/api/users/cartshopping/${idCart}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        handleCloseDelete();
        fetchUser();
      } else {
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
      console.error("Error deleting cart:", error);
    }
  };

  return (
    <div className="container  my-5 ">
      {loading ? (
        <div className="d-flex justify-content-center">
          <Triangle
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="loading"
          />
        </div>
      ) : (
        <div className="row">
          <div className="col-lg-8 col-12 mb-4">
            <div className="card shadow-sm">
              <div className="card-header bg-dark text-white">
                <h5 className="m-0">Shopping Cart</h5>
              </div>
              {!token ? (
                <h5 className="text-center my-3">You Must Login </h5>
              ) : (
                <div className="card-body">
                  {cart.length > 0 ? (
                    cart.map((product, index) => (
                      <div
                        className="d-flex align-items-center justify-content-between border-bottom py-3"
                        key={index}
                      >
                        {console.log(product)}
                        <div className="d-flex align-items-center">
                          <Image
                            src={product.Imgs?.[0]}
                            alt="img"
                            width={50}
                            height={50}
                          />
                          <div className="ms-3 d-flex flex-wrap">
                            <h6>{product.Titel}</h6>
                            <small>1KG</small>
                          </div>
                        </div>
                        <p className="fw-bold">{product.Price}$</p>
                        <div className="d-flex align-items-center">
                          <button
                            className="btn btn-light"
                            onClick={() => handelDecrement(index)}
                          >
                            -
                          </button>
                          <span className="mx-2">{quantities[index] || 1}</span>
                          <button
                            className="btn btn-light"
                            onClick={() => handelCount(index)}
                          >
                            +
                          </button>
                        </div>
                        <Button
                          variant="contained"
                          color="error"
                          onClick={() => handleClickOpenDelete(product._id)}
                        >
                          Delete
                        </Button>
                        <p className="fw-bold">
                          {(product.Price * (quantities[index] || 1)).toFixed(
                            2
                          )}
                          $
                        </p>
                      </div>
                    ))
                  ) : (
                    <h5 className="text-center">No items in the cart</h5>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Right Side: Checkout Summary */}
          <div className="col-lg-4 col-12">
            <div className="card shadow-sm">
              <div className="card-header bg-dark text-white">
                <h5 className="m-0">Order Summary</h5>
              </div>
              <div className="card-body">
                <div className="d-flex justify-content-between">
                  <p className="m-0">Subtotal</p>
                  <p className="fw-bold">
                    {cart
                      .reduce(
                        (total, product, index) =>
                          total + product.Price * (quantities[index] || 1),
                        0
                      )
                      .toFixed(2)}{" "}
                    $
                  </p>
                </div>
                <TextField
                  label="Address"
                  fullWidth
                  className="my-3"
                  onChange={(e) => setAddress(e.target.value)}
                />
                <button
                  className="btn w-100 btn-ChekOut bg-black text-white p-2 rounded "
                  onClick={SendOrders}
                >
                  Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDelete} onClose={handleCloseDelete}>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this product?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDelete} autoFocus>
            No
          </Button>
          <Button onClick={() => DeleteCart(idProductDelete)}>
            Yes, Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Toast Notifications */}
      <ToastContainer
        position="top-left"
        autoClose={2100}
        theme="light"
        transition={Flip}
      />
    </div>
  );
};

export default CartShopping;
