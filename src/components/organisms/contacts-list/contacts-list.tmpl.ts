export default `
    <ul class="contacts-list">
        {{#each contacts}}
            <li class="contacts-list__item">{{> molecules-contact contact=#this index=#index active=.active onClick=.setActive}}</li>
        {{/each}}
    </ul>
`;
