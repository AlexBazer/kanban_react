import React from 'react';
import Lane from './Lane.jsx';

export default ({lanes}) => {
    console.log(lanes);
    return (
        <div className="lanes">
            {lanes.map(lane => {
                return (<Lane className="lane" key={lane.id} lane={lane}/>)
            })}
        </div>
    );
}
