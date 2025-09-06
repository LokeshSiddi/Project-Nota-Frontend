import React from 'react';
import Notes from '../components/Notes'; // Your existing component

const DashboardPage = () => {
  return (
    <div className="page-content">
      <h2>Your Dashboard</h2>
      <p>Here are your private notes.</p>
      {/* You can add your NoteEditor and other components here.
        For now, we'll just display the list.
      */}
      <Notes />
    </div>
  );
};

export default DashboardPage;