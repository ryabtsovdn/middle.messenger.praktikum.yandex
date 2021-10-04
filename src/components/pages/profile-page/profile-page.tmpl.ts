export default `
    <main class="profile-page">
        <aside class="profile-page__aside">
            {{> atoms-link href="/messenger" className="profile-page__back" text=""}}
        </aside>
        <article class="profile-page__content">
            {{> organisms-avatar className="profile-page__avatar" user=.user}}
            {{#if !state password}}
                {{> organisms-profile-form user=.user hideSubmit=.hideSubmit}}
            {{/if}}
            {{#if state password}}
                {{> organisms-password-form user=.user }}
            {{/if}}
            {{#if state profile}}
                <div class="profile-page__links">
                    {{> atoms-link href="/settings/edit" className="profile-page__link" text="Изменить данные"}}
                    {{> atoms-link href="/settings/password" className="profile-page__link" text="Изменить пароль"}}
                    {{> atoms-link href="/" className="profile-page__link link_danger" text="Выйти" onClick=.onLogout}}
                </div>
            {{/if}}
            {{#if state avatar}}
                {{> templates-modal className="profile-page__avatar-modal" &content="organisms-avatar-form"}}
            {{/if}}
        </article>
    </main>
`;
