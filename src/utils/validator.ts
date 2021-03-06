interface IValidationRule {
  min?: number;
  max?: number;
  required?: boolean;
  match?: RegExp;
  desc?: string;
}

interface IValidatorOptions {
  rules: Record<string, IValidationRule>;
  onError?: (element: FormElement, error: string) => void;
  onSuccess?: (element: FormElement) => void;
}

export class Validator {
  static DEFAULT = {
    NAME: {
      match: /^(?!\s\W)[A-ZА-Я][A-Za-zА-Яа-я-]+$/,
      desc: 'Может содержать только буквы и знак -',
    },
    LOGIN: {
      required: true,
      min: 3,
      max: 20,
      match: /^(?=\D)(?!\s)[a-z\d_-]+$/i,
      desc: 'Может содержать только буквы, цифры и знаки -_',
    },
    EMAIL: {
      match:
        /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i,
    },
    PASSWORD: {
      required: true,
      min: 8,
      max: 40,
      match: /^(?=.*[A-Z])(?=.*\d).*$/,
      desc: 'Должна быть хотя бы одна заглавная буква и цифра',
    },
    PHONE: {
      min: 10,
      max: 15,
      match: /^[+]?\d+$/,
      desc: 'Может начинаться с плюса и содержит только цифры',
    },
    NONEMPTY: {
      required: true,
    },
  };

  _rules: Record<string, IValidationRule>;
  onError?: (element: FormElement, error: string) => void;
  onSuccess?: (element: FormElement) => void;

  constructor(options: IValidatorOptions) {
    this._rules = options.rules;
    this.onError = options.onError;
    this.onSuccess = options.onSuccess;
  }

  _getError(params: {
    rule: IValidationRule;
    type: string;
    value: string;
  }): string {
    const {type, value, rule} = params;
    const data = rule[type as keyof IValidationRule];
    let err = '';
    switch (type) {
      case 'required':
        if (!value) {
          err = 'Поле обязательно для заполнения';
        }
        break;
      case 'min':
        if (data && value.length < data) {
          err = `Длина должна быть больше ${data}`;
        }
        break;
      case 'max':
        if (data && value.length > data) {
          err = `Длина должна быть меньше ${data}`;
        }
        break;
      case 'match':
        if (!(data as RegExp).test(value)) {
          err = rule.desc || 'Неверный формат';
        }
        break;
    }
    return err;
  }

  _onError(element: Element, err: string): void {
    element.classList.add('validate--invalid');

    const errLabel = element.querySelector('.validate__error');
    if (errLabel) {
      errLabel.textContent = err;
    }
  }

  _onSuccess(element: Element): void {
    element.classList.remove('validate--invalid');
  }

  validateForm(
    form: HTMLFormElement,
    selector = '.form-field__input'
  ): boolean {
    const formInputs = form.querySelectorAll(
      selector
    ) as NodeListOf<FormElement>;

    return Array.from(formInputs)
      .map(target => this.validate(target))
      .every(v => v);
  }

  validate(target: FormElement): boolean {
    const element = target.closest('.validate');
    if (!element) {
      return true;
    }

    const value = target.value;
    const rule = this._rules[target.name];

    let isValid = true;
    let error = '';
    for (const type of Object.keys(rule)) {
      error = this._getError({rule, type, value});

      if (error) {
        isValid = false;
        break;
      }
    }

    if (!isValid) {
      this._onError(element, error);
    } else {
      this._onSuccess(element);
    }

    return isValid;
  }
}
