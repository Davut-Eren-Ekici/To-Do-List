const tasks = [];

const savedTasks = localStorage.getItem("tasks");
const parsedTasks = savedTasks ? JSON.parse(savedTasks) : [];




const taskList = document.querySelector("#taskList");
const AddBtn = document.querySelector("#AddBtn");
const taskInput = document.querySelector("#taskInput");
const completedList = document.querySelector("#completedList");
const totalCount = document.querySelector("#totalCount");
const completedCount = document.querySelector("#completedCount");
const searchInput = document.querySelector("#searchInput");

tasks.push(...parsedTasks);
renderTasks();

AddBtn.addEventListener("click", function(){
    if(taskInput.value.trim() === ""){
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

searchInput.addEventListener("input",function(){
    renderTasks();
});

function renderTasks(){
    totalCount.textContent=`Toplam: ${tasks.length}`;
    const searchText = searchInput.value.toLowerCase();
    const filteredTasks = tasks
    .map((task, index) => ({ task, index }))
    .filter(item => item.task.text.toLowerCase().includes(searchText));

    const completedTasks = tasks.filter(task => task.completed === true);
    completedCount.textContent = `Tamamlanan: ${completedTasks.length}`;

    taskList.innerHTML = "";
    completedList.innerHTML = "";

    for (let i=0;i< filteredTasks.length;i++){
        const taskIndex = filteredTasks[i].index;
        const li =  document.createElement("li");
        
        if (filteredTasks[i].task.completed) {

         li.classList.add("completed");
        completedList.appendChild(li);

        } else {

         taskList.appendChild(li);

        }

        const completeBtn = document.createElement("button");
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent="sil";

        if (filteredTasks[i].task.completed) {
            completeBtn.textContent = "✓";
        } else {
           completeBtn.textContent = "○";
        }
        
        completeBtn.addEventListener("click", function(){
           tasks[taskIndex].completed = !tasks[taskIndex].completed;
            localStorage.setItem("tasks", JSON.stringify(tasks));
            renderTasks();
        });

        deleteBtn.addEventListener("click",function(){
            tasks.splice(taskIndex, 1);
            localStorage.setItem("tasks",JSON.stringify(tasks));
            renderTasks();
        });
        
        li.appendChild(completeBtn);
        li.appendChild(deleteBtn);
        

        const taskText = document.createElement("span");
        taskText.textContent = filteredTasks[i].task.text;
       li.appendChild(taskText);
       

    }
}