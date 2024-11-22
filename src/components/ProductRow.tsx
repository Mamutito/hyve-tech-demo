import { Checkbox } from "../ui/Checkbox";
import { Button } from "../ui/Button";
import { Pencil, Trash2 } from "lucide-react";
import { Product } from "../types";

export function ProductRow({
  product,
  isSelected,
  onSelect,
  onEdit,
  onDelete,
}: {
  product: Product;
  isSelected: boolean;
  onSelect: (checked: boolean) => void;
  onEdit: (product: Product) => void;
  onDelete: (id: number) => void;
}) {
  return (
    <div className="grid grid-cols-[auto,100px,1fr,150px,200px] gap-4 p-4 items-center">
      <Checkbox checked={isSelected} onCheckedChange={onSelect} />
      <img
        src={product.image}
        alt={product.name}
        className="w-16 h-16 object-cover rounded"
      />
      <div className="font-medium">{product.name}</div>
      <div>{product.price.toFixed(2)}€</div>
      <div className="flex gap-4 justify-end">
        <Button
          variant="ghost"
          size="sm"
          className="text-[#419DB4] hover:text-white"
          onClick={() => onEdit(product)}
        >
          <Pencil className="w-4 h-4 mr-2" />
          Edit
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="text-red-500 hover:text-red-600"
          onClick={() => onDelete(product.id)}
        >
          <Trash2 className="w-4 h-4 mr-2" />
          Delete
        </Button>
      </div>
    </div>
  );
}
