// --- SELECTORES ---
const taskForm = document.getElementById('task-form');
const taskList = document.getElementById('task-list');
const darkToggle = document.getElementById('dark-toggle');
const themeIcon = document.getElementById('theme-icon');
const filterBtns = document.querySelectorAll('.filter-btn');

let filtroActual = 'all';

// --- 1. MODO OSCURO (LocalStorage) ---
if (localStorage.getItem('theme') === 'dark') {
    document.documentElement.classList.add('dark');
    themeIcon.innerText = '☀️';
}

darkToggle.addEventListener('click', () => {
    document.documentElement.classList.toggle('dark');
    const isDark = document.documentElement.classList.contains('dark');
    themeIcon.innerText = isDark ? '☀️' : '🌙';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

// --- 2. GESTIÓN DE DATOS ---
function guardarTareas() {
    const tareas = [];
    document.querySelectorAll('.task-card').forEach(card => {
        tareas.push({
            texto: card.querySelector('.task-text').innerText,
            categoria: card.getAttribute('data-category'),
            prioridad: card.getAttribute('data-priority')
        });
    });
    localStorage.setItem('mis_tareas_v2', JSON.stringify(tareas));
}

function cargarTareas() {
    const datos = localStorage.getItem('mis_tareas_v2');
    if (datos) {
        JSON.parse(datos).reverse().forEach(t => renderizarTarea(t.texto, t.categoria, t.prioridad));
    }
}

// --- 3. FILTRADO DINÁMICO ---
function aplicarFiltro(categoria) {
    filtroActual = categoria;
    
    filterBtns.forEach(btn => {
        if (btn.getAttribute('data-filter') === categoria) {
            btn.classList.add('text-blue-600', 'dark:text-blue-400', 'border-b-2', 'border-blue-600');
            btn.classList.remove('text-gray-500', 'dark:text-gray-400');
        } else {
            btn.classList.remove('text-blue-600', 'dark:text-blue-400', 'border-b-2', 'border-blue-600');
            btn.classList.add('text-gray-500', 'dark:text-gray-400');
        }
    });

    document.querySelectorAll('.task-card').forEach(card => {
        const cat = card.getAttribute('data-category');
        card.style.display = (categoria === 'all' || cat === categoria) ? 'flex' : 'none';
    });
}

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => aplicarFiltro(btn.getAttribute('data-filter')));
});

// --- 4. RENDERIZADO ---
function renderizarTarea(text, category, priority) {
    const colors = { alta: "border-l-red-500", media: "border-l-yellow-500", baja: "border-l-green-500" };
    const card = document.createElement('div');
    
    card.setAttribute('data-category', category);
    card.setAttribute('data-priority', priority);
    card.className = `task-card flex items-center justify-between p-4 bg-white dark:bg-slate-800 rounded-xl shadow-sm border-l-4 ${colors[priority]} dark:border-y-slate-700 dark:border-r-slate-700 transition-all mb-3`;
    
    if (filtroActual !== 'all' && category !== filtroActual) card.style.display = 'none';

    card.innerHTML = `
        <div class="flex flex-col">
            <span class="task-text text-gray-800 dark:text-gray-100 font-medium">${text}</span>
            <div class="flex gap-2 mt-1 text-[10px] font-bold uppercase tracking-wider">
                <span class="text-blue-500">${category}</span>
                <span class="text-gray-300 dark:text-slate-600">•</span>
                <span class="text-gray-400 dark:text-slate-500">${priority}</span>
            </div>
        </div>
        <button class="del-btn text-gray-300 hover:text-red-500 transition-all p-2">
            🗑️
        </button>
    `;

    card.querySelector('.del-btn').addEventListener('click', () => {
        card.remove();
        guardarTareas();
    });

    taskList.prepend(card);
}

taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = document.getElementById('task-input').value;
    const cat = document.getElementById('category-select').value;
    const prio = document.getElementById('priority-select').value;

    renderizarTarea(text, cat, prio);
    guardarTareas();
    taskForm.reset();
});

document.addEventListener('DOMContentLoaded', cargarTareas);




