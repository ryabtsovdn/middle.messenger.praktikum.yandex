export default `
    <ul class="chats-list">
        {{#each chats}}
            <li class="chats-list__item">
                {{> molecules-chat chat=#this index=#index active=.active onClick=.toggleActive}}
            </li>
        {{/each}}
    </ul>
`;
