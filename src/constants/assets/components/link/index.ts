import { IComponentDescriptor } from '../components';

const link: IComponentDescriptor = {
    isSingleProp: false,
    name: 'link',
    schema: {
        backgroundColor: {
            type: 'color',
            default: 'red',
        },
        borderColor: {
            type: 'color',
            default: 'white',
        },
        highlighted: {
            type: 'boolean',
            default: false,
        },
        highlightedColor: {
            type: 'color',
            default: '#24caff',
        },
        href: {
            type: 'string',
        },
        image: {
            type: 'asset',
        },
        on: {
            type: 'string',
            default: 'click',
        },
        peekMode: {
            type: 'boolean',
            default: false,
        },
        title: {
            type: 'string',
        },
        titleColor: {
            type: 'color',
            default: 'white',
        },
        visualAspectEnabled: {
            type: 'boolean',
            default: false,
        },
    },
};

export default link;
