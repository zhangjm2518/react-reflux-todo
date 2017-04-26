import React, { Component } from "react";
import reactMixin from "react-mixin";
import Reflux from "reflux";
import Actions from "./action";
import Store from "./store";
import TodoList from "../../components/Todolist";
import TodoFilter from "../../components/TodoFilter";
import "./index.css";

export default class Todo extends Component {
    constructor() {
        super();
        this.state = {
            inputValue: "",
            fValue: 0,
            searchWords: ""
        };
        this.changeInputValue = this.changeInputValue.bind(this);
        this.changeFValue = this.changeFValue.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }
    changeInputValue() {
        this.setState({
            inputValue: this.Input.value
        });
    }
    changeFValue(value) {
        this.setState({
            fValue: value
        });
    }
    handleSearch(searchWords){
        this.setState({
            searchWords: searchWords
        });
    }
    render() {
        // 符合条件展示的todo
        const showTodos = this.state.data.todos.filter((item)=>{
            switch(this.state.fValue){
                case 0:
                    return true;
                    break;
                case 1:
                    return item.checked === false;
                    break;
                case 2:
                    return item.checked === true;
                    break;
            }
        }).filter((item) => {
            const searchWords = this.state.searchWords.trim()
            if (searchWords !== "") {
                return item.name.indexOf(searchWords) !== -1;
            } else {
                return true;
            }
        });
        // 完成的todo
        const comTodos = this.state.data.todos.filter((item)=>{
            return item.checked === true;
        });
        return <div className="todo-wrapper">
            <h2>My Todos</h2>
            <div className="todo-add-box">
                <input
                    type="text" 
                    value={ this.state.inputValue } 
                    ref={(node)=>{this.Input = node;}} 
                    onChange={this.changeInputValue}
                    placeholder="todo name"
                />
                <button
                    disabled={this.state.inputValue.trim() === ""}
                    onClick={ ()=>{
                        if (this.state.inputValue.trim() !== "") {
                            Actions.addTodo(this.state.inputValue);
                            this.setState({
                                inputValue: ""
                            })
                        }
                    } }
                >add</button>
            </div>
            <div className="todo-list-box">
                {
                    showTodos.length > 0 ? 
                    <TodoList 
                        todos={ showTodos }
                        onModify={ Actions.modifyTodo }
                        onDelete={ Actions.deleteTodo }
                    /> : 
                    <div className="todo-nodata">{this.state.fValue === 0 && this.state.searchWords.trim() === "" ? "暂无记录" : "暂无符合条件的记录"}</div>
                }
            </div>
            <div className="todo-list-filter">
                <TodoFilter
                    fValue={this.state.fValue}
                    allNum={this.state.data.todos.length}
                    comNum={comTodos.length}
                    searchWords={this.state.searchWords}
                    onChangeFValue={this.changeFValue}
                    clearCompleted={Actions.clearCompleted}
                    onSearch={this.handleSearch}
                />
            </div>
        </div>;
    }

}

reactMixin.onClass(Todo, Reflux.connect(Store, "data"));
