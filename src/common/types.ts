export type Constructor<T> = new (...args: any[]) => T;
export type CustomElement = Constructor<HTMLElement>;