import { Checkbox } from "../ui/Checkbox";
import { Product } from "../types";
import { ProductRow } from "./ProductRow";

export function ProductTable({
  products,
  selectedProducts,
  setSelectedProducts,
  onEdit,
  onDelete,
}: {
  products: Product[];
  selectedProducts: number[];
  setSelectedProducts: (ids: number[]) => void;
  onEdit: (product: Product) => void;
  onDelete: (id: number) => void;
}) {
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedProducts(products.map((p) => p.id));
    } else {
      setSelectedProducts([]);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="grid grid-cols-[auto,100px,1fr,150px,200px] gap-4 p-4 bg-gray-100 rounded-t-lg">
        <Checkbox
          checked={selectedProducts.length === products.length}
          onCheckedChange={handleSelectAll}
        />
        <div></div>
        <div className="font-medium">NAME</div>
        <div className="font-medium">PRICE</div>
        <div></div>
      </div>

      <div className="divide-y">
        {products.map((product) => (
          <ProductRow
            key={product.id}
            product={product}
            isSelected={selectedProducts.includes(product.id)}
            onSelect={(checked) =>
              setSelectedProducts(
                checked
                  ? [...selectedProducts, product.id]
                  : selectedProducts.filter((id) => id !== product.id)
              )
            }
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
}
