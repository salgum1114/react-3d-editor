export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export interface ObjectMapper {
    [key: string]: any;
}

export type Record<K extends string = any, T = any> = {
    [P in K]?: T;
}