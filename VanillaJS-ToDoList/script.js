class Task {
    static #nextId = 1;
    #id; 
    #status; 

    constructor({ title, notes, id = null, status = "to-do", createdAt = Date.now()}) {
        this.#id = id ?? Task.#nextId++; 
        this.title = title; 
        this.notes = notes; 
        this.#status = status; 
        this.createdAt = createdAt; 
    }

    set status(v) { return this.#status = v }; 

    get status() { return this.#status }; 
    get id() { return this.#id }; 

    toJSON() {
        return {
            id: this.#id, 
            title: this.title, 
            notes: this.notes, 
            status: this.#status, 
            createdAt: this.createdAt
        }
    }

    static fromJSON(obj) {
        return new Task({
            id: obj.id, 
            title: obj.title, 
            notes: obj.notes, 
            status: obj.status, 
            createdAt: obj.createdAt
        }); 
    }

    static syncNextId(arr) {
        const maxId = arr.reduce((m, t) => Math.max(m, t.id ?? 0), 0); 
        Task.#nextId = maxId + 1; 
    }

    createTaskCard() {
        const taskCard = document.createElement("div"); 
        taskCard.classList.add("task_card", "shadow"); 

        taskCard.dataset.id = this.#id; 

        const titleElement = document.createElement("p"); 
        titleElement.textContent = `${this.title}`; 
        taskCard.appendChild(titleElement); 

        const notesElement = document.createElement("p"); 
        notesElement.textContent = `${this.notes}`; 
        taskCard.appendChild(notesElement); 

        const deleteBtn = document.createElement("button"); 
        deleteBtn.textContent = "Delete"; 
        deleteBtn.type = "button"; 
        deleteBtn.classList.add("btn", "btn-danger", "delete_btn"); 
        taskCard.appendChild(deleteBtn); 

        return taskCard; 
    }
}

class List {
    constructor() {
        const raw = JSON.parse(localStorage.getItem("tasks") ?? "[]"); 
        this.tasks = raw.map(Task.fromJSON); 
    
        Task.syncNextId(this.tasks); 

        this.toDoCcontainer = document.getElementById("to_do_container"); 
        this.task_container = document.getElementById("task_container"); 
        this.task_container.textContent = `There are 0 tasks`; 
        
        this.toDoCcontainer.addEventListener('click', (e) => {
            const del = e.target.closest(".delete_btn"); 
            if (!del) return; 

            const card = del.closest(".task_card"); 
            if (!card) return; 

            const taskId = Number(card.dataset.id); 
            this.deleteCard(taskId); 
        });

        this.renderTasks(); 
    }

    addTask(task) {
        this.tasks.unshift(task); 
        this.storeTask(); 
        this.task_container.textContent = `There are ${this.tasks.length} tasks`; 
        this.renderTasks(); 
    }

    storeTask() {
        localStorage.setItem("tasks", JSON.stringify(this.tasks)); 
    }

    deleteCard(id) {
        this.tasks = this.tasks.filter(task => task.id !== id); 
        this.storeTask(); 
        this.task_container.textContent = `There are ${this.tasks.length} tasks`; 
        this.renderTasks(); 
    }

    renderTasks() {
        this.toDoCcontainer.innerHTML = ''; 

        this.tasks.forEach(task => {
            const task_card = task.createTaskCard(); 
            this.toDoCcontainer.appendChild(task_card); 
        })
    }
}
const list = new List(); 

const form = document.getElementById("form"); 
form.addEventListener('submit', (event) => {
    event.preventDefault(); 

    const title = document.getElementById("task_title").value; 
    const notes = document.getElementById("task_notes").value; 

    list.addTask(new Task({ title, notes })); 
}); 