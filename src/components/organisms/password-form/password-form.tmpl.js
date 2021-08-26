export default `
    <form class="profile-form">
        {{> molecules-form-field type=password className=form-field_inline label="Старый пароль" name=oldPassword}}
        {{> molecules-form-field type=password className=form-field_inline label="Новый пароль" name=newPassword}}
        {{> molecules-form-field type=password className=form-field_inline label="Подтвердите новый пароль" name=newPassword_confirm}}
        {{#if !form.hideSubmit}}
            {{> atoms-button className=profile-form__button text=Сохранить}}
        {{/if}}
    </form>
`;
