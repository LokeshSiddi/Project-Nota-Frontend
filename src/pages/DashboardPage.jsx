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

const DashboardPage = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingNote, setEditingNote] = useState(null); // Tracks which note is being edited

  // --- Data Fetching ---
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

  // --- CRUD and Share Logic ---
  const handleCreateNote = async (noteData) => {
    try {
      await createNote(noteData);
      fetchNotes(); // Refresh list
    } catch (err) {
      alert('Failed to create note.');
    }
  };

  const handleUpdateNote = async (noteData) => {
    if (!editingNote) return;
    try {
      await updateNote(editingNote.id, noteData);
      setEditingNote(null); // Exit editing mode
      fetchNotes(); // Refresh list
    } catch (err) {
      alert('Failed to update note.');
    }
  };

  const handleDeleteNote = async (id) => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      try {
        await deleteNote(id);
        fetchNotes(); // Refresh list
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
      fetchNotes(); // Refresh list
    } catch (err) {
      alert('Failed to share note.');
    }
  };

  // --- Render ---
  if (loading) return <div>Loading notes...</div>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="page-content">
      {/* Conditionally render the editor for creating or updating */}
      {editingNote ? (
        <NoteEditor
          onSubmit={handleUpdateNote}
          noteToEdit={editingNote}
          onCancel={() => setEditingNote(null)}
        />
      ) : (
        <NoteEditor onSubmit={handleCreateNote} />
      )}
      <hr />
      <NoteList
        notes={notes}
        onEdit={setEditingNote} // Pass the function to start editing
        onDelete={handleDeleteNote}
        onShare={handleShareNote}
      />
    </div>
  );
};

export default DashboardPage;