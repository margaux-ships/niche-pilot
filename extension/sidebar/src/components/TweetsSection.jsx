import React, { useState } from 'react';

const BACKEND_URL = 'http://localhost:3000';

function TweetsSection({ tweets, niche }) {
  const [suggestionsMap, setSuggestionsMap] = useState({});
  const [loadingMap, setLoadingMap] = useState({});

  const handleOpenTweet = (url) => {
    window.open(url, '_blank');
  };

  const handleShowSuggestions = async (tweetText, index) => {
    if (suggestionsMap[index]) {
      // Toggle off
      const newMap = { ...suggestionsMap };
      delete newMap[index];
      setSuggestionsMap(newMap);
      return;
    }

    setLoadingMap({ ...loadingMap, [index]: true });

    try {
      const response = await fetch(`${BACKEND_URL}/suggest-comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tweetText, niche }),
      });

      if (!response.ok) {
        throw new Error('Failed to get suggestions');
      }

      const data = await response.json();
      setSuggestionsMap({ ...suggestionsMap, [index]: data.suggestions });
    } catch (error) {
      console.error('Error getting suggestions:', error);
      alert('Failed to get comment suggestions. Make sure the backend server is running.');
    } finally {
      setLoadingMap({ ...loadingMap, [index]: false });
    }
  };

  return (
    <div className="section">
      <h2 className="section-title">Tweets to Comment On ({tweets.length})</h2>
      
      {tweets.length === 0 ? (
        <div className="empty-state">No tweets loaded yet</div>
      ) : (
        <div>
          {tweets.slice(0, 10).map((tweet, index) => (
            <div key={index} className="tweet-item">
              <div className="tweet-text">
                {tweet.text ? tweet.text.substring(0, 120) + (tweet.text.length > 120 ? '...' : '') : 'Tweet text not available'}
              </div>
              <div>
                <button
                  className="button-small"
                  onClick={() => handleOpenTweet(tweet.url)}
                >
                  Open Tweet
                </button>
                <button
                  className="button-small"
                  onClick={() => handleShowSuggestions(tweet.text, index)}
                  disabled={loadingMap[index]}
                >
                  {loadingMap[index] ? 'Loading...' : suggestionsMap[index] ? 'Hide Suggestions' : 'Show Suggestions'}
                </button>
              </div>
              
              {suggestionsMap[index] && (
                <div className="suggestions">
                  <div className="suggestions-title">Comment Suggestions:</div>
                  {suggestionsMap[index].map((suggestion, idx) => (
                    <div key={idx} className="suggestion-item">
                      {suggestion}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default TweetsSection;

