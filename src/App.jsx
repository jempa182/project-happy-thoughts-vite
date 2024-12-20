// App.jsx
import './index.css';
import { ListThoughts } from "./components/ListThoughts";
import { SubmitThought } from './components/SubmitThought';
import { useState, useEffect } from 'react';

export const App = () => {
  // State to store all thoughts from the API
  const [thoughts, setThoughts] = useState([]);
  const [error, setError] = useState(null);

  // Handler function to add new thoughts to the beginning of the list
  const handleNewThought = (newThought) => {
    setThoughts(prevThoughts => [newThought, ...prevThoughts]);
  };

  // Fetch initial thoughts when component mounts
  useEffect(() => {
    fetch('https://happy-thoughts-api-hvg8.onrender.com/thoughts')
      .then((res) => res.json())
      .then((data) => {
        // The GET endpoint returns the array directly, not wrapped in response
        setThoughts(data);
      })
      .catch((err) => {
        console.error('Error fetching thoughts:', err);
        setError('Failed to load thoughts');
      });
  }, []); 

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="app">  
      <div className="main-title-container">
        <h1>Project Happy Thoughts</h1>
        <p>Made by Jenny Andersén</p>
      </div>

      {/* Form component for submitting new thoughts */}
      <div className="submit-thought-card">
        <SubmitThought onSubmit={handleNewThought} /> 
      </div>

      {/* List component that displays all thoughts */}
      <div className="main-container">
        <ListThoughts thoughts={thoughts} /> 
      </div>
    </div>
  );
};