This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.








<!-- 
    "use client"
import "./products.css"
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Link from "next/link";
import Image from "next/image";
import { alpha, Button, Divider, FormControl, FormControlLabel, Menu, MenuItem, Pagination, Radio, RadioGroup, styled } from "@mui/material";
import { useEffect, useState } from "react";
import { Triangle } from "react-loader-spinner";


const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color: 'rgb(55, 65, 81)',
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
    ...theme.applyStyles('dark', {
      color: theme.palette.grey[300],
    }),
  },
}));


const Products = ()=>{
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [currentPage, setCurrentPage] = useState(1)
  const [products, setProducts] = useState(""); 
  const [loading, setLoading] = useState(false); 
  const [sort, setSort] = useState("");
  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const fetchProducts = async (page,sort) => {
    setLoading(true); 
    try {
      const response = await fetch(
        `http://localhost:3005/api/products?limit=9&page=${page}&sort=${sort}`
      );
      
      const data = await response.json();
      console.log(data.data.Products);
      console.log(products,"products");
      
      setProducts(data.data.Products); 
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false); 
    }
  };


  useEffect(() => { 
    fetchProducts(currentPage,sort);
  }, [currentPage,sort]);


  const handlePageChange = (event, page) => {
    setCurrentPage(page,sort); 
    // setSort("")
  };


return (
  <div className="container">
    <div className="section3" id="section3">
      {/* <div className="paragraf d-flex justify-content-center align-items-center text-center mb-5">
        <h2 className="fw-bold">Featured Product</h2>
      </div>  */}

      {/* ====== */}
      <div className="w-100 d-flex justify-content-end btn-toggle  my-3">
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
              // handelFillter()
              handleClose();
            }}
            disableRipple
          >
            {/* <EditIcon /> */}
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
            {/* <FileCopyIcon /> */}
            Price from highest to lowest
          </MenuItem>
          <Divider sx={{ my: 0.5 }} />
          <MenuItem onClick={handleClose} disableRipple>
            {/* <ArchiveIcon /> */}
            Add New
          </MenuItem>
        </StyledMenu>
        {/* ============================================= */}
      </div>
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
        <div className="row ">
          {products === ""
            ? null
            : products.map((product,index) => (
                <div
                  key={product._id}
                  className="col-12 col-md-6 col-lg-4  d-flex flex-wrap justify-content-evenly"
                  
                >
                  <div className="">
                    <div className="img-secti1 overflow-hidden">
                      <Link href={`/productDetails/${product._id}`}>
                        <div>
                          <Image
                            src="https://yosefsameh.github.io/Store-Vegetables/img/section-2-6.jpg"
                            alt={product.Titel}
                            width={500}
                            height={250}
                          />
                        </div>
                      </Link>
                      <div className="icones1">
                        <i className="me-4">
                          <FavoriteBorderIcon />
                        </i>
                        <i>
                          <ShoppingCartIcon />
                        </i>
                      </div>
                    </div>
                    <div className="d-flex justify-content-center align-items-center flex-column mt-3">
                      <p className="fs-5 m-0">{product.Titel}{index+1}</p>
                      <p className="fw-bold fs-5 mt-2">${product.Price}</p>
                    </div>
                  </div>
                </div>
              ))}
        </div>
      )}
    </div>
    <div className="w-100 d-flex justify-content-center mt-5">
      <Pagination
        onChange={handlePageChange}
        count={10}
        variant="outlined"
        color="primary"
      />
    </div>
  </div>
);
}


// <div className="row mt-5">
//       <div className="col-12 col-md-6 col-lg-3">
//           <Link href={`/productDetails/${2}`}>
//             <div className="img-secti1 overflow-hidden">
//               <Image
//                 src="https://yosefsameh.github.io/Store-Vegetables/img/section-2-6.jpg"
//                 alt="Mango"
//                 width={500}
//                 height={250}
//               />

//               <div className="icones1">
//                 <Link href={"/savedPorducts"}>
//                   <i>
//                     <FavoriteBorderIcon />
//                   </i>
//                 </Link>
//                 <Link style={{ marginLeft: "20px" }} href={"/cartShopping"}>
//                   <i>
//                     <ShoppingCartIcon />
//                   </i>
//                 </Link>
//               </div>
//             </div>
//           </Link>
//           <div className="d-flex justify-content-center align-items-center flex-column mt-3">
//             <p className="fs-5 m-0">Crab Pool Security</p>
//             <p className="fw-bold fs-5 mt-2">$15.00</p>
//           </div>
//         </div>
//         {/* ========= */}
//         <div className="col-12 col-md-6 col-lg-3">
//           <Link href={`/productDetails/${2}`}>
//             <div className="img-secti1 overflow-hidden">
//               <Image
//                 src="https://yosefsameh.github.io/Store-Vegetables/img/section-2-6.jpg"
//                 alt="Mango"
//                 width={500}
//                 height={250}
//               />

//               <div className="icones1">
//                 <Link href={"/savedPorducts"}>
//                   <i>
//                     <FavoriteBorderIcon />
//                   </i>
//                 </Link>
//                 <Link style={{ marginLeft: "20px" }} href={"/cartShopping"}>
//                   <i>
//                     <ShoppingCartIcon />
//                   </i>
//                 </Link>
//               </div>
//             </div>
//           </Link>
//           <div className="d-flex justify-content-center align-items-center flex-column mt-3">
//             <p className="fs-5 m-0">Crab Pool Security</p>
//             <p className="fw-bold fs-5 mt-2">$15.00</p>
//           </div>
//         </div>
//         {/* ========= */}

//         <div className="col-12 col-md-6 col-lg-3">
//           <Link href={`/productDetails/${2}`}>
//             <div className="img-secti1 overflow-hidden">
//               <Image
//                 src="https://yosefsameh.github.io/Store-Vegetables/img/section-2-6.jpg"
//                 alt="Mango"
//                 width={500}
//                 height={250}
//               />

//               <div className="icones1">
//                 <Link href={"/savedPorducts"}>
//                   <i>
//                     <FavoriteBorderIcon />
//                   </i>
//                 </Link>
//                 <Link style={{ marginLeft: "20px" }} href={"/cartShopping"}>
//                   <i>
//                     <ShoppingCartIcon />
//                   </i>
//                 </Link>
//               </div>
//             </div>
//           </Link>
//           <div className="d-flex justify-content-center align-items-center flex-column mt-3">
//             <p className="fs-5 m-0">Crab Pool Security</p>
//             <p className="fw-bold fs-5 mt-2">$15.00</p>
//           </div>
//         </div>
//         {/* ========= */}
//         <div className="col-12 col-md-6 col-lg-3">
//           <Link href={`/productDetails/${2}`}>
//             <div className="img-secti1 overflow-hidden">
//               <Image
//                 src="https://yosefsameh.github.io/Store-Vegetables/img/section-2-6.jpg"
//                 alt="Mango"
//                 width={500}
//                 height={250}
//               />

//               <div className="icones1">
//                 <Link href={"/savedPorducts"}>
//                   <i>
//                     <FavoriteBorderIcon />
//                   </i>
//                 </Link>
//                 <Link style={{ marginLeft: "20px" }} href={"/cartShopping"}>
//                   <i>
//                     <ShoppingCartIcon />
//                   </i>
//                 </Link>
//               </div>
//             </div>
//           </Link>
//           <div className="d-flex justify-content-center align-items-center flex-column mt-3">
//             <p className="fs-5 m-0">Crab Pool Security</p>
//             <p className="fw-bold fs-5 mt-2">$15.00</p>
//           </div>
//         </div>
//         {/* ========= */}
//       </div>
//     </div>

export default Products






{/* ========= */}

{/* <div className="">
<Link href={`/productDetails/${2}`}>
  <div className="img-secti1 overflow-hidden">
    <Image
      src="https://yosefsameh.github.io/Store-Vegetables/img/section-2-6.jpg"
      alt="Mango"
      width={500}
      height={250}
    />

    <div className="icones1">
      <Link href={"/savedPorducts"}>
        <i>
          <FavoriteBorderIcon />
        </i>
      </Link>
      <Link style={{ marginLeft: "20px" }} href={"/cartShopping"}>
        <i>
          <ShoppingCartIcon />
        </i>
      </Link>
    </div>
  </div>
</Link>
<div className="d-flex justify-content-center align-items-center flex-column mt-3">
  <p className="fs-5 m-0">Crab Pool Security</p>
  <p className="fw-bold fs-5 mt-2">$15.00</p>
</div>
</div> */}
{/* ========= */}
 -->