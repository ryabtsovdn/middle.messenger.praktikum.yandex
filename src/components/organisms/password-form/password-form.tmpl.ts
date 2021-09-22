export default `
    <form class="profile-form">
        {{> molecules-form-field type="password" className="form-field_inline validate" label="Старый пароль" name="oldPassword"}}
        {{> molecules-form-field type="password" className="form-field_inline validate" label="Новый пароль" name="newPassword"}}
        {{> molecules-form-field type="password" className="form-field_inline validate" label="Подтвердите новый пароль" name="newPasswordConfirm"}}
        {{#if !form.hideSubmit}}
            {{> atoms-button className="profile-form__button" text="Сохранить"}}
        {{/if}}
    </form>
`;
