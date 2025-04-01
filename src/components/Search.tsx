
import { Search as SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";

interface SearchProps {
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  inputClassName?: string;
  onSubmit?: (e: React.FormEvent) => void;
}

export function Search({ 
  placeholder = "Search...", 
  value, 
  onChange,
  className,
  inputClassName,
  onSubmit
}: SearchProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) onSubmit(e);
  };

  return (
    <form className={`relative w-full ${className}`} onSubmit={handleSubmit}>
      <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
      <Input
        type="search"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`pl-10 ${inputClassName}`}
      />
    </form>
  );
}
