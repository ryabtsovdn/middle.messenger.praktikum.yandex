export default `
    <div class="form-field {{className}} {{#if disabled}}form-field_disabled{{/if}}">
        {{> atoms-input className="form-field__input" name=.name type=.type value=.value}}
        <label class="form-field__label" for={{name}}>
            {{label}}
        </label>
    </div>
`;
