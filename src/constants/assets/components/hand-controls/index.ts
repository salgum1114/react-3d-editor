import { IComponentDescriptor } from '../components';

const handControls: IComponentDescriptor = {
    isSingleProp: true,
    schema: {
        type: 'string',
        oneOf: ['left', 'right'],
        default: 'left',
    },
};

export default handControls;
