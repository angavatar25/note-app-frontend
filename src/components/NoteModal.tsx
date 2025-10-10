import { X } from "lucide-react";
import React, { useEffect, useState } from "react";
import ButtonBase from "./ButtonBase";
import DropdownLabel from "./DropdownFilter";
import { useGetLabels } from "../hooks/useNotes";
import useTheme from "../hooks/useTheme";
import classNames from "classnames";

interface NoteModalProps {
  isOpen: boolean;
  isCreateNew: boolean;
  data: { title: string; bodyText: string; notecolor: string } | null;
  onClose: () => void;
  onDelete: ()  => void;
  onSave: (note: { title: string; bodyText: string; notecolor: string }) => void;
}

const colors = ["#F87171", "#FBBF24", "#34D399", "#60A5FA", "#A78BFA"];

const NoteModal: React.FC<NoteModalProps> = ({
  data,
  isOpen,
  isCreateNew,
  onClose,
  onSave,
  onDelete,
}) => {
  const [title, setTitle] = useState("");
  const [bodyText, setBodyText] = useState("");
  const [labelName, setLabelName] = useState("Work");
  const [notecolor, setNotecolor] = useState(colors[0]);

  const { isDarkMode } = useTheme();

  const { data: labels } = useGetLabels();

  const handleSubmit = () => {
    if (!title.trim() || !bodyText.trim()) return;

    const payload = {
      title,
      bodyText,
      notecolor,
      labelname: labelName,
    };

    onSave(payload);
    handleEmpty();
  };

  const handleEmpty = () => {
    setTitle("");
    setBodyText("");
    setNotecolor(colors[0]);
    onClose();
  }

  const handleDelete = () => {
    onDelete();
    handleEmpty();
  }

  useEffect(() => {
    if (data) {
      setTitle(data.title);
      setBodyText(data.bodyText);
      setNotecolor(data.notecolor);
    }
  }, [data]);

  return (
    <>    
      {isOpen ? (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className={`${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} rounded-lg p-6 w-full max-w-lg mx-4`}>
            <div className="flex justify-between">
              <h2 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                Create a New Note
              </h2>
              <X onClick={handleEmpty} className="cursor-pointer" />
            </div>

            {/* Title Input */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Title
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter note title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            {/* Body Input */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Body Text
              </label>
              <textarea
                className="w-full border border-gray-300 rounded-lg px-3 py-2 h-28 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Write your note..."
                value={bodyText}
                onChange={(e) => setBodyText(e.target.value)}
              />
            </div>

            {/* Color Picker */}
            <div className="mb-6 mt-4 flex justify-between">
              <div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Label
                  </label>
                  <DropdownLabel
                    label="Task"
                    options={labels || []}
                    selected={labelName}
                    onSelect={setLabelName}
                    isDarkMode={isDarkMode}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Pick Note Color
                </label>
                <div className="flex gap-3">
                  {colors.map((c) => (
                    <button
                      key={c}
                      className={classNames({
                        'w-6 h-6 rounded-full border-2 transition': true,
                        'border-gray-800 scale-110': notecolor === c && !isDarkMode,
                        'border-transparent hover:scale-105': notecolor !== c,
                        'border-gray-300 scale-110': notecolor === c && isDarkMode,
                      })}
                      style={{ backgroundColor: c }}
                      onClick={() => setNotecolor(c)}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-3">
              <ButtonBase
                onAction={!isCreateNew ? handleDelete : handleEmpty}
                label={!isCreateNew ? "Delete" : "Cancel"}
                type={!isCreateNew ? "secondary" : "transparent"}
              />
              <ButtonBase
                onAction={handleSubmit}
                label="Save"
                type="primary"
              />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default NoteModal;
