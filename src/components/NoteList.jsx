import React from 'react';
import NoteItem from './NoteItem';

const NoteList = ({ notes, onEdit, onDelete, onShare }) => {
  return (
    <div>
      <h3>My Notes</h3>
      <div className="note-list">
        {notes.length > 0 ? (
          notes.map(note => (
            <NoteItem
              key={note.id}
              note={note}
              onEdit={onEdit}
              onDelete={onDelete}
              onShare={onShare}
            />
          ))
        ) : (
          <p>You have no notes yet. Create one above!</p>
        )}
      </div>
    </div>
  );
};

export default NoteList;