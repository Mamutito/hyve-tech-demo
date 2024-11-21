import { X, Minus, Plus, Trash2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../ui/Button";
import { RootState } from "../store";
import {
  removeFromCart,
  updateQuantity,
  clearCart,
} from "../store/slices/cartSlice";

interface ShoppingCartProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ShoppingCart({ isOpen, onClose }: ShoppingCartProps) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  if (!isOpen) return null;

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="fixed inset-0 bg-black/50 flex items-start justify-end">
      <div className="bg-white w-full max-w-md h-screen flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold">Shopping Cart</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-auto p-4 space-y-4">
          {cartItems.map((item) => (
            <div key={item.id} className="flex items-center gap-4">
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 object-cover rounded-md"
              />
              <div className="flex-1">
                <h3 className="font-medium">{item.name}</h3>
                <p className="text-lg font-semibold">
                  {item.price.toFixed(2)}€
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => {
                      if (item.quantity > 1) {
                        dispatch(
                          updateQuantity({
                            id: item.id,
                            quantity: item.quantity - 1,
                          })
                        );
                      }
                    }}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-12 text-center">{item.quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => {
                      dispatch(
                        updateQuantity({
                          id: item.id,
                          quantity: item.quantity + 1,
                        })
                      );
                    }}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="text-red-500 hover:text-red-700"
                onClick={() => dispatch(removeFromCart(item.id))}
              >
                <Trash2 className="h-5 w-5" />
              </Button>
            </div>
          ))}
        </div>

        {/* Total and Actions */}
        <div className="border-t p-4 space-y-4">
          <div className="flex justify-between items-center text-lg font-semibold">
            <span>Total</span>
            <span>{total.toFixed(2)}€</span>
          </div>
          <Button
            className="w-full bg-[#419DB4] hover:bg-[#419DB4]/90"
            onClick={() => {
              // Handle checkout
              console.log("Proceeding to checkout...");
            }}
          >
            CHECKOUT
          </Button>
          <Button
            variant="outline"
            className="w-full"
            onClick={() => dispatch(clearCart())}
          >
            EMPTY CART
          </Button>
        </div>
      </div>
    </div>
  );
}
