import React, { useState, useEffect } from 'react';
import { X, Share2, Trash2 } from 'lucide-react';

const NoteEditor = ({ noteToEdit, onSubmit, onCancel }) => {
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
    if (title.trim()) {
      onSubmit({ title, content });
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <header className="modal-header">
          <h2>{noteToEdit ? 'Edit Note' : 'New Note'}</h2>
          <div className="modal-actions">
            <button className="icon-button"><Share2 size={20} /></button>
            <button className="icon-button"><Trash2 size={20} /></button>
            <button className="icon-button" onClick={onCancel}><X size={24} /></button>
          </div>
        </header>
        <form onSubmit={handleSubmit} className="note-form">
          <input
            type="text"
            className="note-title-input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            required
          />
          <textarea
            className="note-content-textarea"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Start writing..."
            rows={10}
          />
          <div className="form-footer">
            <button type="button" className="cancel-button" onClick={onCancel}>Cancel</button>
            <button type="submit" className="save-button">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NoteEditor;
