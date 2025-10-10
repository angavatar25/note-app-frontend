import { dateFormatter } from "../helper/dateFormatter";
import useTheme from "../hooks/useTheme";

interface NoteCardProps {
  title: string;
  bodyText: string;
  label: string;
  noteColor: string;
  updatedTime: string;
  onClick: () => void;
}

const NoteCard: React.FC<NoteCardProps> = ({
  title,
  bodyText,
  noteColor,
  label,
  updatedTime,
  onClick,
}) => {

  const { isDarkMode } = useTheme();

  return (
    <div
      onClick={onClick}
      className={`rounded-xl p-6 ${isDarkMode ? 'bg-gray-600' : 'bg-[#F9F9F9]'} hover:shadow-md transition-shadow cursor-pointer max-w-2xl`}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <h2 className={`text-2xl font-semibold line-clamp-1 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{title}</h2>
        <div className={`text-sm px-2 py-1 rounded-full ${isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'}`}>
          {label}
        </div>
      </div>

      {/* Body Text */}
      <p
        className={`${isDarkMode ? 'text-white' : 'text-gray-600'} line-clamp-2 leading-relaxed`}>
        {bodyText}
      </p>
      <div className="flex justify-between mt-3">
        <p className="text-xs my-auto text-gray-400">
          {dateFormatter(updatedTime)}
        </p>
        <div
          className="h-3 w-3 rounded-full"
          style={{ backgroundColor: noteColor }}
        />
      </div>
    </div>
  );
};

export default NoteCard;