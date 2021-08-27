export default `
    <form class="profile-form">
        {{> molecules-form-field type=text className=form-field_inline label=Почта name=email disabled}}
        {{> molecules-form-field type=text className=form-field_inline label=Логин name=login disabled}}
        {{> molecules-form-field type=text className=form-field_inline label=Имя name=first_name disabled}}
        {{> molecules-form-field type=text className=form-field_inline label=Фамилия name=second_name disabled}}
        {{> molecules-form-field type=text className=form-field_inline label="Имя в чате" name=display_name disabled}}
        {{> molecules-form-field type=text className=form-field_inline label=Телефон name=phone disabled}}
        {{#if !form.hideSubmit}}
            {{> atoms-button className=profile-form__button text=Сохранить}}
        {{/if}}
    </form>
`;
