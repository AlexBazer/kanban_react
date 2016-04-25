import React from 'react';
import Task from './Task.jsx';

export default ({tasks, onEdit, onRemove}) => (
    <ul className="tasks">{tasks.map(task =>
        <li className="task" key={task.id}>
            <Task
                content={task.content}
                onEdit={onEdit.bind(null, task.id)}
                onRemove={onRemove.bind(null, task.id)}
            />
        </li>
    )}</ul>
);
