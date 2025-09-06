import api from './api'; // Imports the configured Axios instance

/**
 * Fetches all notes for the authenticated user.
 * Corresponds to: @GetMapping("/all")
 * @returns {Promise<AxiosResponse<any>>} A promise that resolves to the server response.
 */
export const getAllNotes = () => {
  return api.get('/notes/all');
};

/**
 * Fetches a single note by its ID.
 * Corresponds to: @GetMapping("/{id}")
 * @param {number} id The ID of the note to fetch.
 * @returns {Promise<AxiosResponse<any>>}
 */
export const getNoteById = (id) => {
  return api.get(`/notes/${id}`);
};

/**
 * Creates a new note.
 * Corresponds to: @PostMapping("/create")
 * @param {object} noteData An object containing the note's title and content. e.g., { title: "My Title", content: "My content." }
 * @returns {Promise<AxiosResponse<any>>}
 */
export const createNote = (noteData) => {
  return api.post('/notes/create', noteData);
};

/**
 * Updates an existing note.
 * Corresponds to: @PutMapping("/{id}")
 * @param {number} id The ID of the note to update.
 * @param {object} noteData An object containing the new title and content.
 * @returns {Promise<AxiosResponse<any>>}
 */
export const updateNote = (id, noteData) => {
  return api.put(`/notes/${id}`, noteData);
};

/**
 * Deletes a note by its ID.
 * Corresponds to: @DeleteMapping("/{id}")
 * @param {number} id The ID of the note to delete.
 * @returns {Promise<AxiosResponse<any>>}
 */
export const deleteNote = (id) => {
  return api.delete(`/notes/${id}`);
};

/**
 * Toggles the public share status of a note.
 * Corresponds to: @PostMapping("/share/{id}")
 * @param {number} id The ID of the note to share or unshare.
 * @returns {Promise<AxiosResponse<any>>} A promise resolving to a map with a message and a shareableLink.
 */
export const shareNote = (id) => {
  return api.post(`/notes/share/${id}`);
};

// You might also need the public function from PublicNoteController
/**
 * Fetches a publicly shared note by its shareable UUID.
 * Corresponds to: PublicNoteController's @GetMapping("{shareableId}")
 * @param {string} shareableId The UUID of the shared note.
 * @returns {Promise<AxiosResponse<any>>}
 */
export const getPublicNote = (shareableId) => {
  // This endpoint is public, so it doesn't strictly need the authenticated 'api' instance,
  // but using it is harmless and keeps all API calls consistent.
  return api.get(`/public/notes/${shareableId}`);
};