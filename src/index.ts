import avatar from 'url:../static/img/default-user.svg';

const chat = import('./components/pages/chat-page');
const login = import('./components/pages/login-page');
const register = import('./components/pages/register-page');
const profile = import('./components/pages/profile-page');
const error = import('./components/pages/error-page');

const root = document.getElementById('root');

const user = {
  email: 'email@yandex.ru',
  login: 'ivanivanov',
  firstName: 'Иван',
  secondName: 'Иванов',
  displayName: 'Иван',
  phone: '+7 (999) 999 99 99',
  avatar,
};

const onSubmit = function (ev: Event) {
  ev.preventDefault();
  navigate('/');
};

const onSave = function (ev: Event) {
  ev.preventDefault();
  navigate('/profile');
};

interface IPage {
  render: (ctx: Record<string, unknown>) => Element;
}

const routes: Record<string, [Promise<IPage>, Record<string, unknown>]> = {
  '/': [chat, {}],
  '/login': [login, {page: {onSubmit}}],
  '/register': [register, {page: {onSubmit}}],
  '/profile': [
    profile,
    {page: {state: 'profile'}, form: {hideSubmit: true}, user},
  ],
  '/profile/edit': [profile, {page: {state: 'edit', onSave}, user}],
  '/profile/password': [profile, {page: {state: 'password', onSave}, user}],
  '/profile/avatar': [profile, {page: {state: 'avatar', onSave}, user}],
  '/500': [error, {code: 500, message: 'Мы уже фиксим'}],
  '/404': [error, {code: 404, message: 'Не туда попали'}],
};

const navigate = async (path?: string) => {
  const [page, ctx] = routes[path || location.pathname] || routes['/404'];
  page.then(tmpl => {
    root.innerHTML = '';
    root.append(tmpl.render(ctx));
  });
};

window.onpopstate = () => {
  navigate();
};

navigate();
