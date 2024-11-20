import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { SearchIcon, ShoppingCartIcon, UserIcon } from "lucide-react";
import { AppDispatch, RootState } from "../store";
import { fetchProducts } from "../store/slices/productsSlice";
import { Button } from "../ui/Button";
import { Tabs, TabsList, TabsTrigger } from "../ui/Tabs";
import { Input } from "../ui/Input";
import { addToCart } from "../store/slices/cartSlice";

export default function ProductListing() {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector((state: RootState) => state.products.items);
  const status = useSelector((state: RootState) => state.products.status);
  const navigate = useNavigate();

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === "all" || product.category === activeTab;
    return matchesSearch && matchesTab;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-bold text-gray-900">LumiHaus.</h1>
            <nav className="hidden md:flex space-x-8">
              <Link to="/" className="text-gray-900">
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
              <Button variant="ghost" size="icon">
                <ShoppingCartIcon className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="bg-[#F5F7FA] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-[#419DB4] text-sm font-medium mb-2">
              WINTER COMFORT, TIMELESS DESIGN
            </p>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Discover Our Winter Furniture Collection
            </h2>
            <p className="text-gray-600 mb-6">
              Transform your space with pieces designed for warmth and style
              this season.
            </p>
            <Button className="bg-[#419DB4] hover:bg-[#3A8CA0]">BUY NOW</Button>
          </div>
        </div>
      </div>

      {/* Product Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <Tabs
            defaultValue="all"
            className="w-auto"
            onValueChange={(value) => setActiveTab(value)}
          >
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="new">New</TabsTrigger>
              <TabsTrigger value="trendy">Trendy</TabsTrigger>
              <TabsTrigger value="sale">Sale</TabsTrigger>
            </TabsList>
          </Tabs>
          <div className="relative w-72">
            <Input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
            <SearchIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-sm overflow-hidden"
            >
              <div className="aspect-w-1 aspect-h-1">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-medium text-gray-900">
                  {product.name}
                </h3>
                <div className="flex justify-between items-center mt-2">
                  <p className="text-gray-900">{product.price.toFixed(2)}€</p>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => dispatch(addToCart(product))}
                  >
                    <ShoppingCartIcon className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
