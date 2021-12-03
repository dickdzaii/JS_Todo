class Todo {
    constructor(name, description, dueDate, priority) {
        this.name = name;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.isDone = false;
    }

}

class ListTodo {
    constructor(listName) {
        this.listName = listName;
        this.list = loadFromLocalStorage(listName);
    }
    getTheHighestTask() {
        return this.list.length > 0 ? this.list[this.list.length - 1].id + 1 : 1;
    }
    addNewItem(item) {
        if (item.name) {
            item.id = this.getTheHighestTask();
            this.list.push(item);
            saveToLocalStorage(this.listName, this.list);
        } else throw new Error("Task is missing data");
    }

    findItemById(id) {
        let items = this.list.filter(e => e.id == id);
        if (items.length !== 1) {
            return undefined;
        } else {
            return items[0];
        }
    }

    updateItem(id, item) {
        let foundItem = this.findItemById(id);
        if (foundItem && item) {
            item.id = foundItem.id;
            let index = this.list.indexOf(foundItem);
            this.list.splice(index, 1, item);
            saveToLocalStorage(this.listName, this.list);
        }
    }

    deleteItem(id) {
        let foundItem = this.findItemById(id);
        if (foundItem) {
            let index = this.list.indexOf(foundItem);
            this.list.splice(index, 1);
            saveToLocalStorage(this.listName, this.list);
            LoadPage(currentPage)
        } else throw new Error("Could not find task has id " + id)
    }

    changeTaskStatus(id) {
        let foundItem = this.findItemById(id);
        if (foundItem) {
            let index = this.list.indexOf(foundItem);
            this.list.splice(index, 1);
            saveToLocalStorage(this.listName, this.list);
            LoadPage(currentPage)
        } else throw new Error("Could not find task has id " + id)

    }

    showAllTasks() {
        return this.list.map(e => `<div class="single-task d-flex justify-content-between ${e.isDone? 'success':e.priority}-task border px-2 py-3 my-1">
        <div>
        <input type="checkbox" class="task-status" name="done-task-${e.id}" id="done-${e.id}" ${e.isDone? 'checked':''} class="">
       <span class="font-weight-bold">${e.name}</span>
        </div>
       <div>
       <button class="btn btn-info task-detail" name="detail-${e.id}" id="detail-${e.id}">Detail</button>
       <button class="btn btn-danger delete-task" id="delete-${e.id}">Remove</button>
       </div>
    </div>`).join('');
    }

    sortByAttribute(attributes) {
        this.list.sort((a, b) => a[attributes] - b[attributes]);
    }
}