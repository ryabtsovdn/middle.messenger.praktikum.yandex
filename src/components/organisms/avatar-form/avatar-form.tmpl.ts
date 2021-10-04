export default `
    <form class="avatar-form" enctype="multipart/form-data">
        <h2 class="avatar-form__title">Загрузите файл</h2>
        {{> molecules-file-field name="avatar" id="avatar-upload"}}
        {{> atoms-button className="avatar-form__button" text="Поменять"}}
    </form>
`;
