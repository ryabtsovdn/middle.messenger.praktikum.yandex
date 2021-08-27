export default `
    <div class="profile-page">
        <aside class="profile-page__aside">
            {{> atoms-link href="/" className="profile-page__back" text=""}}
        </aside>
        <main class="profile-page__content">
            {{> organisms-avatar className=profile-page__avatar}}
            {{#if !page.state password}}
                {{> organisms-profile-form}}
            {{/if}}
            {{#if page.state password}}
                {{> organisms-password-form}}
            {{/if}}
            {{#if page.state profile}}
                <div class="profile-page__links">
                    {{> atoms-link href="/profile/edit" className="profile-page__link" text="Изменить данные"}}
                    {{> atoms-link href="/profile/password" className="profile-page__link" text="Изменить пароль"}}
                    {{> atoms-link href="/" className="profile-page__link link_danger" text="Выйти"}}
                </div>
            {{/if}}
            {{#if page.state avatar}}
                {{> templates-modal className=profile-page__avatar-modal &content=organisms-avatar-form}}
            {{/if}}
        </main>
    </div>
`;
