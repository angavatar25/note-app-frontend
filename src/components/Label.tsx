// components/DropdownFilter.tsx
import { useState } from "react";

interface DropdownFilterProps {
  label: string;
  options: { id: string; labelname: string }[];
  selected: string;
  onSelect: (value: string) => void;
}

const DropdownFilter: React.FC<DropdownFilterProps> = ({
  label,
  options,
  selected,
  onSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (value: string) => {
    onSelect(value);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      {/* Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="border border-gray-200 rounded-full px-4 py-2 text-sm bg-white hover:bg-gray-50 flex items-center gap-1"
      >
        <span className="font-medium text-gray-700">{label}:</span>
        <span className="text-gray-600">{selected}</span>
        <svg
          className={`w-4 h-4 transition-transform ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute max-h-[200px] overflow-y-auto mt-2 w-40 bg-white border border-gray-200 rounded-xl shadow-lg z-10">
          {options.map((option) => (
            <button
              key={option.id}
              onClick={() => handleSelect(option.labelname)}
              className={`block w-full text-left px-4 py-2 text-sm rounded-lg hover:bg-gray-50 ${
                selected === option.labelname ? "bg-gray-100 font-medium" : ""
              }`}
            >
              {option.labelname}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropdownFilter;