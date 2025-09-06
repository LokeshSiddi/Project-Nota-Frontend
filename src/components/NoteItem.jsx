import React from 'react';
import { MoreVertical, Edit, Trash2, Share2 } from 'lucide-react';

const NoteItem = ({ note, color, onEdit, onDelete, onShare }) => {
  return (
    <div className="note-card" style={{ backgroundColor: color }}>
      <div className="note-card-content">
        <h3>{note.title}</h3>
        <p>{note.content.substring(0, 100)}{note.content.length > 100 ? '...' : ''}</p>
      </div>
      <div className="note-card-footer">
        <div className="dropdown">
          <button className="more-button">
            <MoreVertical size={18} />
          </button>
          <div className="dropdown-content">
            <button onClick={() => onEdit(note)}><Edit size={14} /> Edit</button>
            <button onClick={() => onShare(note.id)}><Share2 size={14} /> {note.shared ? 'Unshare' : 'Share'}</button>
            <button className="delete" onClick={() => onDelete(note.id)}><Trash2 size={14} /> Delete</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
