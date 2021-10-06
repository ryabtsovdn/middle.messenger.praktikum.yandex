export default `
    <div class="chat" data-index={{index}}>
        <div class="chat__avatar">
            <img src="{{chat.avatar}}">
        </div>
        <div class="chat__info">
            <p class="chat__name">{{chat.title}}</p>
            <p class="chat__last">{{lastMessage}}</p>
        </div>
    </div>
`;
