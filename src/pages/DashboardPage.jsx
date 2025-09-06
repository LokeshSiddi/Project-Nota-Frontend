import React, { useState, useEffect } from 'react';
import {
  getAllNotes,
  createNote,
  updateNote,
  deleteNote,
  shareNote,
} from '../services/noteService';
import NoteEditor from '../components/NoteEditor';
import NoteList from '../components/NoteList';
import { Plus } from 'lucide-react';

const DashboardPage = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingNote, setEditingNote] = useState(null);

  const fetchNotes = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await getAllNotes();
      setNotes(response.data);
    } catch (err) {
      setError('Failed to fetch notes. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleOpenEditor = (note = null) => {
    setEditingNote(note);
    setIsEditorOpen(true);
  };

  const handleCloseEditor = () => {
    setIsEditorOpen(false);
    setEditingNote(null);
  };

  const handleSaveNote = async (noteData) => {
    try {
      if (editingNote) {
        await updateNote(editingNote.id, noteData);
      } else {
        await createNote(noteData);
      }
      handleCloseEditor();
      fetchNotes();
    } catch (err) {
      alert(`Failed to save note: ${err.message}`);
    }
  };

  const handleDeleteNote = async (id) => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      try {
        await deleteNote(id);
        fetchNotes();
      } catch (err) {
        alert('Failed to delete note.');
      }
    }
  };

  const handleShareNote = async (id) => {
    try {
      const response = await shareNote(id);
      const link = response.data.shareableLink;
      if (link) {
        const frontendLink = `${window.location.origin}/note/public/${link.split('/').pop()}`;
        prompt('Note is now shared! Copy this link:', frontendLink);
      } else {
        alert(response.data.message || 'Note sharing status updated.');
      }
      fetchNotes();
    } catch (err) {
      alert('Failed to share note.');
    }
  };

  if (loading) return <div className="loading-state">Loading your notes...</div>;
  if (error) return <div className="error-state">{error}</div>;

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <input type="text" placeholder="Search Notes..." className="search-input" />
        <div className="tabs">
          <button className="tab-button active">Notes</button>
          <button className="tab-button">Lists</button>
          <button className="tab-button">Recording</button>
        </div>
      </header>

      <NoteList
        notes={notes}
        onEdit={handleOpenEditor}
        onDelete={handleDeleteNote}
        onShare={handleShareNote}
      />

      <button className="add-note-fab" onClick={() => handleOpenEditor()}>
        <Plus size={28} />
      </button>

      {isEditorOpen && (
        <NoteEditor
          noteToEdit={editingNote}
          onSubmit={handleSaveNote}
          onCancel={handleCloseEditor}
        />
      )}
    </div>
  );
};

export default DashboardPage;
