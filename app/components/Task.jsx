import React from 'react';

import {DragSource, DropTarget} from 'react-dnd';
import ItemTypes from '../constants/itemTypes.js';

const taskSource = {
    beginDrag(props){
        return {
            id: props.id
        };
    },
    isDragging(props, monitor){
        return props.id === monitor.getItem().id;
    }
}

const taskTarget = {
    hover(targetProps, monitor){
        const targetId = targetProps.id;
        const sourceProps = monitor.getItem();
        const sourceId = sourceProps.id;
        if(sourceId !== targetId){
            targetProps.onMove({sourceId, targetId});
        }

    }
};

@DragSource(ItemTypes.TASK, taskSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
}))
@DropTarget(ItemTypes.TASK, taskTarget, (connect) => ({
    connectDropTarget: connect.dropTarget()
}))
export default class Task extends React.Component{
    render(){
        const {connectDragSource, connectDropTarget, isDragging, id, onMove, editing, ...props} = this.props;
        const dragSource = editing?pass => pass:connectDragSource;
        return dragSource(connectDropTarget(
            <li
                style={{opacity: isDragging? 0 : 1}}
                {...props}
            >
            {this.props.children}
            </li>
        ));
    }
}
