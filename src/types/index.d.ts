type UUID = string;

type Nullable<T> = T | null;

type UnknownObject = Record<string, unknown>;

type AnyObject = Record<string, any>;

declare module '*.svg' {
  const content: any;
  export default content;
}
