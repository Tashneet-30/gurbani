import React, { useState } from 'react';
import '../ChatScreenPage/ChatScreenPage.css';

import image from '../../assets/images/response.png'; 
import blueCircleImage from '../../assets/images/youlogo.png'; // Blue circle image
import './ChatArea.css';

const ChatArea = ({ query, setQuery, handleQuerySubmit, loading, shabadDetails, selectedSource }) => {
  // Sample suggestions for Gurbani questions
  const suggestions = [
    "When to pray?",
    "Who created Vedas?",
    "What is the meaning of life?",
    "How to attain salvation?",
  ];

  // State to track if the user has started typing
  const [showSuggestions, setShowSuggestions] = useState(false);
  
  // State to track the submitted query
  const [submittedQuery, setSubmittedQuery] = useState('');

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    // Show suggestions only if the input is not empty
    setShowSuggestions(e.target.value.trim() !== '');
  };

  // Update the submit handler to set the submitted query
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      setSubmittedQuery(query); // Set the submitted query
      handleQuerySubmit(e);     // Call the original submit handler
    }
  };

  return (
    <div className="chat-area">
      {/* Display the Question at the Top */}
      {submittedQuery && (
        <div className="question-display-top">
          <span className="question-top-text">{submittedQuery}</span>
        </div>
      )}

      {/* Horizontal Line Separator */}
      <hr className="question-separator" />

      {/* You Section with the Question */}
      {submittedQuery && (
        <div className="question-source-section">
          {/* Message bubble */}
          <div className="question-display">
            <div className="circle blue-circle">
              <img src={blueCircleImage} alt="Blue Circle" className="logo-small" />
            </div>
            {/* Sender label "You" in the same line as the blue circle */}
            <span className="sender-label">You</span>
          </div>
          {/* The question text moves below "You" */}
          <div className="question-text-wrapper">
            <span className="question-text">{submittedQuery}</span>
          </div>
        </div>
      )}

      {/* Display Source */}
      {submittedQuery && (
        <div className="source-display">
          <div className="circle orange-circle">
            <img src={image} alt="Source Icon" className="source-image" />
          </div>
          <span className="source-text">{selectedSource}</span>
        </div>
      )}

      {/* Display Results */}
      <div className="results-section">
        {loading && <p>Loading...</p>}
        {!loading && shabadDetails.length === 0 && <p>No results found. Try another query.</p>}
        {!loading && shabadDetails.length > 0 && (
          <>
            <div className="result-card top-result">
              <h3 className="gurbani-title orange-text">TOP RESULT </h3>
              {shabadDetails[0].verses.map((verse, index) => (
                <div key={index}>
                  <p className="gurbani-verse">{verse.verse}</p>
                  <p className="gurbani-translation">{verse.translation}</p>
                </div>
              ))}
            </div>
            {/* Display Other Results */}
            {shabadDetails.slice(1).map((shabad) => (
              <div key={shabad.shabadId} className="result-card">
                <h3 className="gurbani-title orange-text">OTHER RESULTS</h3>
                {shabad.verses.map((verse, index) => (
                  <div key={index}>
                    <p className="gurbani-verse">{verse.verse}</p>
                    <p className="gurbani-translation">{verse.translation}</p>
                  </div>
                ))}
              </div>
            ))}
          </>
        )}
      </div>

      {/* Suggestions for Gurbani search, only show if the user has typed something */}
      {showSuggestions && (
        <div className="suggestions-container">
          {suggestions.map((suggestion, index) => (
            <div key={index} className="suggestion-box" onClick={() => setQuery(suggestion)}>
              {suggestion}
            </div>
          ))}
        </div>
      )}

      {/* Input area at the bottom */}
      <form className="query-form" onSubmit={handleFormSubmit}>
        <p className="query-instruction">Type your question above</p>
        <input
          className="query-input"
          type="text"
          placeholder="Enter your query..."
          value={query}
          onChange={handleInputChange} // Update the input change handler
        />
        <button className="query-submit-btn" type="submit">
          <span className="arrow">&#x2794;</span>
        </button>
      </form>
    </div>
  );
};

export default ChatArea;