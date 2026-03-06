/* 1. SELECCIÓN DE ELEMENTOS DEL DOM */
const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const categorySelect = document.getElementById('category-select');
const prioritySelect = document.getElementById('priority-select');
const taskList = document.getElementById('task-list');
const categoryButtons = document.querySelectorAll('.ventas-box li');

// Array principal de tareas (se carga de LocalStorage al iniciar)
let tasks = JSON.parse(localStorage.getItem('taskflow_tasks')) || [];

/* 2. FUNCIONES PRINCIPALES */

// Cargar tareas al iniciar la aplicación (Punto 5)
document.addEventListener('DOMContentLoaded', () => {
    renderTasks();
});

// Función para añadir tareas (Punto 2)
taskForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const newTask = {
        id: Date.now(), // ID único basado en tiempo
        text: taskInput.value,
        category: categorySelect.value,
        priority: prioritySelect.value
    };

    tasks.push(newTask);
    updateAppState();
    taskForm.reset(); // Limpia el formulario
});

// Función para eliminar tareas (Punto 3)
window.deleteTask = (id) => {
    tasks = tasks.filter(task => task.id !== id);
    updateAppState();
};

// Guardar en LocalStorage y Refrescar Vista (Punto 4)
function updateAppState() {
    localStorage.setItem('taskflow_tasks', JSON.stringify(tasks));
    renderTasks();
}

/* 3. RENDERIZADO (DIBUJAR EN EL HTML) */

function renderTasks(filter = 'all') {
    taskList.innerHTML = '';

    // Filtrar tareas según la categoría seleccionada en el aside
    const filteredTasks = filter === 'all' 
        ? tasks 
        : tasks.filter(t => t.category === filter);

    filteredTasks.forEach(task => {
        const taskDiv = document.createElement('div');
        taskDiv.className = 'task-item';
        
        taskDiv.innerHTML = `
            <div class="task-conten">
                <span class="TITle">${task.text}</span>
                <span class="category">${task.category}</span>
                <span class="priority" style="border-left: 4px solid ${getPriorityColor(task.priority)}">
                    ${task.priority}
                </span>
            </div>
            <button class="btn-delete" onclick="deleteTask(${task.id})">Eliminar</button>
        `;
        taskList.appendChild(taskDiv);
    });
}

// Colores visuales para las prioridades
function getPriorityColor(prio) {
    switch(prio) {
        case 'alta': return '#ff4d4d';
        case 'media': return '#ffbd33';
        case 'baja': return '#2ecc71';
        default: return '#00a8e8';
    }
}

/* 4. LÓGICA DE LOS FILTROS (SIDEBAR) */

categoryButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        // Cambiar estado visual del botón activo
        categoryButtons.forEach(li => li.classList.remove('active'));
        btn.classList.add('active');

        // Filtrar
        const selectedFilter = btn.getAttribute('data-filter');
        renderTasks(selectedFilter);
    });
});

