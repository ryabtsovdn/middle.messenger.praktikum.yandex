type UUID = string;

type Nullable<T> = T | null;

type ValueOf<T> = T[keyof T];

type UnknownObject = Record<string, unknown>;

type AnyObject = Record<string, any>;

type FormElement = HTMLInputElement | HTMLTextAreaElement;

declare module '*.svg' {
  const content: any;
  export default content;
}
