import { useState } from "react";
import NoteCard from "../components/NoteCard";
import NoteModal from "../components/NoteModal";
import { useAddNote, useDeleteNote, useGetNotes, useGetNotesById, useUpdateNote } from "../hooks/useNotes";
import { Settings } from "lucide-react";
import useNavigation from "../hooks/useNavigate";
import useTheme from "../hooks/useTheme";

const List = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isNewNote, setIsNewNote] = useState(false);
  const [editNote, setEditNote] = useState(false);

  const [selectedNoteId, setSelectedNoteId] = useState<string>("");

  const { redirectTo } = useNavigation();

  const { isDarkMode } = useTheme();

  const { data: notes } = useGetNotes();
  const { data: selectedNote } = useGetNotesById(selectedNoteId ?? "");
  
  const addNote = useAddNote();
  const deleteNote = useDeleteNote();
  const handleEditNote = useUpdateNote();
  
  const handleSaveNote = (note: { title: string; bodyText: string; notecolor: string }) => {
    if (editNote && selectedNoteId) {
      const payload = {
        id: selectedNoteId,
        ...note
      };
    
      handleEditNote.mutate(payload);
      return;
    }
    addNote.mutate(note);
  };
  
  const handleGetNoteById = (id: string) => {
    setSelectedNoteId(id);
    setIsOpen(true);
    setEditNote(true);
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
    setEditNote(false);
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
      <div className={`parent flex flex-col h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-200'} items-center justify-center`}>
        <div className={`container flex flex-col h-full shadow-xl ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <div className='flex justify-between border-b border-gray-200 p-6'>
            <button
              className="cursor-pointer"
              onClick={() => redirectTo('/settings')}
            >
              <Settings
                size={32}
                className="my-auto"
                color={isDarkMode ? "white" : "black"}
              />
            </button>
            <button
              onClick={handleNewModalNote}
              className={`border ${isDarkMode ? 'text-white' : 'text-black'} border-gray-200 cursor-pointer rounded-xl h-fit p-2`}
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
