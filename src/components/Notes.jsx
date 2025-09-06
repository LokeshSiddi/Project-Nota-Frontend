import React, { useState, useEffect } from 'react';
import axios from 'axios';
import keycloak from '../keycloak'; // fix this path based on your folder structure

const Notes = () => {
    const [notes, setNotes] = useState([]);
    const API_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080/api/notes/all';

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const refreshed = await keycloak.updateToken(30);
                if (refreshed) {
                    console.log("Token refreshed");
                }

                const response = await axios.get(API_URL, {
                    headers: {
                        Authorization: `Bearer ${keycloak.token}`
                    }
                });

                setNotes(response.data);
            } catch (error) {
                console.error("Error fetching notes!", error);
            }
        };

        fetchNotes();
    }, []);

    return (
        <ul>
            {notes.map(note => (
                <li key={note.id}>{note.content}</li>
            ))}
        </ul>
    );
};

export default Notes;
