import React from 'react';
import autobind from 'autobind-decorator';

export default class Editable extends React.Component{
    render(){
        const {value, onEdit, onValueClick, editing, ...props} = this.props;

        return (
            <div {...props}>
                {editing?this.renderEdit():this.renderValue()}
            </div>
        );
    }

    @autobind
    renderEdit(){
        return (
            <input type="text"
            ref={
                element => element?element.selectionStart = this.props.value.length: null
            }
            autoFocus={true}
            defaultValue={this.props.value}
            onBlur={this.finishEdit}
            onKeyPress={this.checkEnter} />
        );
    }

    @autobind
    renderValue(){
        const {onValueClick, onRemove, ...props} = this.props;

        return (
            <div onClick={onValueClick}>
                <span className="value">{this.props.value}</span>
                {onRemove ? this.renderRemove(): null}
            </div>
        );
    }

    @autobind
    renderRemove(){
        return (
            <button
                className="remove"
                onClick={this.props.onRemove}
            >X</button>
        );
    }

    @autobind
    checkEnter(event){
        if(event.key === 'Enter'){
            this.finishEdit(event);
        }
    }

    @autobind
    finishEdit(event){
        const value = event.target.value;
        if (this.props.onEdit){
            this.props.onEdit(value);
        }
    }
}
