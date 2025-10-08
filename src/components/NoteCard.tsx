interface NoteCardProps {
  title: string;
  bodyText: string;
  label: string;
  noteColor: string;
  onClick: () => void;
}

const NoteCard: React.FC<NoteCardProps> = ({
  title,
  bodyText,
  noteColor,
  label,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className="rounded-xl p-6 bg-[#F9F9F9] hover:shadow-md transition-shadow cursor-pointer max-w-2xl"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <h2 className="text-2xl font-semibold text-gray-800">{title}</h2>
        <div className="rounded-full px-3 my-auto text-gray-400 py-1 border-gray-400 border text-xs h-fit">
          {label}
        </div>
      </div>

      {/* Body Text */}
      <p className="text-gray-600 leading-relaxed">{bodyText}</p>
      <div className="flex justify-between mt-3">
        <p className="text-xs my-auto text-gray-400">12 August 2025</p>
        <div
          className="h-3 w-3 rounded-full"
          style={{ backgroundColor: noteColor }}
        />
      </div>
    </div>
  );
};

export default NoteCard;