import React from 'react';
import Tasks from './Tasks.jsx';
import Lanes from './Lanes.jsx';

import autobind from 'autobind-decorator';

import TaskActions from '../actions/taskActions.js';
import TaskStore from '../stores/taskStore.js';

import LaneActions from '../actions/laneActions.js';
import LaneStore from '../stores/laneStore.js';

import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import connect from '../decorators/connect.js';

@DragDropContext(HTML5Backend)
@connect(LaneStore)
export default class App extends React.Component {
    render(){
        return (
            <div>
                <button className="add-lane" onClick={this.addLane}>+</button>
                <Lanes lanes={this.state.lanes}/>
            </div>
        )
    }

    addLane(){
        LaneActions.create({name: 'New Lane in here!'});
    }
}
