export default `
    <div class="form-field">
        {{> atoms-input className=form-field__input}}
        <label class="form-field__label" for={{name}}>
            {{label}}
        </label>
    </div>
`;