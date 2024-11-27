"use client";

import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "./slider.css";
import { Pagination } from "swiper/modules";
import { Triangle } from "react-loader-spinner";
import Image from "next/image";

const Slider = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch products from API
  const fetchProducts = async () => {
    try {
      const response = await fetch(
        "https://node-js-ecommerce-sand.vercel.app/api/products?limit=8"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = await response.json();
      setProducts(data.data.Products || []);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="container rounded shadow  Slider">
      {loading ? (
        <div className="d-flex justify-content-center">
          <Triangle
            visible={true}
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="triangle-loading"
          />
        </div>
      ) : error ? (
        <div className="text-danger text-center">{error}</div>
      ) : products.length > 0 ? (
        <Swiper
          slidesPerView={3}
          spaceBetween={30}
          pagination={{
            clickable: true,
          }}
          breakpoints={{
            0: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            640: {
              slidesPerView: 1,
              spaceBetween: 10,
            },

            768: {
              slidesPerView: 2,
              spaceBetween: 20,
            },

            1024: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
          }}
          modules={[Pagination]}
          className="mySwiper"
        >
          {products.map((product, index) => (
            <SwiperSlide key={index} className="d-flex flex-column">
              <Image
                src={product.Imgs?.[0]}
                alt="Not Found "
                width={319.5}
                height={224}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <div className="text-center">لا توجد منتجات متاحة</div>
      )}
    </div>
  );
};

export default Slider;