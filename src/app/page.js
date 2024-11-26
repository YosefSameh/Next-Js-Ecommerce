import Discount from "./components/disCount";
import Slider from "./components/slider";
import Products from "./components/porducts";
import Footer from "./components/footer";
import Sale from "./components/sale";
import Blog from "./components/blog";


export default function Home() {
  return (
    
    <div>
      
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
    </div>
  );
}
