import React from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => {
  return (
    <div className="relative group w-full max-w-xl">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground group-focus-within:text-primary transition-colors">
        <Search className="w-5 h-5" />
      </div>
      <input
        type="text"
        className="block w-full pl-10 pr-3 py-2.5 bg-secondary/50 border border-transparent rounded-lg leading-5 text-foreground placeholder-muted-foreground focus:outline-none focus:bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary transition duration-150 ease-in-out sm:text-sm"
        placeholder="Search skills (e.g., 'game', 'react', 'security')..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
        <span className="text-xs text-muted-foreground hidden sm:block">⌘K</span>
      </div>
    </div>
  );
};
