"use client"
import Discount from "./components/disCount";
import Slider from "./components/slider";
import Products from "./components/porducts";
import Footer from "./components/footer";
import Sale from "./components/sale";
import Blog from "./components/blog";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


export default function Home() {

  const [role, setRole] = useState(null);
  const router = useRouter();
  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    setRole(storedRole);
  }, [role]);

  return (

    
    <div>
      {role == "Manger" ? router.push("/dashport") :
      
      
     <>
      <div className="d-flex container">
        <Discount />
      </div>
      <div className="d-flex justify-content-center">
        <Slider />
      </div>
      <Products />
      <Sale />
      <Blog />
      <Footer />
     </>
    }
    </div>
  );
}
