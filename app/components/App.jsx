import React from 'react';
import Tasks from './Tasks.jsx';
import Lanes from './Lanes.jsx';

import autobind from 'autobind-decorator';

import TaskActions from '../actions/taskActions.js';
import TaskStore from '../stores/taskStore.js';

import LaneActions from '../actions/laneActions.js';
import LaneStore from '../stores/laneStore.js';

import connect from '../decorators/connect.js';


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
