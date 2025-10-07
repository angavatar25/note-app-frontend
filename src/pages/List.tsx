import { useState } from "react";
import NoteCard from "../components/NoteCard";
import NoteModal from "../components/NoteModal";
import { useAddNote, useGetNotes } from "../hooks/useNotes";

const List = () => {
  const { data: notes } = useGetNotes();
  const addNote = useAddNote();

  const [isOpen, setIsOpen] = useState(false);

  const handleSaveNote = (note: { title: string; bodyText: string; notecolor: string }) => {
    addNote.mutate(note);
  };

  return (
    <>
      <NoteModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSave={handleSaveNote}
      />
      <div className='parent'>
        <div className='container'>
          <div className='flex justify-between border-b border-gray-200 p-6'>
            <p className='font-bold text-3xl my-auto'>Notes</p>
            <button
              onClick={() => setIsOpen(true)}
              className='border border-gray-200 cursor-pointer rounded-xl h-fit p-2'
            >
              + Add new note
            </button>
          </div>
          <div className='p-6 grid gap-2'>
            {notes && notes.length > 0 && notes.map((note) => (
              <NoteCard
                key={note.id}
                title={note.title}
                bodyText={note.bodyText}
                noteColor={note.notecolor}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  )
};

export default List;
