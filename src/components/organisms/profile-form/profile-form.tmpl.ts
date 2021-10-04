export default `
    <form class="profile-form">
        {{> molecules-form-field type="text" className="form-field_inline validate" label="Почта" name="email" value=.user.email disabled=.form.hideSubmit}}
        {{> molecules-form-field type="text" className="form-field_inline validate" label="Логин" name="login" value=.user.login disabled=.form.hideSubmit}}
        {{> molecules-form-field type="text" className="form-field_inline validate" label="Имя" name="first_name" value=.user.first_name disabled=.form.hideSubmit}}
        {{> molecules-form-field type="text" className="form-field_inline validate" label="Фамилия" name="second_name" value=.user.second_name disabled=.form.hideSubmit}}
        {{> molecules-form-field type="text" className="form-field_inline validate" label="Имя в чате" name="display_name" value=.user.display_name disabled=.form.hideSubmit}}
        {{> molecules-form-field type="text" className="form-field_inline validate" label="Телефон" name="phone" value=.user.phone disabled=.form.hideSubmit}}
        {{#if !hideSubmit}}
            {{> atoms-button className="profile-form__button" text="Сохранить"}}
        {{/if}}
    </form>
`;
