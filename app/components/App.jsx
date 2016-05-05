import React from 'react';
import Lanes from './Lanes.jsx';

import LaneActions from '../actions/laneActions';
import LaneStore from '../stores/laneStore';

import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import connect from '../decorators/connect';

import styles from '../styles/main.css';
/**
 * Main app Component
 * Mount DragDropContext and connect LaneStore
 */
@DragDropContext(HTML5Backend)
@connect(LaneStore)
export default class App extends React.Component {
    render(){
        return (
            <div>
                <button className="add-lane" onClick={this.addLane}>+</button>
                <Lanes className={styles.row} lanes={this.state.lanes}/>
            </div>
        )
    }

    addLane(){
        LaneActions.create({name: 'New Lane in here!'});
    }
}
