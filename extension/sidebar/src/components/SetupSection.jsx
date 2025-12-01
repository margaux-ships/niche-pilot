import React from 'react';

const NICHE_OPTIONS = [
  'b2b ai',
  'indie saas',
  'product',
  'design',
  'startup founders',
  'growth',
  'femtech',
];

function SetupSection({ handle, niche, onHandleChange, onNicheChange, onGenerate, loading }) {
  return (
    <div className="section">
      <h2 className="section-title">Setup</h2>
      
      <div className="input-group">
        <label htmlFor="handle">Your Handle</label>
        <input
          id="handle"
          type="text"
          placeholder="@yourhandle"
          value={handle}
          onChange={(e) => onHandleChange(e.target.value)}
        />
      </div>

      <div className="input-group">
        <label htmlFor="niche">Niche</label>
        <select
          id="niche"
          value={niche}
          onChange={(e) => onNicheChange(e.target.value)}
        >
          <option value="">Select a niche...</option>
          {NICHE_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <button
        className="button"
        onClick={onGenerate}
        disabled={loading || !handle || !niche}
      >
        {loading ? 'Generating...' : 'Generate Growth Plan'}
      </button>
    </div>
  );
}

export default SetupSection;

