import './style.css';

const chat = import('./components/pages/chat-page');
const login = import('./components/pages/login-page');
const register = import('./components/pages/register-page');

const root = document.getElementById('root');

const routes = {
    '/': chat,
    '/login': login,
    '/register': register,
};

const navigate = async () => {
    const page = routes[location.pathname];
    if (!page) {
        return;
    }
    page.then(tmpl => {
        root.replaceChildren(tmpl.render({}));
    });
};

window.onpopstate = () => {
    navigate();
}

navigate();
