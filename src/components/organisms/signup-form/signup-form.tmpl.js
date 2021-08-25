export default `
    <form class="auth-form">
        <h2 class="auth-form__title">Регистрация</h2>
        {{> molecules-form-field type=text name=email label=Почта}}
        {{> molecules-form-field type=text name=login label=Логин}}
        {{> molecules-form-field type=text name=first_name label=Имя}}
        {{> molecules-form-field type=text name=second_name label=Фамилия}}
        {{> molecules-form-field type=tel name=phone label=Телефон}}
        {{> molecules-form-field type=password name=password label=Пароль}}
        {{> molecules-form-field type=password name=password_confirm label="Подтвердить пароль"}}
        <div class="auth-form__buttons signup-form__buttons">
            {{> atoms-button className=auth-form__button text=Зарегистрироваться}}
            {{> atoms-link text="Войти" className=auth-form__link href=/login}}
        </div>
    </form>
`;
