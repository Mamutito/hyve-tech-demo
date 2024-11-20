import { Tabs, TabsList, TabsTrigger } from "../ui/Tabs";
import { Input } from "../ui/Input";
import { SearchIcon } from "lucide-react";
import { ProductCard } from "./ProductCard";
import { Product } from "../types";

interface ProductSectionProps {
  products: Product[];
  activeTab: string;
  setActiveTab: (value: string) => void;
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  filteredProducts: Product[];
}

export function ProductSection({
  setActiveTab,
  searchQuery,
  setSearchQuery,
  filteredProducts,
}: ProductSectionProps) {
  return (
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
