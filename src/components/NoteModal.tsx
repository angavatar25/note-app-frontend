import React, { useState } from "react";

interface NoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (note: { title: string; bodyText: string; notecolor: string }) => void;
}

const colors = ["#F87171", "#FBBF24", "#34D399", "#60A5FA", "#A78BFA"];

const NoteModal: React.FC<NoteModalProps> = ({ isOpen, onClose, onSave }) => {
  const [title, setTitle] = useState("");
  const [bodyText, setBodyText] = useState("");
  const [notecolor, setNotecolor] = useState(colors[0]);

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (!title.trim() || !bodyText.trim()) return;
    onSave({ title, bodyText, notecolor });
    setTitle("");
    setBodyText("");
    setNotecolor(colors[0]);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Create a New Note
        </h2>

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
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-600 mb-2">
            Pick Note Color
          </label>
          <div className="flex gap-3">
            {colors.map((c) => (
              <button
                key={c}
                className={`w-8 h-8 rounded-full border-2 transition ${
                  notecolor === c
                    ? "border-gray-800 scale-110"
                    : "border-transparent hover:scale-105"
                }`}
                style={{ backgroundColor: c }}
                onClick={() => setNotecolor(c)}
              />
            ))}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoteModal;
