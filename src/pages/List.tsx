import { useState } from "react";
import NoteCard from "../components/NoteCard";
import NoteModal from "../components/NoteModal";
import { useAddNote, useDeleteNote, useGetNotes, useGetNotesById } from "../hooks/useNotes";

const List = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isNewNote, setIsNewNote] = useState(false);
  const [selectedNoteId, setSelectedNoteId] = useState<string>("");

  const { data: notes } = useGetNotes();
  const { data: selectedNote } = useGetNotesById(selectedNoteId ?? "");
  
  const addNote = useAddNote();
  const deleteNote = useDeleteNote();
  
  const handleSaveNote = (note: { title: string; bodyText: string; notecolor: string }) => {
    addNote.mutate(note);
  };
  
  const handleGetNoteById = (id: string) => {
    setSelectedNoteId(id);
    setIsOpen(true);
  };

  const handleDeleteNote = () => {
    if (selectedNoteId) {
      deleteNote.mutate(selectedNoteId);
      setIsOpen(false);
      setSelectedNoteId("");
    }
  };

  const handleNewModalNote = () => {
    setSelectedNoteId("");
    setIsOpen(true);
    setIsNewNote(true);
  };

  const handleCloseModalNote = () => {
    setIsOpen(false);
    setSelectedNoteId("");
    setIsNewNote(false);
  }

  return (
    <>
      <NoteModal
        isOpen={isOpen}
        onClose={handleCloseModalNote}
        onSave={handleSaveNote}
        data={selectedNote}
        onDelete={handleDeleteNote}
        isCreateNew={isNewNote}
      />
      <div className='parent flex flex-col h-screen'>
        <div className='container flex flex-col h-full'>
          <div className='flex justify-between border-b border-gray-200 p-6'>
            <p className='font-bold text-3xl my-auto'>Notes</p>
            <button
              onClick={handleNewModalNote}
              className='border border-gray-200 cursor-pointer rounded-xl h-fit p-2'
            >
              + Add new note
            </button>
          </div>
          <div className='p-6 no-scrollbar overflow-y-auto flex-1 space-y-3'>
            {notes && notes.length > 0 && notes.map((note) => (
              <NoteCard
                key={note.id}
                title={note.title}
                bodyText={note.bodyText}
                noteColor={note.notecolor}
                label={note.labelname}
                onClick={() => handleGetNoteById(note.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  )
};

export default List;
