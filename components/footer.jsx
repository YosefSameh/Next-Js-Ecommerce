import Image from "next/image";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import XIcon from "@mui/icons-material/X";
import "./footer.modeul.css";
import Link from "next/link";
const Footer = () => {
  return (
    <div className="color" id="color">
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-6 col-lg-4 mt-5">
            <div className="">
              <h3>Souq On</h3>
            </div>
            <div className="mt-4">
              <p className="mb-2">Address: Nasr sitye</p>
              <a href="">Gmail: yosefsameh.368@gmail.com</a>
              <p className="mt-2">Phone: 01553044275</p>
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-4 mt-5">
            <div className="">
              <h3 className="fw-bold fs-5">Useful Links</h3>
            </div>
            <div className="mt-4 d-flex flex-column">
              <a className="" href="">
                About Us
              </a>
              <a className="mt-2" href="">
                About Our Shop
              </a>
              <a className="mt-2" href="">
                Secure Shopping
              </a>
              <a className="mt-2" href="">
                Delivery infomation
              </a>
              <a className="mt-2" href="">
                Privacy Policy
              </a>
              <a className="mt-2" href="">
                Our Sitemap
              </a>
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-4 mt-5">
            <div className="">
              <h3 className="fw-bold fs-5">Join Our Newsletter Now</h3>
            </div>
            <div className="mt-4 d-flex flex-column">
              <p>
                Get E-mail updates about our latest shop and special offers.
              </p>
              <form action="" className="mt-3">
                <input
                  className="w-50 p-2"
                  type="text"
                  placeholder="Enter your email"
                  checked
                />
                <input
                  className="bg-success p-2 fw-bold text-white"
                  type="button"
                  value="Subscribe"
                />
              </form>
              <div className="mt-4 icone">
                <i>
                  <FacebookIcon />
                </i>
                <i>
                  <InstagramIcon />
                </i>
                <i>
                  <LinkedInIcon />
                </i>
                <i>
                  <XIcon />
                </i>
              </div>
            </div>
          </div>
        </div>
        <hr className="opacity-25" />
        <div className="d-flex justify-content-between div-vesi">
          <p>
            Copyright ©2024 All rights reserved | This template is made with by{" "}
            <span className="text-success">Yosef sameh</span>
          </p>
          <div className="img-vesi">
            <Image
              src="https://yosefsameh.github.io/Store-Vegetables/img/visa.png"
              width={320}
              height={20}
              alt="visa"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
