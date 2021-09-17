export default `
    <form class="search-form">
        {{> atoms-input className="search-form__input" id="search" name="search" type="text" value=.value}}
        <label class="search-form__label" for="search">Поиск</label>
    </form>
`;
