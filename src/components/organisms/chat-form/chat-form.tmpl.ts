export default `
    <form class="chat-form">
        {{> atoms-input className="chat-form__input" id="message" name="message" type="text" value=.value}}
        <label class="chat-form__label" for="message">Сообщение</label>
        {{> atoms-button className="button--arrow chat-from__button" text=""}}
    </form>
`;
