import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/Index';

class TaskForm extends Component {
    state = {}

    componentWillMount() {
        if(this.props.task) {
            this.setState({
                id: this.props.task.id,
                name: this.props.task.name,
                status: this.props.task.status
            });
        } else {
            this.onClear();
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps && nextProps.itemEditing) {
            this.setState({
                id: nextProps.itemEditing.id,
                name: nextProps.itemEditing.name,
                status: nextProps.itemEditing.status
            });
        } else {
            this.onClear();
        }
    }

    onCloseForm = () => {
        this.props.onCloseForm();
    }

    onChange = event => {
        const target = event.target;
        const name = target.name;
        let value = target.value;
        // if( name === 'status') value = target.value === 'true' ? true : false; 
        this.setState({
            [name]: value
        });
    }

    onSave = event => {
        event.preventDefault();
        this.props.onSaveTask(this.state);
        this.onClear();
        this.onCloseForm();
    }

    onClear = () => {
        this.setState({
            name: '',
            status: false
        });
    }

    render() {
        const { name, status, id} = this.state;

        if(!this.props.isDisplayForm) return '';
        return(
            <div className="panel panel-warning">
                <div className="panel-heading">
                    <h3 className="panel-title">
                        { id !== '' ? 'Update' : 'Add'}
                        <span 
                            className="fa fa-times-circle text-right"
                            onClick={ this.onCloseForm }
                        ></span>
                    </h3>
                </div>
                <div className="panel-body">
                <form onSubmit={ this.onSave }>
                    <div className="form-group">
                        <label>Name :</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            name="name"
                            value={ name }
                            onChange={ this.onChange }
                        />
                        <br/>

                        <label>Status :</label>
                        <select 
                            className="form-control"
                            name="status"
                            value={ status }
                            onChange={ this.onChange }
                        >
                            <option value={true}>Activated</option>
                            <option value={false}>Hide</option>
                        </select><br/>
                        <div className="text-center">
                            <button 
                                type="submit" 
                                className="btn btn-warning"
                            >
                                <span className="fa fa-plus mr-5"></span>Save
                            </button>&nbsp;
                            <button 
                                type="button" 
                                className="btn btn-danger"
                                onClick={ this.onClear }
                            >
                                <span className="fa fa-close mr-5"></span>Cancel
                            </button>
                        </div>
                    </div>

                </form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isDisplayForm: state.isDisplayForm,
        itemEditing: state.itemEditing
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onSaveTask: task => {
            dispatch(actions.saveTask(task));
        },
        onCloseForm : () => {
            dispatch(actions.closeForm());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskForm);