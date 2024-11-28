"use client";
import { Box, TextField } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Triangle } from "react-loader-spinner";
import { Flip, toast, ToastContainer } from "react-toastify";

const Rigster = () => {
  const router = useRouter();
  const [value, setValue] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });
  const [loading, setLoading] = useState(false);

  const handelRigster = () => {
    if (
      !value.email ||
      !value.password ||
      !value.firstName ||
      !value.lastName
    ) {
      toast.error("Please fill in all fields!", {
        position: "top-left",
        autoClose: 2200,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
      return;
    }

    setLoading(true);

    const body = {
      email: value.email,
      password: value.password,
      firstName: value.firstName,
      lastName: value.lastName,
    };

    fetch("https://node-js-ecommerce-sand.vercel.app/api/users/rigster", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "Successful") {
          router.push("/");
          localStorage.setItem("token", data.data.Users.token);
          localStorage.setItem("idUser", data.data.Users._id);
          localStorage.setItem("role",data.data.Users.role)
        } else {
          toast.error("This Email Is Used" || "SignUp failed!", {
            position: "top-left",
            autoClose: 2200,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "light",
          });
        }
      })
      .catch((error) => {
        toast.error("An error occurred during login!", {
          position: "top-left",
          autoClose: 2200,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleChange = (e) => {
    const { name, value: inputValue } = e.target;
    setValue((prev) => ({
      ...prev,
      [name]: inputValue,
    }));
  };

  return (
    <div className="container w-100">
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
      <div className="d-flex justify-content-center w-100 mt-5">
        <dvi className="d-flex flex-column col-12 col-lg-6   justify-content-center ">
          <h5>Welcome 👋</h5>
          <p>Please enter details</p>
          {loading ? (
            <div className="d-flex justify-content-center">
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
          ) : (
            <Box
              component="form"
              sx={{ "& > :not(style)": { m: 1, width: "25ch" } }}
              noValidate
              autoComplete="off"
              className="d-flex flex-column w-100"
            >
              <TextField
                id="outlined-basic"
                className="w-100 m-0 mb-4"
                label="First Name"
                variant="outlined"
                name="firstName"
                value={value.firstName}
                onChange={handleChange}
              />
              <TextField
                id="outlined-basic"
                className="w-100 m-0 mb-4"
                type="text"
                label="Last Name"
                variant="outlined"
                name="lastName"
                value={value.lastName}
                onChange={handleChange}
              />
              <TextField
                id="outlined-basic"
                className="w-100 m-0 mb-4"
                type="Email"
                label="Email"
                variant="outlined"
                name="email"
                value={value.email}
                onChange={handleChange}
              />
              <TextField
                id="outlined-basic"
                className="w-100 m-0 mb-4"
                type="password"
                label="Password"
                variant="outlined"
                name="password"
                value={value.password}
                onChange={handleChange}
              />
            </Box>
          )}
          <div className="w-100 ">
            <button
              onClick={handelRigster}
              disabled={loading}
              className="w-100 btn-ChekOut bg-black text-white p-2 rounded border-0"
            >
              {loading ? "Loading..." : "SignUp"}
            </button>
          </div>
          <Link className="mt-3" href={"/login"}>
            Orede has been Account Login
          </Link>
        </dvi>
      </div>
    </div>
  );
};

export default Rigster;
