import React, { useState, useEffect } from 'react';

const NoteEditor = ({ onSubmit, noteToEdit, onCancel }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (noteToEdit) {
      setTitle(noteToEdit.title);
      setContent(noteToEdit.content);
    }
  }, [noteToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() && content.trim()) {
      onSubmit({ title, content });
      if (!noteToEdit) {
        setTitle('');
        setContent('');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="note-editor">
      <h3>{noteToEdit ? 'Edit Note' : 'Create a New Note'}</h3>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Note Title"
        required
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="What's on your mind?"
        rows={4}
        required
      />
      <div className="editor-actions">
        <button type="submit">{noteToEdit ? 'Save Changes' : 'Add Note'}</button>
        {noteToEdit && <button type="button" onClick={onCancel}>Cancel</button>}
      </div>
    </form>
  );
};

export default NoteEditor;