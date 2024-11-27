"use client";
import "./products.css";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CleaningServicesIcon from "@mui/icons-material/CleaningServices";
import SearchIcon from "@mui/icons-material/Search";
import Link from "next/link";
import Image from "next/image";
import {
  alpha,
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  InputBase,
  Menu,
  MenuItem,
  Pagination,
  Radio,
  RadioGroup,
  styled,
  Tooltip,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Triangle } from "react-loader-spinner";
// ====================
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import { ExpandMore } from "@mui/icons-material";
import { Flip, toast, ToastContainer } from "react-toastify";
import { usePathname } from "next/navigation";

// ====================

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color: "rgb(55, 65, 81)",
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
    ...theme.applyStyles("dark", {
      color: theme.palette.grey[300],
    }),
  },
}));

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const Products = () => {
  // =========================
  const pathname = usePathname()
  const [open2, setOpen2] = useState(false);
 
  const [token, setToken] = useState(null);
  

  const handleClick2 = () => {
    setOpen2(!open2);
  };

  // =========================
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sort, setSort] = useState("");
  const [categories, setCategories] = useState("");
  const [valueInpute, SetValueinput] = useState("");
  const [countPage, setCountPage] = useState(1);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
    fetchProducts(currentPage, sort, categories);
  }, [currentPage, sort, categories, valueInpute]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handlePageChange = (event, page) => {
    setCurrentPage(page, sort, categories);
  };

  const fetchProducts = async (page, sort, categories) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://node-js-ecommerce-sand.vercel.app/api/products?limit=8&page=${page}&sort=${sort}&categories=${categories}`
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

      setCountPage(data.data.totalPages);
      setProducts(data.data.Products);

      if (!valueInpute == "") {
        const results = data.data.Products.filter((product) =>
          product.Titel.toLowerCase().startsWith(valueInpute)
        );

        setProducts(results);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error(data.data.Message, {
        position: "top-left",
        autoClose: 2200,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
    } finally {
      setLoading(false);
    }
  };

  const AddToCart = async (Titel, Price, Categroire, Imgs) => {
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
      Imgs,
    };
    try {
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
      console.log(data);

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
    } catch (error) {
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
    try {
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
    } catch (error) {
      console.log(error, "error");
    }
  };

  return (
    <div className="container">
      <div className="section3" id="section3">
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
        {/* ====== */}

        {pathname  === "http://localhost:3000/shop" ? (
          <>
            <div className="col-lg-12 col-8 col-md-12  mb-3 shadow">
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ "aria-label": "search" }}
                  value={valueInpute}
                  onChange={(e) => SetValueinput(e.target.value)}
                />
              </Search>
            </div>
            <div className="w-100 d-flex align-items-center mb-3">
              {/* ================================================== */}
              <div
                className="container Fillters shadow col-lg-3   m-0"
                style={{ height: "fit-content" }}
              >
                <List
                  sx={{ width: "100%", bgcolor: "background.paper" }}
                  component="nav"
                  aria-labelledby="nested-list-subheader"
                >
                  <ListItemButton onClick={handleClick2}>
                    <ListItemText primary="Categories" />
                    {open2 ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>
                  <Collapse in={open2} timeout="auto">
                    <List component="div" disablePadding>
                      <ListItemButton sx={{ pl: 4 }}>
                        <FormControl>
                          <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue="female"
                            name="radio-buttons-group"
                          >
                            <FormControlLabel
                              value="Vegetaples"
                              onClick={() => {
                                setCategories("Vegetaples");
                                handleClick2();
                              }}
                              control={<Radio color="success" />}
                              label="Vegetaples"
                            />
                            <FormControlLabel
                              value="Fruites"
                              onClick={() => {
                                setCategories("Fruites");
                                handleClick2();
                              }}
                              control={<Radio color="success" />}
                              label="Fruites"
                            />
                            <FormControlLabel
                              value="Meat"
                              onClick={() => {
                                setCategories("Meat");
                                handleClick2();
                              }}
                              control={<Radio color="success" />}
                              label="Meat"
                            />
                            <FormControlLabel
                              value="Chiken"
                              onClick={() => {
                                setCategories("Chiken");
                                handleClick2();
                              }}
                              control={<Radio color="success" />}
                              label="Chiken"
                            />
                            <FormControlLabel
                              value="Fish"
                              onClick={() => {
                                setCategories("Fish");
                                handleClick2();
                              }}
                              control={<Radio color="success" />}
                              label="Fish"
                            />
                          </RadioGroup>

                          <div className="mt-4">
                            <Button
                              onClick={() => {
                                setCategories("");
                                handleClick2();
                              }}
                              variant="outlined"
                              startIcon={<CleaningServicesIcon />}
                            >
                              Clean Categories
                            </Button>
                          </div>
                        </FormControl>
                      </ListItemButton>
                    </List>
                  </Collapse>
                </List>
              </div>

              {/* ================================================== */}
              <div className="w-100 h-50 d-flex justify-content-end btn-toggle  my-3">
                <Button
                  style={{ backgroundColor: "#198754" }}
                  id="demo-customized-button"
                  aria-controls={open ? "demo-customized-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  variant="contained"
                  disableElevation
                  onClick={handleClick}
                  endIcon={<KeyboardArrowDownIcon />}
                >
                  Fillters
                </Button>
                <StyledMenu
                  id="demo-customized-menu"
                  MenuListProps={{
                    "aria-labelledby": "demo-customized-button",
                  }}
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                >
                  <MenuItem
                    onClick={() => {
                      setSort("asc");
                      handleClose();
                    }}
                    disableRipple
                  >
                    Price from lowest to highest
                  </MenuItem>
                  <Divider sx={{ my: 0.5 }} />
                  <MenuItem
                    onClick={() => {
                      setSort("desc");
                      handleClose();
                    }}
                    disableRipple
                  >
                    Price from highest to lowest
                  </MenuItem>
                </StyledMenu>
                {/* ============================================= */}
              </div>
            </div>
          </>
        ) : null}

        {/* ====== */}

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
          <div className="row">
            {products === "" ? (
              <p>Not Found Product</p>
            ) : (
              products.map((product, index) => (
                <div
                  key={product._id}
                  className="col-12 col-md-6 col-lg-3  d-flex flex-wrap justify-content-evenly"
                >
                  <div className="">
                    <div className="img-secti1 overflow-hidden">
                      <Link href={`/productDetails/${product._id}`}>
                        <div>
                          <Image
                            src={
                              product.Imgs?.[0] ||
                              "https://yosefsameh.github.io/Store-Vegetables/img/section-2-6.jpg"
                            }
                            alt={product.Titel}
                            width={500}
                            height={250}
                          />
                        </div>
                      </Link>
                      <div className="icones1">
                        <Tooltip title="Favorite" arrow>
                          <i
                            className="me-4"
                            onClick={() => SaveProduct(product._id)}
                          >
                            <FavoriteBorderIcon />
                          </i>
                        </Tooltip>
                        <Tooltip title="AddToCart" arrow>
                          <i
                            onClick={() =>
                              AddToCart(
                                product.Titel,
                                product.Price,
                                product.Categroire,
                                product.Imgs
                              )
                            }
                          >
                            <ShoppingCartIcon />
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
            )}
          </div>
        )}
      </div>

      <div className="w-100 d-flex justify-content-center mb-4 mt-5">
        <Pagination
          onChange={handlePageChange}
          count={countPage}
          variant="outlined"
          color="primary"
        />
      </div>
    </div>
  );
};

export default Products;
