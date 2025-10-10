// components/DropdownFilter.tsx
import classNames from "classnames";
import { useState } from "react";

interface DropdownFilterProps {
  label: string;
  options: { id: string; labelname: string }[];
  selected: string;
  isDarkMode: boolean;
  onSelect: (value: string) => void;
}

const DropdownFilter: React.FC<DropdownFilterProps> = ({
  label,
  options,
  selected,
  onSelect,
  isDarkMode
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (value: string) => {
    onSelect(value);
    setIsOpen(false);
  };

  return (
    <div className="relative dropdown-filter">
      {/* Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`border border-gray-200 rounded-full px-4 py-2 text-sm ${isDarkMode ? 'bg-gray-600' : 'bg-white'} hover:${isDarkMode ? 'bg-gray-500' : 'bg-gray-50'} flex items-center gap-1`}
      >
        <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-800' }`}>{label}:</span>
        <span className={`${isDarkMode ? 'text-white' : 'text-gray-600' }`}>{selected}</span>
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
      {/* absolute max-h-[200px] overflow-y-auto mt-2 w-40 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} border border-gray-200 rounded-xl shadow-lg z-10 */}
      {isOpen && (
        <div className={classNames({
          'absolute max-h-[200px] overflow-y-auto mt-2 w-40  rounded-xl shadow-lg z-10': true,
          'bg-gray-800 text-white': isDarkMode,
          'bg-white text-gray-800 border border-gray-200': !isDarkMode
        })}>
          {options.map((option) => (
            <button
              key={option.id}
              onClick={() => handleSelect(option.labelname)}
              className={classNames({
                'block w-full text-left px-4 py-2 text-sm rounded-lg': true,
                'bg-gray-700 font-medium': selected === option.labelname && isDarkMode,
                'bg-gray-100 font-medium': selected === option.labelname && !isDarkMode,
                'hover:bg-gray-600': isDarkMode,
                'hover:bg-gray-50': !isDarkMode
              })}
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