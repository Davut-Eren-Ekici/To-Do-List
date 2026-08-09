const tasks = [];

console.log(tasks);

const taskList = document.querySelector("#taskList");
const AddBtn = document.querySelector("#AddBtn");
const taskInput = document.querySelector("#taskInput");

AddBtn.addEventListener("click", function(){
    const task ={
        text: taskInput.value,
        completed: false
        
    };
    renderTasks();
    tasks.push(task);
    
    const li = document.createElement("li");
    li.textContent = task.text;
    taskList.appendChild(li);
    taskInput.value = "";

});

function renderTasks(){
    for (let i=0;i<tasks.length;i++){
        const li =  document.createElement("li");
        li.textContent = tasks[i].text;
        taskList.appendChild(li);
    }
}