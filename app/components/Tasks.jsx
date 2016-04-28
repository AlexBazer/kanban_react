import React from 'react';
import Task from './Task.jsx';
import Editable from './Editable.jsx';

export default ({tasks, onValueClick, onEdit, onRemove}) => (
    <ul className="tasks">{tasks.map(task =>
        <li className="task" key={task.id}>
            <Editable
                editing={task.editing}
                value={task.content}
                onValueClick={onValueClick.bind(null, task.id)}
                onEdit={onEdit.bind(null, task.id)}
                onRemove={onRemove.bind(null, task.id)}
            />
        </li>
    )}</ul>
);
