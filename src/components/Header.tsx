import { Link } from "react-router-dom";
import { Button } from "../ui/Button";
import { UserIcon, ShoppingCartIcon, LogOut } from "lucide-react";
import { AppDispatch, RootState } from "../store";
import { useDispatch, useSelector } from "react-redux";
import ShoppingCart from "./ShoppingCart";
import { useState } from "react";
import LoginModal from "./LoginModal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/DropdownMenu";
import { logoutUser } from "../store/slices/authSlice";

export function Header() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const { user, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );
  const cartItemsCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );
  const handleLogout = () => {
    dispatch(logoutUser());
  };

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
              {isAuthenticated ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="relative group"
                    >
                      <UserIcon className="h-5 w-5 text-[#419DB4] group-hover:text-white" />
                      <span className="sr-only">User menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem disabled>
                      Signed in as {user?.name}
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link to="/dashboard">Dashboard</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleLogout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button
                  variant="ghost"
                  size="icon"
                  data-testid="user-icon-button"
                  onClick={() => setIsLoginOpen(true)}
                >
                  <UserIcon className="h-5 w-5" />
                </Button>
              )}
              <Button
                variant="ghost"
                size="icon"
                className="relative"
                data-testid="cart-icon-button"
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
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </>
  );
}
