"use client";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import Link from "next/link";
import Image from "next/image";
import "../components/products.css";
import { Tooltip } from "@mui/material";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export default function VerticalTabs() {

  const [value, setValue] = useState(0);
  const [idUser, setIdUser] = useState(null);
  const [token, setToken] = useState(null);
  
  const [user, setUser] = useState("");

  const handleChange = (event,newValue) => {
    setValue(newValue);
  };

  const fetchUser = async () => {
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
      setUser(data.data.Users);
    } catch (error) {
      console.error("Error fetching products:", error);
    } 
  };

  useEffect(() => {
    const storedIdUser = localStorage.getItem("idUser");
  const storedToken = localStorage.getItem("token");
  setIdUser(storedIdUser);
  setToken(storedToken);
    fetchUser();
  }, [token]);

 

  const handelUnsave = async (productId) => {
    try {
      const response = await fetch(
        `https://node-js-ecommerce-sand.vercel.app/api/users/save/${productId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

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

      if (data.status === "Successful") {
        fetchUser();
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } 
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: "background.paper",
        display: "flex",
        height: 224,
      }}
    >
      <Tabs
        orientation="vertical"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: "divider" }}
      >
        <Tab
          icon={<SettingsIcon />}
          iconPosition="start"
          label="Setting"
          {...a11yProps(0)}
        />
        <Tab
          icon={<PersonIcon />}
          iconPosition="start"
          label="Personal Information"
          {...a11yProps(1)}
        />
        <Tab
          icon={<FavoriteBorderIcon />}
          iconPosition="start"
          label="My Save"
          {...a11yProps(2)}
        />
      </Tabs>
      <TabPanel value={value} index={0}>
        Soon
      </TabPanel>

      <TabPanel value={value} index={1}>
        {!user || !token ? (
          <h5>You Must Login</h5>
        ) : (
          <div>
            <h4>{user.email}</h4>
            <p className="mb-2">{user.firstName}</p>
            <p>{user.lastName}</p>
          </div>
        )}
      </TabPanel>

      <TabPanel value={value} index={2}>
        {/* =================================== */}
        {!token ? (
          <h5>You Must Login</h5>
        ) : (
          <div className="section3" id="section3">
            <div className="row">
              {user?.saveProducts?.length > 0 ? (
                user.saveProducts.map((product) => (
                  <div
                    key={product._id}
                    className={`col-12 col-md-6 ${user?.saveProducts?.length <= 1 ? "col-lg-12 " : null} ${user?.saveProducts?.length <= 2 ? "col-lg-6" : null}  ${user?.saveProducts?.length <= 3 ? "col-lg-4" : "col-lg-3"} d-flex flex-wrap justify-content-evenly`}
                  >
                    <div>
                      <div className="img-secti1 overflow-hidden">
                        <Link href={`/productDetails/${product.ProductId}`}>
                          <div>
                            <Image
                              src={product.Imgs?.[0]}
                              alt={product.Titel}
                              width={500}
                              height={250}
                            />
                          </div>
                        </Link>
                        <div className="icones1">
                          <Tooltip title="UnFavorite" arrow>
                            <i
                              className="me-4"
                              onClick={() => handelUnsave(product.ProductId)}
                            >
                              <FavoriteBorderIcon />
                            </i>
                          </Tooltip>
                        </div>
                      </div>
                      <div className="d-flex justify-content-center align-items-center flex-column mt-3">
                        <p className="fs-5 m-0">{product.Titel}</p>
                        <p className="fw-bold fs-5 mt-2">${product.Price}</p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center">No Product Saved</p>
              )}
            </div>
          </div>
        )}
        {/* =================================== */}
      </TabPanel>
    </Box>
  );
}
