import React, { Component } from "react";
import PropTypes from "prop-types";
import "./todolist.css";

// 列表中的单个子元素组件
export class TodoItem extends Component{
    constructor() {
        super();
        this.state = {
            itemValue: "",
            showInput: false
        };
        this.handleChangeItemValue = this.handleChangeItemValue.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }
    // 表单输入
    handleChangeItemValue() {
        this.setState({
            itemValue: this.input.value
        });
    }
    // 点击取消
    handleCancel() {
        this.setState({
            itemValue: this.props.itemValue,
            showInput: false
        });
    }
    componentDidMount() {
        this.setState({
            itemValue: this.props.itemValue
        });
    }
    render() {
        const checked = this.props.itemChecked;
        return <li className="todo-item">
            {
                this.state.showInput ? 
                <div>
                    <input
                        type="text" 
                        value={this.state.itemValue} 
                        ref={(node) => {this.input = node}}
                        onChange={this.handleChangeItemValue}
                    />
                    <button className="item-btn" onClick={this.handleCancel}>cancel</button>
                    <button className="item-btn" disabled={this.state.itemValue === ""} onClick={() => {
                        this.props.onModify("name", this.input.value);
                        this.setState({
                            showInput: false
                        });
                    }}>OK</button>
                </div>:
                <div onDoubleClick={() => { this.setState({showInput: true}); }}>
                    <input
                        className="item-check"
                        type="checkbox"
                        checked={checked}
                        onDoubleClick={(e) => { e.stopPropagation(); }}
                        onChange={()=>{
                            this.props.onModify("checked", !checked)
                        }}
                    />
                    <button className="item-btn" onClick={this.props.onDelete}>delete</button>
                    <span className="item-txt">{this.props.itemValue}</span>
                </div>
            }
        </li>;
    }
}
TodoItem.propTypes = {
    itemValue: PropTypes.string.isRequired,
    itemChecked: PropTypes.bool.isRequired,
    onModify: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
};

// 列表组件
export default class TodoList extends Component {
    constructor() {
        super();
    }
    render() {
        return <ul className="todo-list">
            {this.props.todos.map(item => <TodoItem 
                key={item.num}
                itemValue={item.name}
                itemChecked={item.checked}
                onModify={(type, value)=>{
                    this.props.onModify(item.num, type, value);
                }}
                onDelete={()=>{
                    this.props.onDelete(item.num);
                }}
            />)}
        </ul>;
    }
}

TodoList.propTypes = {
    todos: PropTypes.array.isRequired,
    onModify: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
};