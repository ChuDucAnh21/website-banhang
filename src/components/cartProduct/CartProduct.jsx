import { Await, generatePath, Link } from "react-router-dom";
import { MdDeleteOutline } from "react-icons/md";
import { useDispatch,useSelector } from "react-redux";
import { SelectGuestCart, SelectUser, SelectUserCart } from "../../redux/selector";
import guestCartSlice from "../../redux/guestCartSlice";
import { useToast } from "../../components/toastMessage/ToastMessage";
import { removeCartUser } from "../../redux/userCartSlice";

const CartProduct = ({setShowCart}) => {
  const {showToast} = useToast()
  const dataUser = useSelector(SelectUser)
  const dataUserCart = useSelector(SelectUserCart)
  const listProductCart =dataUser.role === "user" || dataUser.role === "admin" ? useSelector(SelectUserCart) : useSelector(SelectGuestCart)
  const dispatch = useDispatch()
    

  const handelRemoveProduct = async(e,data)=>{
     setShowCart(false)
     e.stopPropagation()
     e.preventDefault()
    try {
        if(dataUser.role){    // Xóa sản phẩm khi là user || admin
         await dispatch(removeCartUser({
            "value" : {
                    id:data.id, 
                    color:data.color, 
                    size:data.size
            },
            "token" : dataUser.accessToken
          })).unwrap()  // unwrap để bắt lỗi trong thunk
         if(dataUserCart.status ==="loading"){
            showToast("Đang xóa sản phẩm")
          }
        }
        else{   //Xóa sản phẩm khi là khách
          dispatch(guestCartSlice.actions.removeProduct(
                {
                    id:data.id, 
                    color:data.color, 
                    size:data.size
                }
            ))
        }
         
          showToast("Xóa sản phẩm thành công")
    } catch (error) {
        showToast("Xóa sản phẩm thất bại","error")
    }
    
  }
  return (
    <div className="cart-shopping shadow-2xl border-2 bg-white  min-w-[300px] ms:min-w-[400px] md:min-w-[500px]  min-h-[200px] max-h-[520px] rounded-md absolute z-30 top-[100%] right-[-20px]">
      <div className="text-center p-3 uppercase font-medium  ">Giỏ hàng</div>
      <p className="pb-2 pl-3 border-b border-solid border-[#ccc] text-blue-600">
        Bạn đang có {listProductCart?.products?.length} sản phẩm{" "}
      </p>
      {/* Danh sachs san pham trong gio hang */}
      {
        listProductCart.products.length === 0 ? <img src="/emptyCart.webp" className="w-[200px] m-auto"/> : ""
      }
      <ul className="list_p_cart-shopping mb-[100px] w-full overflow-y-auto max-h-[400px]">
        {
            listProductCart?.products.map((product,index)=>(
                <li onClick={() => setShowCart(false)} key={product.id+"-"+index} className="bg-blue-50 mt-1 min-h-[70px] pl-1 pr-1 border border-solid border-[#ddd] ">
                    <Link
                        to={generatePath("/detailProduct/:slug", {
                             slug: product.slug || "",
                        })}
                        // onClick={() => setShowCart(!showCart)}
                        className="flex items-center"
                    >
                        <img src={product.img} className="w-[60px] h-[60px] object-cover" alt="" />
                        <div className="flex items-center justify-between w-full text-[13px] pl-1 pr-1">
                        <div>
                                <p className="text-[15px] font-medium">{product.name}</p>
                                <div className="flex">
                                    <p> size : <span className="font-medium">{product.size}</span> </p>
                                    <p className="ml-4"> Màu : <span className="font-medium">{product.color}</span> </p>
                                </div>
                                <div className="flex items-center">
                                    <p> Giá : <span className="text-[15px] font-medium">{product.price}đ</span></p>
                                    <p className="ml-4">x{product.quantity}</p>
                                </div>
                        </div>
                        <div
                            onClick={(e) =>  handelRemoveProduct(e,{id:product.id, color:product.color, size:product.size})}
                            className="p-2 hover:bg-red-300"
                        >
                            <MdDeleteOutline className="text-[22px] " />
                        </div>
                        </div>
                    </Link>
                </li>
            ))
        }
        
      </ul>
      <div onClick={() => setShowCart(false)} className="absolute bottom-0 w-full   border-t border-solid border-[#ccc] bg-white">
        <Link to={"/detailCart"} className="text-center block p-2 bg-blue-50 font-medium ">
          Xem giỏ hàng
        </Link>
      </div>
    </div>
  );
};
export default CartProduct;
