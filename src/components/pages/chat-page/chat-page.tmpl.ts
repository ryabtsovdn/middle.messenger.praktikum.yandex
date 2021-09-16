export default `
    <main class="chat-page">
        <h1>Здесь будет страница со списком чатов и лентой переписки</h1>
        <h2>Вот ссылки на остальные страницы:</h2>
        <ul>
            <li>{{> atoms-link href="/login" text="Вход"}}</li>
            <li>{{> atoms-link href="/register" text="Регистрация"}}</li>
            <li>{{> atoms-link href="/profile" text="Профиль"}}</li>
            <li>{{> atoms-link href="/404" text="Страница не найдена"}}</li>
            <li>{{> atoms-link href="/500" text="Внутренняя ошибка"}}</li>
        </ul>
    </main>
`;
