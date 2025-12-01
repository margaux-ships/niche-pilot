import React from 'react';

function DailyTasksSection({ tasks, onTaskToggle }) {
  return (
    <div className="section">
      <h2 className="section-title">Daily Growth Ritual</h2>
      
      <div className="task-item">
        <input
          type="checkbox"
          id="follow5"
          checked={tasks.follow5 || false}
          onChange={() => onTaskToggle('follow5')}
        />
        <label htmlFor="follow5">Follow 5 people</label>
      </div>

      <div className="task-item">
        <input
          type="checkbox"
          id="comment5"
          checked={tasks.comment5 || false}
          onChange={() => onTaskToggle('comment5')}
        />
        <label htmlFor="comment5">Comment on 5 tweets</label>
      </div>

      <div className="task-item">
        <input
          type="checkbox"
          id="post1"
          checked={tasks.post1 || false}
          onChange={() => onTaskToggle('post1')}
        />
        <label htmlFor="post1">Post 1 insight</label>
      </div>
    </div>
  );
}

export default DailyTasksSection;

