import { useState } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ManualInputProps {
  onSearch: (code: string) => void;
  isLoading: boolean;
}

export function ManualInput({ onSearch, isLoading }: ManualInputProps) {
  const [code, setCode] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.trim()) {
      onSearch(code.trim());
      setCode("");
    }
  };

  return (
    <div className="bg-card border border-border rounded-xl p-4">
      <h3 className="text-sm font-semibold mb-3">Input Manual</h3>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            type="text" 
            placeholder="Ketik Order ID (Cth: ORD-123)" 
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="pl-9 bg-background uppercase"
          />
        </div>
        <Button 
          type="submit" 
          disabled={!code.trim() || isLoading}
          className="bg-moket-orange hover:bg-moket-orange-dark text-white"
        >
          {isLoading ? "Cek..." : "Check-in"}
        </Button>
      </form>
    </div>
  );
}
