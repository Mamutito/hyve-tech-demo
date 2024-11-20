import { Button } from "../ui/Button";
import { ShoppingCartIcon } from "lucide-react";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/slices/cartSlice";
import { Product } from "../types";

export function ProductCard({ product }: { product: Product }) {
  const dispatch = useDispatch();

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="aspect-w-1 aspect-h-1">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-medium text-gray-900">{product.name}</h3>
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
  );
}
