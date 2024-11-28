"use client";
import { Box, TextField } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Triangle } from "react-loader-spinner";
import { Flip, toast, ToastContainer } from "react-toastify";

const Login = () => {
  const router = useRouter();
  const [value, setValue] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);


  const handelLogin = () => {

    if (!value.email || !value.password) {
      toast.error('Please fill in all fields!', {
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
    };

    fetch("https://node-js-ecommerce-sand.vercel.app/api/users/login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((data) => {
        
        if (data.status === "Successful") {
          localStorage.setItem("token",data.data.Users.token)
            localStorage.setItem("idUser",data.data.Users._id)

          if (data.data.Users.role == "Manger") {
            console.log(data.data.Users.role);
            router.push("/dashport"); 
            
            
          }else{

            router.push("/");
            console.log(data.data.Users.role);
          }
          
        } 
         else {
          toast.error(data.data.Message || 'Login failed!', {
            position: "top-left",
            autoClose: 2200,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true
            ,
            theme: "light",
          });
        }
        
      })
      .catch((error) => {
        console.log(error, 'catch');
        toast.error('An error occurred during login!', {
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
        <div className="d-flex flex-column col-12 col-lg-6 justify-content-center">
          <h5>Welcome 👋</h5>
          <p>Please Login here</p>
  
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
                label="Email"
                name="email"
                variant="outlined"
                value={value.email}
                onChange={handleChange}
              />
              <TextField
                id="outlined-basic"
                name="password"
                className="w-100 m-0 mb-4"
                type="password"
                label="Password"
                variant="outlined"
                value={value.password}
                onChange={handleChange}
              />
            </Box>
          )}
          <div className="w-100 ">
            <button
              onClick={handelLogin}
              className="w-100 btn-ChekOut bg-black text-white p-2 rounded border-0"
              disabled={loading} 
            >
              {loading ? "Loading..." : "Login"} 
            </button>
          </div>
          <Link className="mt-3" href={"/register"}>
            Create New Account
          </Link>
        </div>
      </div>
    </div>
  );
  
};

export default Login;
