export interface IProperties {
    property: string,
    description?: string,
    defaultValue?: any;
}

export interface IValues {
    type: string;
    description?: string;
}

export interface IEvents {
    eventName: string;
    description?: string;
}

export interface IStates {
    state: string;
    description?: string;
}

export interface IValue {
    value: any;
    description?: string;
}
