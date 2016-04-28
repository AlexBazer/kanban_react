import React from 'react';

import {DragSource} from 'react-dnd';
import ItemTypes from '../constants/itemTypes.js';

const taskSource = {
    beginDrag(props){
        console.log('Beginning dragging', props);
        return {};
    }
}

@DragSource(ItemTypes.TASK, taskSource, (connect) => ({
    connectDragSource: connect.dragSource()
}))
export default class Task extends React.Component{
    render(){
        const {connectDragSource, id, onMove, ...props} = this.props;
        return connectDragSource(
            <li {...this.props}>{this.props.children}</li>
        );
    }
}
