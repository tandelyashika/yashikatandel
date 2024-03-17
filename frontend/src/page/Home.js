import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import HomeCard from "../component/HomeCard";
import CartFeature from "../component/CartFeature";
import { GrPrevious } from "react-icons/gr";
import { GrNext } from "react-icons/gr";
import FilterProduct from "../component/FilterProduct";
import AllProduct from "../component/AllProduct";

const Home = () => {
  const productData = useSelector((state) => state.product.productList);

  const homeProductCartList = productData.slice(5, 10);
  const homeProductCartListPackedSweet = productData.filter(
    (el) => el.category === "packed sweets",
    []
  );


  const loadingArray = new Array(4).fill(null);
  const loadingArrayFeature = new Array(10).fill(null);

  const slideProductRef = useRef();
  const nextProduct = () => {
    slideProductRef.current.scrollLeft += 200;
  };
  const preveProduct = () => {
    slideProductRef.current.scrollLeft -= 200;
  };

  return (
    <div className="p-2 md:p-4">
      <div className="md:flex gap-4 py-2">
        <div className="md:w-1/2 ">
          <div className="flex gap-3 bg-slate-300 w-40 px-2 items-center rounded-full">
            <p className="text-sm font-medium text-slate-900">
              The Mithai Zone
            </p>
            <img
              src="https://cdn-icons-png.flaticon.com/512/4781/4781211.png"
              className="h-7"
            />
          </div>
          <h2 className="text-4xl md:text-7xl font-bold py-5">
            THE BEST INDIAN
            <span className="text-pink-600 "> DELICIOUS SWEETS</span>
          </h2>
          <p className="py-4 text-xl">
            Indian sweets 'Mithai'. They rely heavily on sugar, milk and
            condensed milk and frying, however the bases of the sweets vary by
            region. They more intense and sweeter than western sweets and
            desserts and quite a bit heavier since they're made mainly in Ghee
            which is clarified butter.
          </p>
          <button className="font-bold bg-red-500 text-slate-200 px-4 py-2 rounded-md">
            Order Now
          </button>
        </div>

        <div className="md:w-1/2 flex flex-wrap gap-5 p-4 justify-center">
          {homeProductCartList[0]
            ? homeProductCartList.map((el) => {
                return (
                  <HomeCard
                    key={el._id}
                    id={el._id}
                    image={el.image}
                    name={el.name}
                    price={el.price}
                    category={el.category}
                  />
                );
              })
            : loadingArray.map((el, index) => {
                return <HomeCard key={index+"loading"} loading={"Loading..."} />;
              })}
        </div>
      </div>

      <div className="">
        <div className="flex w-full items-center">
          <h2 className="font-bold text-2xl  text-slate-800 mb-4">
            {" "}
            Packed Sweets{" "}
          </h2>
          <div className="ml-auto flex gap-4">
            <button
              onClick={preveProduct}
              className="bg-slate-300 hover:bg-slate-400 text-lg p-1 rounded"
            >
              <GrPrevious />
            </button>
            <button
              onClick={nextProduct}
              className="bg-slate-300 hover:bg-slate-400 text-lg p-1 rounded"
            >
              <GrNext />
            </button>
          </div>
        </div>
        <div
          className="flex gap-5 overflow-scroll scrollbar-none scroll-smooth transition-all"
          ref={slideProductRef}
        >
          {homeProductCartListPackedSweet[0]
            ? homeProductCartListPackedSweet.map((el) => {
                return (
                  <CartFeature
                    key={el._id+"packed sweets"}
                    id={el._id}
                    name={el.name}
                    category={el.category}
                    price={el.price}
                    image={el.image}
                  />
                );
              })
            : loadingArrayFeature.map((el,index) => (
                <CartFeature loading="Loading..." key={index+"cartLoading"} />
              ))}
        </div>
      </div>

      <AllProduct heading={"Your Product"} />
    </div>
  );
};

export default Home;
