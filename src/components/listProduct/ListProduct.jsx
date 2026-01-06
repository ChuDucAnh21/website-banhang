import { memo, useEffect, useState } from "react";

import Product from "../itemProduct/Product.jsx";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import {
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from "react-icons/md";
import { BiFilterAlt } from "react-icons/bi";

const ListProduct = (prop) => {
  const [arrange, setArrange] = useState("1");
  useEffect(() => {
    const dt = {
      ...prop.dataFilter,
      arrange: arrange,
    };
    prop.handelFilterChange(dt);
  }, [arrange]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const totalPages = Math.ceil(prop.data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = prop.data?.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="min-h-[700px]">
      <div className="w-ful h-[46px] p-8  flex items-center justify-between ">
        <div className="flex items-center">
          <p className=" mr-2 hidden md:block">Bạn đang xem:</p>
          <h2 className="hidden md:block font-medium text-blue-500 w-[73px]">
            {prop.name}
          </h2>
        </div>

        {/* lọc tăng/giảm theo giá */}
        <div className="w-[30%] lg:w-[20%] flex gap-2 items-center justify-end">
          <div
            onClick={() => prop.setShowFilter(!prop.showFilter)}
            className=" md:hidden flex items-center cursor-pointer"
          >
            <p>Lọc</p>
            <BiFilterAlt className="text-[30px] " />
          </div>
          <select
            value={arrange}
            name=""
            id=""
            onChange={(e) => setArrange(e.target.value)}
            className="hidden md:block  border w-full border-black rounded-md pt-1 pb-1 pl-7 pr-7"
          >
            <option value="1">Phổ biến</option>
            <option value="2">Giá giảm dần</option>
            <option value="3">Giá tăng dần</option>
          </select>
        </div>
      </div>
      {prop.loading ? (
        <div className=" mt-10 w-full">
          <AiOutlineLoading3Quarters className="animate-spin text-center m-auto text-[28px] text-blue-500" />
        </div>
      ) : (
        <div className="grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
          {currentItems?.map((product) => (
            <div key={product._id} className=" w-[100%]">
              <Product
                id={product._id}
                slug={product.slug}
                name={product.title}
                price={product.price}
                img={product?.options[0]?.images[0]}
                oldPrice={product?.oldPrice}
              />
            </div>
          ))}
        </div>
      )}
      <div className="flex justify-end mt-3 ">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => p - 1)}
          className="bg-[#ddd] w-[30px] border h-[30px] flex items-center justify-center"
        >
          <MdKeyboardDoubleArrowLeft />
        </button>
        <p className="border">
          Trang {currentPage}/{totalPages}
        </p>
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((p) => p + 1)}
          className="bg-[#ddd] w-[30px] border h-[30px] flex items-center justify-center"
        >
          <MdKeyboardDoubleArrowRight />
        </button>
      </div>
    </div>
  );
};
export default memo(ListProduct);
