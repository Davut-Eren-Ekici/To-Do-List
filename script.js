const tasks = [];

const savedTasks = localStorage.getItem("tasks");
const parsedTasks = JSON.parse(savedTasks);




const taskList = document.querySelector("#taskList");
const AddBtn = document.querySelector("#AddBtn");
const taskInput = document.querySelector("#taskInput");
const completedList = document.querySelector("#completedList");

tasks.push(...parsedTasks);
renderTasks();

AddBtn.addEventListener("click", function(){
    if(taskInput.value.trim() == ""){
        return;
    }

    const task ={
        text: taskInput.value,
        completed: false
        
    };
    tasks.push(task);
    localStorage.setItem("tasks",JSON.stringify(tasks));
    renderTasks();
    taskInput.value = "";
    
    

});

function renderTasks(){
    taskList.innerHTML = "";
    completedList.innerHTML = "";

    for (let i=0;i<tasks.length;i++){

        const li =  document.createElement("li");
       

        if (tasks[i].completed) {

         li.classList.add("completed");
        completedList.appendChild(li);

        } else {

         taskList.appendChild(li);

        }

        const completeBtn = document.createElement("button");
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent="sil";

        if (tasks[i].completed) {
            completeBtn.textContent = "✓";
        } else {
           completeBtn.textContent = "○";
        }
        
        completeBtn.addEventListener("click", function(){
            tasks[i].completed = !tasks[i].completed;
            localStorage.setItem("tasks", JSON.stringify(tasks));
            renderTasks();
        });

        deleteBtn.addEventListener("click",function(){
            tasks.splice(i,1);
            localStorage.setItem("tasks",JSON.stringify(tasks));
            renderTasks();
        });
        
        li.appendChild(completeBtn);
        li.appendChild(deleteBtn);
        

        const taskText = document.createElement("span");
        taskText.textContent = tasks[i].text;
       li.appendChild(taskText);
       

    }
}