const chat = import('./components/pages/chat-page');
const login = import('./components/pages/login-page');
const register = import('./components/pages/register-page');
const internalError = import('./components/pages/500');
const notFound = import('./components/pages/404');

const root = document.getElementById('root');

const routes = {
    '/': chat,
    '/login': login,
    '/register': register,
    '/500': internalError,
    '/404': notFound,
};

const navigate = async () => {
    const page = routes[location.pathname] || notFound;
    page.then(tmpl => {
        root.replaceChildren(tmpl.render({}));
    });
};

window.onpopstate = () => {
    navigate();
}

navigate();
