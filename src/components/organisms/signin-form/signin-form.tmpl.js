export default `
    <form class="auth-form">
        <h2 class="auth-form__title">Вход</h2>
        {{> molecules-form-field type=text name=login label=Логин}}
        {{> molecules-form-field type=password name=password label=Пароль}}
        <div class="auth-form__buttons signin-form__buttons">
            {{> atoms-button className=auth-form__button text=Войти onClick=.page.onSubmit}}
            {{> atoms-link href=/register text="Нет аккаунта?" className=auth-form__link}}
        </div>
    </form>
`;
