function loadFromLocalStorage(localStorageName) {
    if (typeof(localStorageName) === 'string') {
        let data = JSON.parse(localStorage.getItem(localStorageName));
        if (data) {
            return data;
        }

        return [];
    } else
        throw new Error("Couldn't get data from local storage");
}

function saveToLocalStorage(localStorageName, data) {
    if (typeof(localStorageName) === "string") {
        if (data) {
            localStorage.setItem(localStorageName, JSON.stringify(data));
        }
    } else
        throw new Error("Couldn't save to local storage'");
}
const pageName = ["task-form", "myTask", "task-detail"]
const [taskForm, myTask, taskDetail] = pageName;