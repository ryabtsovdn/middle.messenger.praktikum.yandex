export default `
    <main class="profile-page">
        <aside class="profile-page__aside">
            {{> atoms-link href="/" className="profile-page__back" text=""}}
        </aside>
        <article class="profile-page__content">
            {{> organisms-avatar className="profile-page__avatar" user=.user}}
            {{#if !state password}}
                {{> organisms-profile-form user=.user events=.form.events hideSubmit=.hideSubmit}}
            {{/if}}
            {{#if state password}}
                {{> organisms-password-form user=.user events=.form.events}}
            {{/if}}
            {{#if state profile}}
                <div class="profile-page__links">
                    {{> atoms-link href="/profile/edit" className="profile-page__link" text="Изменить данные"}}
                    {{> atoms-link href="/profile/password" className="profile-page__link" text="Изменить пароль"}}
                    {{> atoms-link href="/" className="profile-page__link link_danger" text="Выйти"}}
                </div>
            {{/if}}
            {{#if state avatar}}
                {{> templates-modal className="profile-page__avatar-modal" &content="organisms-avatar-form" .content=.form}}
            {{/if}}
        </article>
    </main>
`;
