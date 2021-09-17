export default `
    <ul class="messages-list">
        {{#each messages}}
            <li class="messages-list__item">{{> molecules-message message=#this index=#index}}</li>
        {{/each}}
    </ul>
`;
