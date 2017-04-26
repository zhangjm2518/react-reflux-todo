import React, { Component } from "react";
import PropTypes from "prop-types";
import "./todofilter.css";

export default class TodoFilter extends Component {
    constructor() {
        super();
        this.state = {
            searchWords: ""
        }
    }
    handleChange() {
        this.setState({
            searchWords: this.searchInput.value
        });
    }
    render() {
        return <div className="todo-filter">
            <div className="todo-completed">
                <span className="filter-item">
                    <input type="radio" name="filter" checked={this.props.fValue === 0} onChange={()=>{this.props.onChangeFValue(0)}} />
                    <label onClick={()=>{this.props.onChangeFValue(0)}}>all({this.props.allNum})</label>
                </span>
                <span className="filter-item">
                    <input type="radio" name="filter" checked={this.props.fValue === 1} onChange={()=>{this.props.onChangeFValue(1)}} />
                    <label onClick={()=>{this.props.onChangeFValue(1)}}>active({this.props.allNum - this.props.comNum})</label>
                </span>
                <span className="filter-item">
                    <input type="radio" name="filter" checked={this.props.fValue === 2} onChange={()=>{this.props.onChangeFValue(2)}} />
                    <label onClick={()=>{this.props.onChangeFValue(2)}}>complete({this.props.comNum})</label>
                </span>
                <button type="button" className="filter-btn" onClick={this.props.clearCompleted} disabled={!this.props.comNum}>clear completed</button>
            </div>
            <div className="todo-search">
                <input
                    type="text"
                    value={this.props.searchWords}
                    onChange={() => { this.props.onSearch(this.searchInput.value); }}
                    ref={(node)=>{this.searchInput = node}}
                    placeholder="search words"
                />
            </div>
        </div>;
    }
}

TodoFilter.propTypes = {
    fValue: PropTypes.number.isRequired,
    allNum: PropTypes.number.isRequired,
    comNum: PropTypes.number.isRequired,
    searchWords: PropTypes.string.isRequired,
    onChangeFValue: PropTypes.func.isRequired,
    clearCompleted: PropTypes.func.isRequired,
    onSearch: PropTypes.func.isRequired,
}