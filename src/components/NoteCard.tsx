import { ChevronRight } from "lucide-react";

interface NoteCardProps {
  title: string;
  bodyText: string;
  noteColor: string;
  onClick: () => void;
}

const NoteCard: React.FC<NoteCardProps> = ({
  title,
  bodyText,
  noteColor,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className="rounded-xl p-6 hover:shadow-md transition-shadow cursor-pointer max-w-2xl"
      style={{ backgroundColor: noteColor || '#ffffff' }}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <h2 className="text-2xl font-semibold text-gray-800">{title}</h2>
        <button className="text-gray-400 hover:text-gray-600 transition-colors">
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Body Text */}
      <p className="text-gray-600 leading-relaxed">{bodyText}</p>
    </div>
  );
};

export default NoteCard;