export default `
    <form class="avatar-form">
        <h2 class="avatar-form__title">Загрузите файл</h2>
        {{> molecules-file-field name=avatar id=avatar-upload}}
        {{> atoms-button className=avatar-form__button text=Поменять onClick=.page.onSave}}
    </form>
`;
