import { FormItemProps } from 'antd/lib/form/FormItem';
import { ValidationRule } from 'antd/lib/form';

export type ComponentType = 'input'
| 'select'
| 'checkbox'
| 'switch'
| 'textarea'
;

export interface ISchema extends FormItemProps {
    key: string;
    icon?: string;
    type: ComponentType;
    initialValue?: any;
    span?: number;
    items?: ISchema[];
    min?: number;
    max?: number;
    rules?: ValidationRule[];
}

export interface IFormSchema {
    [key: string]: ISchema;
}
