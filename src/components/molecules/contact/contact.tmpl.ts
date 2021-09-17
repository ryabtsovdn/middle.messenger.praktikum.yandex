export default `
    <div class="contact" data-index={{index}}>
        <div class="contact__avatar">
            <img src="{{contact.avatar}}">
        </div>
        <div class="contact__info">
            <p class="contact__name">{{contact.name}}</p>
            <p class="contact__last">{{contact.lastMessage.text}}</p>
        </div>
    </div>
`;
