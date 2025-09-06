import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getPublicNote } from '../services/noteService'; // You'll need to create this service

const PublicNotePage = () => {
  const { shareableId } = useParams();
  const [note, setNote] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPublicNote = async () => {
      try {
        // You would create a getPublicNote function in your noteService
        // const response = await getPublicNote(shareableId);
        // setNote(response.data);
        
        // Mock data for now:
        setNote({ title: "A Public Note", content: "This is a sample note that has been shared with the public." });

      } catch (err) {
        setError('Could not find this public note.');
      }
    };
    if (shareableId) {
      fetchPublicNote();
    }
  }, [shareableId]);

  if (error) return <p className="error">{error}</p>;
  if (!note) return <div>Loading note...</div>;

  return (
    <div className="page-content public-note">
      <h2>{note.title}</h2>
      <div className="note-content">
        <p>{note.content}</p>
      </div>
    </div>
  );
};

export default PublicNotePage;