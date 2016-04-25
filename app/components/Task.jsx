import React from 'react';
import autobind from 'autobind-decorator';

export default class Task extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            editing: false
        }

    }

    render(){
        if(this.state.editing){
            return this.renderEdit();
        }
        return this.renderView();
    }

    @autobind
    renderEdit(){
        return (
            <input type="text"
            ref={
                element => element?element.selectionStart = this.props.content.length: null
            }
            autoFocus={true}
            defaultValue={this.props.content}
            onBlur={this.finishEdit}
            onKeyPress={this.checkEnter} />
        );
    }

    @autobind
    renderView(){
        return (
            <div onClick={this.edit}>
                <span className="content">{this.props.content}</span>
                {this.props.onRemove? this.renderRemove(): null}
            </div>
        );
    }

    @autobind
    renderRemove(){
        return (
            <button
                className="remove-task"
                onClick={this.props.onRemove}
            >X</button>
        );
    }

    @autobind
    edit(){
        this.setState({
            editing: true
        });
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

            this.setState({editing: false});
        }
    }
}
