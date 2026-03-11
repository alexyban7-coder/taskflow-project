// --- MODO OSCURO ---
const darkToggle = document.getElementById('dark-toggle');
const themeIcon = document.getElementById('theme-icon');

const toggleTheme = () => {
    document.documentElement.classList.toggle('dark');
    const isDark = document.documentElement.classList.contains('dark');
    themeIcon.innerText = isDark ? '☀️' : '🌙';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
};

if (localStorage.getItem('theme') === 'dark') {
    document.documentElement.classList.add('dark');
    themeIcon.innerText = '☀️';
}
darkToggle.addEventListener('click', toggleTheme);

// --- LÓGICA DE TAREAS ---
const taskForm = document.getElementById('task-form');
const taskList = document.getElementById('task-list');

taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const text = document.getElementById('task-input').value;
    const category = document.getElementById('category-select').value;
    const priority = document.getElementById('priority-select').value;

    // Colores según prioridad
    const priorityColors = {
        alta: "border-l-red-500",
        media: "border-l-yellow-500",
        baja: "border-l-green-500"
    };

    const taskCard = document.createElement('div');
    taskCard.className = `flex items-center justify-between p-4 bg-white dark:bg-slate-800 rounded-xl shadow-sm border-l-4 ${priorityColors[priority]} dark:border-y-slate-700 dark:border-r-slate-700 transition-all`;
    
    taskCard.innerHTML = `
        <div class="flex flex-col">
            <span class="text-gray-800 dark:text-gray-100 font-medium">${text}</span>
            <div class="flex gap-2 mt-1">
                <span class="text-[10px] uppercase font-bold text-blue-500 tracking-tighter">${category}</span>
                <span class="text-[10px] uppercase font-bold text-gray-400">•</span>
                <span class="text-[10px] uppercase font-bold text-gray-400">${priority}</span>
            </div>
        </div>
        <button class="delete-btn text-gray-300 hover:text-red-500 transition-colors p-2">
            <svg xmlns="http://www.w3.org" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
        </button>
    `;

    taskCard.querySelector('.delete-btn').addEventListener('click', () => {
        taskCard.classList.add('opacity-0', 'scale-95');
        setTimeout(() => taskCard.remove(), 200);
    });

    taskList.prepend(taskCard);
    taskForm.reset();
});


