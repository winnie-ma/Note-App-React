import React, { useEffect, useState } from "react";
import "../css/Note.css";
import CreateNote from "./CreateNote";
import Note from "./Note";
import { v4 as uuid } from "uuid";
type NotesType = {
  id: any;
  text: string;
};
const Notes = () => {
  const [notes, setNotes] = useState<NotesType[]>([]);
  const [loading, setLoading] = useState(true);
  const [inputText, setInputText] = useState("");
  const textHandler = (e) => {
    setInputText(e.target.value);
  };
  const saveHandler = () => {
    setNotes((prevState) => [
      ...prevState,
      {
        id: uuid(),
        text: inputText,
      },
    ]);
    setInputText("");
  };
  const deleteNote = (id) => {
    const filteredNotes = notes.filter((note) => note.id !== id);
    setNotes(filteredNotes);
  };
  useEffect(() => {
    const localNotes = localStorage.getItem("Notes");
    if (localNotes) {
      const data = JSON.parse(localNotes);
      setNotes(data);
    }

    setLoading(false);
  }, []);
  useEffect(() => {
    if (!loading) {
      localStorage.setItem("Notes", JSON.stringify(notes));
    }
  }, [notes, loading]);

  if (loading) {
    return <div>loading</div>;
  }
  return (
    <div className="notes">
      {notes.length &&
        notes.map((note) => (
          <Note key={note.id} note={note} deleteNote={deleteNote} />
        ))}

      <CreateNote
        textHandler={textHandler}
        saveHandler={saveHandler}
        inputText={inputText}
      />
    </div>
  );
};

export default Notes;
