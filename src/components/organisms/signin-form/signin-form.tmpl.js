export default `
    <form class="signin-form">
        <h2 class="signin-form__title">Вход</h2>
        {{> molecules-form-field type=text name=login label=Login}}
        {{> molecules-form-field type=password name=password label=Password}}
        <div class="signin-form__buttons">
            {{> atoms-button className=signin-form__button text=Войти}}
            {{> atoms-link text="Нет аккаунта?" className=signin-form__link}}
        </div>
    </form>
`;
