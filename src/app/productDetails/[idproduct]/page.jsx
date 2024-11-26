import DetailsProduct from "@/app/components/detailsProduct";
import Footer from "@/app/components/footer";
import SwiperDE from "@/app/components/swiper";


export default function Details({ params }) {
    const { idproduct } = params;
    return (
      <>
      <div className="container  d-flex justify-content-between flex-lg-row flex-column my-5 ">
        <SwiperDE idproduct={idproduct}/>
        <DetailsProduct idproduct={idproduct}/>
        
      </div>
      <div className="mt-3">
        <Footer/>
      </div>
      </>
    );
  }