"use client"
import { Container, Nav, Navbar } from "react-bootstrap";
import Link from "next/link";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Badge, Button, IconButton } from "@mui/material";
import { usePathname } from "next/navigation";
import "./nav.css";

const NavBar = () => {
  const pathname = usePathname()

  return (
    <>
      {pathname !== "/dashport" && (
        <div className=" ">
          <Navbar expand="lg" className="bg-body-tertiary  ">
            <Container>
              <Navbar.Brand className="fs-4 fw-bold">Souq On</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav
                  className="d-flex justify-content-center nav-item fw-bold "
                  style={{ width: "100%" }}
                >
                  <Link href="/" className="nav-link">
                    Home
                  </Link>
                  <Link href="/shop" className="nav-link">
                    Shop
                  </Link>
                  <Link href="/" className="nav-link ">
                    Blog
                  </Link>
                  <Link href="/" className="nav-link">
                    Contect
                  </Link>
                </Nav>
                <div className="d-flex ms-lg-4 flex-column flex-lg-row">
                  <Link href={"/profile"}>
                    <i
                      className="me-3 my-2 my-lg-0 fs-5 "
                      style={{ width: "fit-content", cursor: "pointer" }}
                    >
                      <IconButton aria-label="Favorite">
                        <FavoriteBorderIcon />
                      </IconButton>
                    </i>
                  </Link>
                  <Link href={"/cartShopping"}>
                    <i
                      className="me-3 my-1 my-lg-0 fs-5"
                      style={{ width: "fit-content", cursor: "pointer" }}
                    >
                      <IconButton aria-label="cart">
                        <Badge color="secondary">
                          <ShoppingCartIcon />
                        </Badge>
                      </IconButton>
                    </i>
                  </Link>
                </div>
                <div className="d-flex ms-lg-4 flex-column flex-lg-row">
                  <Link href="/login" className="me-4 my-3 my-lg-0 fs-5 ">
                    <Button variant="contained" className="bg-black btn-login ">
                      LogIn
                    </Button>
                  </Link>
                </div>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </div>
      )}
    </>
  );
};

export default NavBar;
