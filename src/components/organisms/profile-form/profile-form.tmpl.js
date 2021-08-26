export default `
    <form class="profile-form">
        {{> molecules-form-field type=text className=form-field_inline label=Почта name=email}}
        {{> molecules-form-field type=text className=form-field_inline label=Логин name=login}}
        {{> molecules-form-field type=text className=form-field_inline label=Имя name=first_name}}
        {{> molecules-form-field type=text className=form-field_inline label=Фамилия name=second_name}}
        {{> molecules-form-field type=text className=form-field_inline label="Имя в чате" name=display_name}}
        {{> molecules-form-field type=text className=form-field_inline label=Телефон name=phone}}
        {{#if !form.hideSubmit}}
            {{> atoms-button className=profile-form__button text=Сохранить}}
        {{/if}}
    </form>
`;
