import { IStates } from '../components';

export interface ICursorStates {
    cursorFusing: IStates;
    cursorHovering: IStates;
    cursorHovered: IStates;
}

export const states: ICursorStates = {
    cursorFusing: {
        state: 'cursor-fusing',
        description: 'Added when the cursor is fusing on another entity.',
    },
    cursorHovering: {
        state: 'cursor-hovering',
        description: 'Added when the cursor is hovering over another entity.',
    },
    cursorHovered: {
        state: 'cursor-hovered',
        description: 'Added to the intersected entity when the cursor is hovering over it.',
    },
}
