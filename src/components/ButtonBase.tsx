interface TButton {
  onAction: () => void;
  label: string;
  type: "primary" | "secondary" | "transparent";
}

const ButtonBase = ({ onAction, label, type }: TButton) => {
  const generateBgColor = () => {
    const bgColorMap: Record<string, string> = {
      primary: "bg-blue-500 hover:bg-blue-700 text-white",
      secondary: "bg-red-500 hover:bg-red-700 text-white",
      transparent: "bg-transparent hover:bg-gray-200 text-black",
    };
    
    return bgColorMap[type] || bgColorMap["primary"];  
  };

  return (
    <button
      onClick={onAction}
      className={`${generateBgColor()} px-4 py-2 rounded-lg`}
    >
      {label}
    </button>
  )
}

export default ButtonBase;