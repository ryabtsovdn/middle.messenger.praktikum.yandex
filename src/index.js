import * as login from './components/pages/login-page';
import './style.css';

const root = document.getElementById('root');

root.append(login.render({}));
