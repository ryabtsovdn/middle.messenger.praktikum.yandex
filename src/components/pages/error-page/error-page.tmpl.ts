export default `
    <main class="error-page">
        <h1 class="error-page__code">{{code}}</h1>
        <h2 class="error-page__message">{{message}}</h2>
        {{> atoms-link href="/" className="error-page__back" text="Назад к чатам"}}
    </main>
`;
