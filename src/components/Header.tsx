import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/Button";
import { UserIcon, ShoppingCartIcon } from "lucide-react";
import { RootState } from "../store";
import { useSelector } from "react-redux";
import ShoppingCart from "./ShoppingCart";
import { useState } from "react";

export function Header() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const navigate = useNavigate();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const cartItemsCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <>
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-bold text-gray-900">LumiHaus.</h1>
            <nav className="hidden md:flex space-x-8">
              <Link to="/" className="text-primary font-bold">
                Home
              </Link>
              <Link to="/" className="text-gray-900">
                Shop
              </Link>
              <Link to="/" className="text-gray-900">
                About
              </Link>
              <Link to="/" className="text-gray-900">
                Contact
              </Link>
            </nav>
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate("/login")}
              >
                <UserIcon className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="relative"
                onClick={() => setIsCartOpen(true)}
              >
                <ShoppingCartIcon className="h-5 w-5" />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#419DB4] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItemsCount}
                  </span>
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>
      <ShoppingCart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}
