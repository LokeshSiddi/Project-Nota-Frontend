import React from 'react';
import NoteItem from './NoteItem';

const NoteList = ({ notes, onEdit, onDelete, onShare }) => {
  const colors = ['#D9E8FC', '#FFDDC1', '#D4F0F0', '#FFE4E1', '#E6E6FA'];

  return (
    <div className="note-grid">
      {notes.length > 0 ? (
        notes.map((note, index) => (
          <NoteItem
            key={note.id}
            note={note}
            color={colors[index % colors.length]}
            onEdit={onEdit}
            onDelete={onDelete}
            onShare={onShare}
          />
        ))
      ) : (
        <div className="empty-state">
          <h3>No notes yet!</h3>
          <p>Click the big '+' button to add your first note.</p>
        </div>
      )}
    </div>
  );
};

export default NoteList;
