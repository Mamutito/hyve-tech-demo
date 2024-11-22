import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  updateProduct,
  deleteProduct,
  addProduct,
} from "../store/slices/productsSlice";
import { AppDispatch, RootState } from "../store";
import { NewProductHeader } from "../components/NewProductHeader";
import { ProductTable } from "../components/ProductList";
import { ProductDialog } from "../components/ProductDialog";
import { Product } from "../types";

export default function ProductManagement() {
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);

  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector((state: RootState) => state.products.items);
  const status = useSelector((state: RootState) => state.products.status);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  const handleEdit = (product: Product) => {
    setCurrentProduct(product);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      dispatch(deleteProduct(id));
    }
  };

  const handleSubmit = (product: Product) => {
    if (product.id) {
      dispatch(updateProduct(product));
    } else {
      dispatch(addProduct(product));
    }
    setIsDialogOpen(false);
    setCurrentProduct(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <NewProductHeader onCreateNew={() => setIsDialogOpen(true)} />
        <ProductTable
          products={products}
          selectedProducts={selectedProducts}
          setSelectedProducts={setSelectedProducts}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
        <ProductDialog
          isOpen={isDialogOpen}
          product={currentProduct}
          onClose={() => setIsDialogOpen(false)}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}
