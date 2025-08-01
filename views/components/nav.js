const navbar = document.querySelector('#navbar');

// --- 1. Lógica de renderizado ---

// Objeto que contiene el HTML de cada posible enlace/botón
const navLinks = {
    login: `<a href="/login" class="transition ease-in-out text-white font-bold hover:bg-indigo-800 py-2 px-4 rounded-lg">Login</a>`,
    signup: `<a href="/signup" class="transition ease-in-out text-white font-bold bg-indigo-500 hover:bg-indigo-800 py-2 px-4 rounded-lg">Registro</a>`,
    logout: `<button id="logout-btn" class="transition ease-in-out text-white font-bold bg-indigo-500 hover:bg-indigo-800 py-2 px-4 rounded-lg">Cerrar Sesion</button>`
};

// Función que crea los enlaces para móvil y escritorio
const createLinksHTML = (links) => {
    const linksHTML = links.join('');
    return `
        <!-- version mobile -->
        <svg id="nav-btn-mobile" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10 md:hidden text-white cursor-pointer p-2 rounded-lg">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>
        <div id="menu-mobile" class="bg-slate-900/80 fixed top-16 right-0 left-0 bottom-0 justify-center items-center flex-col gap-4 hidden">
            ${linksHTML}
        </div>
            
        <!-- version de escritorio -->
        <div class="hidden md:flex flex-row gap-4">
            ${linksHTML}
        </div>
    `;
};

// Función principal que renderiza toda la barra de navegación
const renderNavbar = (page) => {
    let linksToRender = [];
    switch (page) {
        case 'home':
            linksToRender = [navLinks.login, navLinks.signup];
            break;
        case 'signup':
            linksToRender = [navLinks.login];
            break;
        case 'login':
            linksToRender = [navLinks.signup];
            break;
        case 'todos':
            linksToRender = [navLinks.logout];
            break;
    }

    navbar.innerHTML = `
        <div class="max-w-7xl h-16 mx-auto flex items-center px-4 justify-between">
            <a href="/" class="font-bold text-sm text-white">TodoApp</a>
            ${createLinksHTML(linksToRender)}
        </div>`;
    
    addNavEventListeners();
};

// --- 2. Lógica de Eventos ---

const handleLogout = async () => {
    try {
        await axios.get('/api/logout');
        window.location.pathname = '/login';
    } catch (error) {
        console.error('Error al cerrar sesión:', error);
    }
};

// Agrega los event listeners necesarios de forma segura
const addNavEventListeners = () => {
    const navBtnMobile = document.querySelector('#nav-btn-mobile');
    const menuMobile = document.querySelector('#menu-mobile');
    const logoutBtn = document.querySelector('#logout-btn'); // Puede ser null

    if (navBtnMobile && menuMobile) {
        navBtnMobile.addEventListener('click', () => {
            const isOpen = !menuMobile.classList.contains('hidden');
            menuMobile.classList.toggle('hidden');
            menuMobile.classList.toggle('flex');
            if (isOpen) {
                navBtnMobile.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />`;
            } else {
                navBtnMobile.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />`;
            }
        });
    }

    // Solo añade el listener para logout si el botón existe en la página
    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogout);
    }
};

// --- 3. Ejecución ---

// Función para determinar en qué página estamos de forma segura
const getPageName = (pathname) => {
    if (pathname === '/') return 'home';
    // Elimina las barras finales para consistencia, ej. /todos/ -> /todos
    const page = pathname.replace(/\/$/, '').split('/').pop();
    return ['signup', 'login', 'todos', 'verify'].includes(page) ? page : 'home';
};

const currentPage = getPageName(window.location.pathname);
renderNavbar(currentPage);