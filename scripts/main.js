const listTasks = new ListTodo('todo')
let currentPage = myTask;
const main = document.querySelector('main');
LoadPage(currentPage);

//#region Main
function LoadPage(pageName, ...params) {
    switch (pageName) {
        case taskForm:
            {
                taskdetail = taskForm;
                main.innerHTML = `<div class="text-center">
                <h1>New task</h1>
                </div>
                <div class="form container">
                <div class="">
                    <input type="text" class="form-control" placeholder="Task name">
                </div>
                <div class="">
                    <label class="font-weight-bold" for="description" placeholder="Description">Description</label>
                    <div>
                        <textarea name="" id="description" class="form-control" cols="30" rows="10"></textarea>
                    </div>
                </div>
                <div class="row my-3">
                    <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-6">
                        <input type="date" class="form-control" placeholder="">
                    </div>
                    <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-6">
                        <select name="" id="" class="form-control">
                            <option value="low">Low</option>
                            <option value="normal" selected>Normal</option>
                            <option value="high">High</option>
                        </select>
                    </div>
                </div>
                <div class="form-group">
                    <button class="btn btn-success form-control" id="addTask">${params.length>0?'Update':'Add'}</button>
                </div>
                <div><a href="" onclick="LoadPage('tasklist')">my task</a></div>
                </div>`;
                const addButton = document.getElementById("addTask");
                const nameField = document.querySelector('input[type="text"]');
                const descriptionField = document.querySelector('textarea');
                const dueDateField = document.querySelector('input[type="date"]');
                const priorityField = document.querySelector('select');
                let today = new Date();
                let month = today.getMonth() < 9 ? '0' + (today.getMonth() + 1) : today.getMonth() + 1;
                let date = today.getDate() < 10 ? '0' + today.getDate() : today.getDate;
                dueDateField.setAttribute('min', `${today.getFullYear()}-${month}-${date}`);
                dueDateField.setAttribute('value', `${today.getFullYear()}-${month}-${date}`);
                if (params.length > 0) {
                    let id = params[0];
                    let task = listTasks.findItemById(id);
                    if (task) {
                        nameField.value = task.name;
                        descriptionField.value = task.description;
                        dueDateField.value = task.dueDate;
                        priorityField.value = task.priority;
                    } else throw new Error('Task not found');
                } else {
                    nameField.value = '';
                    descriptionField.value = '';
                }

                function addOrUpdateTask() {
                    if (nameField.value) {
                        let newTask = new Todo(nameField.value, descriptionField.value, dueDateField.value, priorityField.value)
                        if (params.length > 0) {
                            listTasks.updateItem(params[0], newTask);
                        } else {
                            listTasks.addNewItem(newTask)
                        };
                        LoadPage(myTask);

                    } else throw new Error('task name must be specified')
                }
                addButton.addEventListener('click', function() { addOrUpdateTask() })
                break;
            }
        case myTask:
            listTasks.sortByAttribute("dueDate"); {
                currentPage = myTask;
                main.innerHTML = `<div class="text-center">
                <h1>My Tasks</h1>
                </div>
                <div><button class="btn btn-primary" id="create-new">Create task</button></div>
                ` + (listTasks.list.length > 0 ? `<div class="item-show my-3">
                <span>Show</span> <input type="number" min=1 value=10>
                <span>entries</span>
                </div>
                <div class="task-list">
                ${listTasks.showAllTasks()}              
                </div>` : `\<p class="my-2 text-center">You don't have any tasks. Enjoy you day!</p>`);
                const createNewButton = document.getElementById("create-new");
                createNewButton.addEventListener("click", () => { LoadPage(taskForm); });
                const deleteButtons = document.querySelectorAll(".delete-task");
                const taskCheckbox = document.querySelectorAll(".task-status");
                const detailButtons = document.querySelectorAll(".task-detail")
                for (const e of deleteButtons) {
                    e.addEventListener("click", function() { deleteTask(e.id.split('-')[1]) })
                }
                for (const e of detailButtons) {
                    e.addEventListener("click", function() { LoadPage(taskForm, e.id.split('-')[1]) })
                }
                for (const e of taskCheckbox) {
                    e.addEventListener("change", function() { changeStatus(e.id.split('-')[1]) })
                }

                function deleteTask(taskId) {
                    let task = listTasks.findItemById(taskId);
                    if (task) {
                        if (confirm('Delete task?')) {
                            listTasks.deleteItem(taskId);
                        }
                    } else throw new Error('Task not found');
                }

                function changeStatus(taskId) {
                    let task = listTasks.findItemById(taskId);
                    if (task) {
                        task.isDone = !task.isDone;
                        listTasks.updateItem(taskId, task)
                    } else throw new Error(`Task has id ${taskId} not found`);
                }
                break;
            }
        case taskDetail:
            {
                if (params) {
                    currentPage = taskDetail;
                }
                break;
            }
    }
}
//#endregion