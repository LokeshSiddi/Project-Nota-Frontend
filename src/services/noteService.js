import api from './api';

// This function now uses the central api instance.
// No need to worry about headers or tokens here!
export const getNotes = () => {
  return api.get('/notes/all');
};

// You can easily add more functions here later
// export const createNote = (noteData) => {
//   return api.post('/notes/create', noteData);
// };