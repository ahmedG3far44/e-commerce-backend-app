import { useEffect } from "react";
import useCart from "../context/cart/CartContext";
import useAuth from "../context/auth/AuthContext";
import ItemCart from "../components/ItemCart";
import { useNavigate } from "react-router-dom";

function CheckoutPage() {
  const { token } = useAuth();
  const { cartItems, totalAmount, getUserCart, clearAllItemsFromCart } =
    useCart();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) return;
    getUserCart({ token });
  }, [token]);

  return (
    <div className="min-h-[calc(100vh-120px)] flex flex-col justify-start items-center gap-4 p-4">
      <div className="p-4 rounded-md bg-zinc-100 flex justify-between text-2xl font-bold items-center w-full">
        <h1 className="text-blue-500">All Cart Items</h1>
        <h1 className="text-2xl font-bold">
          Total:{" "}
          <span className="text-blue-500">{totalAmount.toFixed(2)} EGP</span>
        </h1>
      </div>
      {cartItems.length > 0 ? (
        cartItems.map(({ product, productId, quantity, updatedAt }) => {
          // if (!product || !productId || !quantity) return;
          const { title, description, category, image, price, stock } = product;
          return (
            <ItemCart
              key={productId}
              productId={productId}
              title={title}
              category={category}
              stock={stock}
              description={description}
              image={image}
              price={price}
              quantity={quantity}
              updatedAt={updatedAt}
              checkoutState={false}
            />
          );
        })
      ) : (
        <p className="text-sm text-zinc-500 mt-8">
          your cart is empty continue shopping and add new items!!
        </p>
      )}
      {cartItems.length > 0 && (
        <div className="p-4 rounded-md bg-zinc-100 flex justify-between items-center w-full">
          <div>
            <h1 className="text-2xl font-bold">
              Total:{" "}
              <span className="text-blue-500">
                {totalAmount.toFixed(2)} EGP
              </span>
            </h1>
          </div>
          <div>
            <button
              className="w-[150px] px-4 py-2 rounded-md cursor-pointer  border bg-blue-500 text-white hover:bg-blue-800 duration-150"
              onClick={() => navigate("/checkout")}
            >
              Confirm Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CheckoutPage;
