export default `
    <main class="chat-page">
        <aside class="chat-page__sidebar">
            <div class="chat-page__profile">
                {{> atoms-link href="/settings" text="Профиль >"}}
            </div>
            {{> organisms-search-form}}
            {{> organisms-chats-list chats=.chats active=.active setActive=.setActive}}
        </aside>
        <section class="chat-page__main {{#if activeChat}}chat-page__main--active{{/if}}">
            {{#if !activeChat}}
                <p class="chat-page__choose">Выберите чат чтобы отправить сообщение</p>
                <br>
                <h2>Ссылки на остальные страницы:</h2>
                <ul>
                    <li>{{> atoms-link href="/login" text="Вход"}}</li>
                    <li>{{> atoms-link href="/sign-up" text="Регистрация"}}</li>
                    <li>{{> atoms-link href="/settings" text="Профиль"}}</li>
                    <li>{{> atoms-link href="/404" text="Страница не найдена"}}</li>
                    <li>{{> atoms-link href="/500" text="Внутренняя ошибка"}}</li>
                </ul>
            {{/if}}
            {{#if activeChat}}
                {{> organisms-messages-list messages=.messages}}
                {{> organisms-chat-form send=.send}}
            {{/if}}
        </section>
    </main>
`;
