"use client"
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { Button, Card, CardActions, CardContent, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, TextField, Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Image from 'next/image';
import { Triangle } from 'react-loader-spinner';
import { Flip, toast, ToastContainer } from 'react-toastify';
import { UploadFiles } from '../components/uplode';

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
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export default function VerticalTabs() {

  
const [token, setToken] = useState(null);

  const [value, setValue] = useState(0);
  
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
    fetchOrders();
    fetchProducts();
  }, []);
  // ====================================

  // Orders
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true)
  const [openDeleteOrder, setOpenDeleteOrder] = useState(false);
  const [openFormEdit, setOpenFormeEdit] = useState(false);
  const [SelectedOrderId, setSelectedOrderId] = useState("");

  const handleClickOpenDeleteOrder = (orderId) => {
    setSelectedOrderId(orderId);
    setOpenDeleteOrder(true);
  };
  

  const handleCloseDeleteOrder = () => {
    setOpenDeleteOrder(false);
  };

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://node-js-ecommerce-sand.vercel.app/api/order', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
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
      setOrders(data.data); 
    

      
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
    finally {
      setLoading(false); 
    }
  };

  const DeleteOrder = async (idOrder) => {
    setLoading(true);
    

    
    try {
        const response = await fetch(`https://node-js-ecommerce-sand.vercel.app/api/order/${idOrder}`, {
            method:"DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            const data = await response.json();
           

              if(data.status === "Successful"){
                toast.success("This order has been successfully deleted.", {
                  toastId: "delete-Order",
                    position: "top-left",
                    autoClose: 2200,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: "light",
                  });
                  fetchOrders()
                  handleCloseDeleteOrder()
                }
                else{

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
                  console.error('Error fetching orders:', error);
                }
                finally {
                    setLoading(false); 
                  }
                }
              

// Orders



  // Prodcuts
  const [products, setProducts] = useState([]);
  const [idProduct, setIdProduct] = useState(0);
  const [idProductDelete, setIdProductDelete] = useState(0);
  const [openDelete, setOpenDelete] = useState(false);
  const [newProduct, setNewProduct] = useState({ Titel: '', Detaials: '', Price: "", Categroire: '',Imgs:[] });
  
  const handleClickOpenDelete = (idProduct) => {
    setIdProductDelete(idProduct);
    setOpenDelete(true);
  };
  
  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const handleClickOpenForm = (id) => {
    setOpenFormeEdit(true);
    setIdProduct(id)
  };

  const handleCloseForm = () => {
    setOpenFormeEdit(false);
  };
  

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://node-js-ecommerce-sand.vercel.app/api/products');
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
      setProducts(data.data.Products);
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Failed to fetch products. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Uplode images

  const handleUploadMultipleImages = async () => {
    const imageUrls = [];
  
    
    if (!newProduct.Imgs || newProduct.Imgs.length === 0) {
      return toast.error('No images selected');
    }
  

    for (const file of newProduct.Imgs) {
      const uploadedImage = await UploadFiles(file); 
      imageUrls.push(uploadedImage.url); 
    }
  
    return imageUrls;
  };
  
  const handleAddProduct = async () => {
    setLoading(true);

    const imageUrls = await handleUploadMultipleImages();

    
    const body = {
      Imgs:imageUrls,
      Titel:newProduct.Titel,
      Price:newProduct.Price,
      Detaials:newProduct.Detaials,
      Categroire:newProduct.Categroire,
    }
    try {
      const response = await fetch('https://node-js-ecommerce-sand.vercel.app/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });
      const data = await response.json();

      if (data.status === "Successful") {
        toast.success("Product added successfully!");
        setNewProduct({ Titel: '', Detaials: '', Price: "", Categroire: '', Imgs: [] });
        fetchProducts();
      } else {
        toast.error(data.data.Message || "Failed to add product.");
      }
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error("Failed to add product. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  
  const handleDeleteProduct = async (id) => {
    setLoading(true);
    try {
      const response = await fetch(`https://node-js-ecommerce-sand.vercel.app/api/products/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();

      if (data.status === "Successful") {
        toast.success("Product deleted successfully!");
        fetchProducts();
        handleCloseDelete()
      } else {
        toast.error(data.data.Message || "Failed to delete product.");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Failed to delete product. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  
  const handelEditProduct = async () => {
    setLoading(true);
    
    try {
      const response = await fetch(`https://node-js-ecommerce-sand.vercel.app/api/products/${idProduct}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newProduct),
      });
      const data = await response.json();

      if (data.status === "Successful") {
        await fetchProducts();
        setNewProduct({ Titel: '', Detaials: '', Price: "", Categroire: '', Imgs: [] });
        handleCloseForm()
        toast.success("Product Edit successfully!");
      } else {
        toast.error(data.data.Message || "Failed to edit product.");
      }
    } catch (error) {
      console.error("Error editing product:", error);
      toast.error("Failed to edit product. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  
  // ====================================

  
  
  // Products



  return (
    <Box sx={{ flexGrow: 1, bgcolor: "background.paper", display: "flex" }}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: "divider" }}
      >
        <Tab
          icon={<LocalShippingIcon />}
          iconPosition="start"
          label="Orders"
          {...a11yProps(0)}
        />
        <Tab
          icon={<LibraryAddIcon />}
          iconPosition="start"
          label="Add Product"
          {...a11yProps(1)}
        />
      </Tabs>

      {/* Orders Tab */}
      <TabPanel value={value} index={0} style={{ width: "80%" }}>
        <h4>Orders</h4>
        <hr />
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
        ) : orders.length > 0 ? (
          orders.map((order, index) => (
            <Card
              key={index}
              sx={{
                marginBottom: "20px",
                boxShadow: 3,
                borderRadius: "8px",
                padding: "10px",
              }}
            >
              <CardContent>
                <Typography variant="h6">
                  Name: {order.firstName} {order.lastName}
                </Typography>
                <Typography variant="h6">
                  Total Price: ${order.total}
                </Typography>

                <Typography variant="body1">
                  Address: {order.Address}
                </Typography>
                <div style={{ marginTop: "15px" }}>
                  {order.Orders.map((item, idx) => (
                    <div key={idx} className="d-flex align-items-center mb-3">
                      <Image
                        src={item.Imgs?.[0]}
                        width={90}
                        height={90}
                        alt="img"
                        className="rounded"
                      />
                      <div className="ms-3">
                        <Typography variant="body1 h5">{item.Titel}</Typography>
                        <Typography variant="body1">
                          Price: {item.Price}$
                        </Typography>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardActions>
                <Tooltip title="Delete">
                  <IconButton
                    onClick={() => handleClickOpenDeleteOrder(order._id)}
                  >
                    <DeleteIcon color="error" />
                  </IconButton>
                </Tooltip>
              </CardActions>
            </Card>
          ))
        ) : (
          <div>
            {" "}
            <p>No Orders Available</p>
          </div>
        )}

        <Dialog open={openDeleteOrder} onClose={handleCloseDeleteOrder}>
          <DialogContent>
            <DialogContentText>
              Has this order been delivered?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDeleteOrder}>No</Button>
            <Button
              onClick={() => SelectedOrderId && DeleteOrder(SelectedOrderId)}
            >
              Yes, Delete
            </Button>
          </DialogActions>
        </Dialog>

      </TabPanel>
      {/* Orders */}

      {/* Product */}
      {loading ? (
        <div className="d-flex justify-content-center align-items-center w-50">
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
        <TabPanel value={value} index={1}>
          <div className="">
            <div className="admin-page">
              <div className="product-form">
                <input
                  type="text"
                  placeholder="اسم المنتج"
                  value={newProduct.Titel}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, Titel: e.target.value })
                  }
                />
                <textarea
                  placeholder="وصف المنتج"
                  value={newProduct.Detaials}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, Detaials: e.target.value })
                  }
                ></textarea>
                <input
                  type="number"
                  placeholder="السعر"
                  value={newProduct.Price}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, Price: e.target.value })
                  }
                />
                <input
                  type="text"
                  placeholder="categries"
                  value={newProduct.Categroire}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, Categroire: e.target.value })
                  }
                />
                <input
                  type="file"
                  multiple
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, Imgs: e.target.files })
                  }
                />
                <button className="btn add" onClick={handleAddProduct}>
                  إضافة المنتج
                </button>
              </div>

              <div className="product-list">
                {products.map((product) => (
                  <div className="product-item" key={product._id}>
                    {" "}
                    <Image
                      src={product.Imgs?.[0]}
                      width={90}
                      height={90}
                      alt="img"
                      className="rounded"
                    />
                    <h2>{product.Titel}</h2>
                    <p>{product.Detaials}</p>
                    <p>{product.Price} $</p>
                    <Tooltip title="Edit">
                      {/* onClick={() => handleEditProduct(product)} */}
                      <IconButton
                        onClick={() => handleClickOpenForm(product._id)}
                      >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton
                        onClick={() => handleClickOpenDelete(product._id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </div>
                ))}
                <Dialog
                  open={openFormEdit}
                  onClose={handleCloseForm}
                  PaperProps={{
                    component: "form",
                    onSubmit: (event) => {
                      event.preventDefault();
                      const formData = new FormData(event.currentTarget);
                      const formJson = Object.fromEntries(formData.entries());
                      const email = formJson.email;
                      // handleCloseForm();
                    },
                  }}
                >
                  <DialogTitle>Edit</DialogTitle>
                  <DialogContent>
                    <TextField
                      autoFocus
                      margin="dense"
                      id="name"
                      name="Titel"
                      label="Titel"
                      type="text"
                      fullWidth
                      variant="standard"
                      value={newProduct.Titel}
                      onChange={(e) =>
                        setNewProduct({ ...newProduct, Titel: e.target.value })
                      }
                    />
                    <TextField
                      autoFocus
                      margin="dense"
                      id="name"
                      name="Price"
                      label="Price"
                      type="number"
                      fullWidth
                      variant="standard"
                      value={newProduct.Price}
                      onChange={(e) =>
                        setNewProduct({ ...newProduct, Price: e.target.value })
                      }
                    />
                    <TextField
                      autoFocus
                      margin="dense"
                      id="name"
                      name="Detaials"
                      label="Detaials"
                      type="text"
                      fullWidth
                      variant="standard"
                      value={newProduct.Detaials}
                      onChange={(e) =>
                        setNewProduct({
                          ...newProduct,
                          Detaials: e.target.value,
                        })
                      }
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleCloseForm}>Cancel</Button>
                    <Button onClick={handelEditProduct}>Edit</Button>
                  </DialogActions>
                </Dialog>
              </div>
              {/* Alert Delete Produtct */}
              <Dialog
                open={openDelete}
                onClose={handleCloseDelete}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    Are You Shoure Delete This Product
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleCloseDelete} autoFocus>
                    No
                  </Button>
                  <Button onClick={(e) => handleDeleteProduct(idProductDelete)}>
                    Yes, Delete
                  </Button>
                </DialogActions>
              </Dialog>
              {/* Alert Delete Produtct */}

              <style jsx>{`
                .admin-page {
                  max-width: 900px;
                  margin: 0 auto;
                  padding: 20px;
                  font-family: Arial, sans-serif;
                }
                h1 {
                  text-align: center;
                  color: #333;
                }
                .product-form {
                  background-color: #f9f9f9;
                  border-radius: 8px;
                  padding: 20px;
                  margin-bottom: 30px;
                  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                }
                .product-form input,
                .product-form textarea {
                  width: 100%;
                  padding: 10px;
                  margin: 8px 0;
                  border: 1px solid #ddd;
                  border-radius: 4px;
                  font-size: 16px;
                }
                .btn {
                  padding: 10px 20px;
                  border: none;
                  border-radius: 4px;
                  font-size: 16px;
                  cursor: pointer;
                  margin: 5px;
                }
                .btn.add {
                  background-color: #28a745;
                  color: #fff;
                }
                .btn.update {
                  background-color: #007bff;
                  color: #fff;
                }
                .btn.edit {
                  background-color: #ffc107;
                  color: #fff;
                }
                .btn.delete {
                  background-color: #dc3545;
                  color: #fff;
                }
                .product-list {
                  display: grid;
                  grid-template-columns: 1fr 1fr;
                  gap: 20px;
                }
                .product-item {
                  background-color: #fff;
                  border-radius: 8px;
                  padding: 20px;
                  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                  text-align: center;
                }
                .product-item h2 {
                  font-size: 20px;
                  color: #333;
                  margin: 10px 0;
                }
                .product-item p {
                  color: #666;
                  font-size: 16px;
                  margin: 5px 0;
                }
                .product-item strong {
                  color: #333;
                }
              `}</style>
            </div>
          </div>
        </TabPanel>
        //  Product
      )}

      <ToastContainer
        position="top-left"
        autoClose={1000}
        limit={1}
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
    </Box>
  );
}

