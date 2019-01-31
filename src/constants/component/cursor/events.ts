import { IEvents } from '../component';

export interface ICursorEvents {
    click: IEvents;
    fusing: IEvents;
    mousedown: IEvents;
    mouseenter: IEvents;
    mouseleave: IEvents;
    mouseup: IEvents;
}

export const events: ICursorEvents = {
    click: {
        eventName: 'click',
        description: 'Emitted on both cursor and intersected entity if a currently intersected entity is clicked (whether by mouse or by fuse).',
    },
    fusing: {
        eventName: 'fusing',
        description: 'Emitted on both cursor and intersected entity when fuse-based cursor starts counting down.',
    },
    mousedown: {
        eventName: 'mousedown',
        description: 'Emitted on both cursor and intersected entity (if any) on mousedown on the canvas element.',
    },
    mouseenter: {
        eventName: 'mouseenter',
        description: 'Emitted on both cursor and intersected entity (if any) when cursor intersects with an entity.',
    },
    mouseleave: {
        eventName: 'mouseleave',
        description: 'Emitted on both cursor and intersected entity (if any) when cursor no longer intersects with previously intersected entity.',
    },
    mouseup: {
        eventName: 'mouseup',
        description: 'Emitted on both cursor and intersected entity (if any) on mouseup on the canvas element.',
    },
}
