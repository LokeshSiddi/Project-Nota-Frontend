import React from 'react';

const NoteItem = ({ note, onEdit, onDelete, onShare }) => {
  return (
    <div className={`note-item ${note.shared ? 'shared' : ''}`}>
      <div className="note-details">
        <h4>{note.title} {note.shared ? '🌐' : ''}</h4>
        <p>{note.content}</p>
      </div>
      <div className="note-actions">
        {/* When Edit is clicked, it calls the onEdit function with the current note object */}
        <button onClick={() => onEdit(note)}>Edit</button>
        <button onClick={() => onShare(note.id)}>
          {note.shared ? 'Unshare' : 'Share'}
        </button>
        <button className="delete" onClick={() => onDelete(note.id)}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default NoteItem;