import { IComponentDescriptor } from '../components';

const vrModeUi: IComponentDescriptor = {
    isSingleProp: false,
    dependencies: ['canvas'],
    schema: {
        enabled: {
            type: 'boolean',
            default: true,
        },
        enterVRButton: {
            type: 'selector',
        },
    },
};

export default vrModeUi;
