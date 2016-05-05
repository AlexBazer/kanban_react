import React from 'react';
import Lane from './Lane.jsx';

import styles from '../styles/main.css'

/**
 * Lanes simple component
 */
export default ({lanes, ...props}) => {
    return (
        <div {...props}>
            {lanes.map(lane => {
                return (<Lane className={styles.col} key={lane.id} lane={lane}/>)
            })}
        </div>
    );
}
