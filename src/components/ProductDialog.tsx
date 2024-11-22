import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/Dialog";
import { Input } from "../ui/Input";
import { Label } from "../ui/Label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/Select";
import { Button } from "../ui/Button";
import { Product } from "../types";
import { useEffect, useState } from "react";

export function ProductDialog({
  isOpen,
  product,
  onClose,
  onSubmit,
}: {
  isOpen: boolean;
  product: Product | null;
  onClose: () => void;
  onSubmit: (product: Product) => void;
}) {
  const [localProduct, setLocalProduct] = useState<Product | null>(product);

  useEffect(() => {
    setLocalProduct(product);
  }, [product]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (localProduct) onSubmit(localProduct);
  };

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {localProduct?.id ? "Edit Product" : "Create New Product"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={localProduct?.name || ""}
              onChange={(e) =>
                setLocalProduct((prev) => ({
                  ...prev!,
                  name: e.target.value,
                }))
              }
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="price">Price</Label>
            <Input
              id="price"
              type="number"
              step="0.01"
              value={localProduct?.price || ""}
              onChange={(e) =>
                setLocalProduct((prev) => ({
                  ...prev!,
                  price: parseFloat(e.target.value),
                }))
              }
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select
              value={localProduct?.category || ""}
              onValueChange={(value) =>
                setLocalProduct((prev) => ({
                  ...prev!,
                  category: value,
                }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="trendy">Trendy</SelectItem>
                <SelectItem value="sale">Sale</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="image">Image URL</Label>
            <Input
              id="image"
              value={localProduct?.image || ""}
              onChange={(e) =>
                setLocalProduct((prev) => ({
                  ...prev!,
                  image: e.target.value,
                }))
              }
              required
            />
          </div>
          <div className="flex justify-end gap-4 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-[#419DB4] hover:bg-[#419DB4]/90"
            >
              {localProduct?.id !== 0 ? "Save Changes" : "Create Product"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
