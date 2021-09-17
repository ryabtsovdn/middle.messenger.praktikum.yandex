export default `
    <form class="auth-form">
        <h2 class="auth-form__title">Вход</h2>
        {{> molecules-form-field className="validate" type="text" name="login" label="Логин"}}
        {{> molecules-form-field className="validate" type="password" name="password" label="Пароль"}}
        <div class="auth-form__buttons signin-form__buttons">
            {{> atoms-button className="auth-form__button" text="Войти"}}
            {{> atoms-link href="/register" text="Нет аккаунта?" className="auth-form__link"}}
        </div>
    </form>
`;
