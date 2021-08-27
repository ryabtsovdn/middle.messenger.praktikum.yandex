export default `
    <form class="profile-form">
        {{> molecules-form-field type=text className=form-field_inline label=Почта name=email value=.user.email disabled=.form.hideSubmit}}
        {{> molecules-form-field type=text className=form-field_inline label=Логин name=login value=.user.login disabled=.form.hideSubmit}}
        {{> molecules-form-field type=text className=form-field_inline label=Имя name=first_name value=.user.firstName disabled=.form.hideSubmit}}
        {{> molecules-form-field type=text className=form-field_inline label=Фамилия name=second_name value=.user.secondName disabled=.form.hideSubmit}}
        {{> molecules-form-field type=text className=form-field_inline label="Имя в чате" name=display_name value=.user.displayName disabled=.form.hideSubmit}}
        {{> molecules-form-field type=text className=form-field_inline label=Телефон name=phone value=.user.phone disabled=.form.hideSubmit}}
        {{#if !form.hideSubmit}}
            {{> atoms-button className=profile-form__button text=Сохранить}}
        {{/if}}
    </form>
`;
