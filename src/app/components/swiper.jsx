"use client";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "./swiper.modeul.css";

import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import Image from "next/image";
import { Triangle } from "react-loader-spinner";

const SwiperDE = ({ idproduct }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    setLoading(true);
    console.log(idproduct);

    try {
      const response = await fetch(
        `https://node-js-ecommerce-sand.vercel.app/api/products/${idproduct}`
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
      setProduct(data.data.Products);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{ backgroundColor: "#eee" }}
      className="p-2 Swiper-parent rounded"
    >
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
      ) : !product ? null : (
        <>
          <Swiper
            style={{
              "--swiper-navigation-color": "#fff",
              "--swiper-pagination-color": "#fff",
            }}
            spaceBetween={10}
            navigation={true}
            thumbs={{ swiper: thumbsSwiper }}
            modules={[FreeMode, Navigation, Thumbs]}
            className="mySwiper2 rounded "
          >
            {product.Imgs.map((image) => (
              <>
                <SwiperSlide>
                  <Image
                    src={image || "Not image Avalible Please Refresh page"}
                    alt="img"
                    width={800}
                    height={20}
                  />
                </SwiperSlide>
              </>
            ))}
          </Swiper>
          <Swiper
            onSwiper={setThumbsSwiper}
            spaceBetween={10}
            slidesPerView={product.Imgs.length}
            freeMode={true}
            watchSlidesProgress={true}
            modules={[FreeMode, Navigation, Thumbs]}
            className="mySwiper "
          >
            {product.Imgs.map((image) => (
              <>
                <SwiperSlide>
                  <Image
                    src={image || "Not image Avalible Please Refresh page"}
                    alt="img"
                    style={{ height: "13vh" }}
                    width={800}
                    height={20}
                  />
                </SwiperSlide>
              </>
            ))}
          </Swiper>
        </>
      )}
    </div>
  );
};

export default SwiperDE;
