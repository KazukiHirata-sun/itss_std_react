import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/Index';

class TaskItem extends Component {
    onUpdateStatus = () => {
        this.props.onUpdateStatusTask(this.props.task.id);
    }

    onDelete = () => {
        this.props.onDeleteTask(this.props.task.id);
        this.props.onCloseForm();
    }

    onEditTask = () => {
        this.props.onOpenForm();
        this.props.onEditTask(this.props.task);
    }

    render() {
        const { index, task } = this.props;
        return(
            <tr>
                <td>{ index + 1 }</td>
                <td>{ task.name }</td>
                <td className="text-center">
                    <span 
                        className={ task.status === true ? 'label label-danger' : 'label label-success'}
                        onClick={ this.onUpdateStatus }
                    >
                        { task.status === true ? 'Activated' : 'Hide'}
                    </span>
                </td>
                <td className="text-center">
                    <button 
                        type="button" 
                        className="btn btn-danger"
                        onClick={this.onDelete}
                    >
                        <span className="fa fa-trash mr-5"></span>Delete
                    </button>
                </td>
            </tr>
        );
    }
}

const mapStateToProps = state => {
    return {}
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onUpdateStatusTask: id => {
            dispatch(actions.updateStatusTask(id));
        },
        onDeleteTask: id => {
            dispatch(actions.deleteTask(id));
        },
        onCloseForm: () => {
            dispatch(actions.closeForm());
        },
        onOpenForm: () => {
            dispatch(actions.openForm());
        },
        onEditTask: task => {
            dispatch(actions.editItem(task));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskItem);