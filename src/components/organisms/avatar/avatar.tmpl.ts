export default `
    <a href="/settings/avatar" class="avatar {{className}}">
        <div class="avatar__img">
            <img src="{{user.avatar}}">
            <div class="avatar__overlay">
                <span>Поменять аватар</span>
            </div>
        </div>
        <p class="avatar__name">
            {{user.displayName}}
        </p>
    </a>
`;
