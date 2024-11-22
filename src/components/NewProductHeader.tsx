import { Button } from "../ui/Button";
import { Plus } from "lucide-react";

export function NewProductHeader({ onCreateNew }: { onCreateNew: () => void }) {
  return (
    <div className="flex justify-between items-center mb-8">
      <h1 className="text-2xl font-bold">Products</h1>
      <Button
        onClick={onCreateNew}
        className="bg-[#419DB4] hover:bg-[#419DB4]/90"
      >
        <Plus className="w-4 h-4 mr-2" />
        CREATE NEW
      </Button>
    </div>
  );
}
