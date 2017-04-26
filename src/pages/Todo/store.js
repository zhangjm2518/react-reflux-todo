import Reflux from "reflux";
import Actions from "./action";

module.exports = Reflux.createStore({
    data: {
        todos: [],
    },
    listenables: [Actions],

    // 新增一条
    onAddTodo: function(name) {
        this.data.todos = this.data.todos.concat({
            name: name,
            checked: false
        });
        this.updateData();
    },
    
    // 修改一条
    onModifyTodo: function(index, type, value) {
        this.data.todos[index][type] = value;
        this.updateData();
    },
    
    // 删除一条
    onDeleteTodo: function(index) {
        this.data.todos.splice(index, 1);
        this.updateData();
    },
    
    // 清楚已完成
    onClearCompleted: function(){
        this.data.todos = this.data.todos.filter(function(item){
            return item.checked === false;
        });
        this.updateData();
    },
    updateData: function() {
        this.data.todos = this.data.todos.map(function(item, index){
            return {
                name: item.name,
                checked: item.checked,
                num: index
            }
        });
        this.trigger(this.data);
    },
    getInitialState: function() {
        return this.data;
    }
});