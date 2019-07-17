import debounce from 'lodash/debounce';
import { Entity, DetailEvent } from 'aframe';

import { EventTools, InspectorTools } from '.';

export interface IRaycaster {
    el?: Entity;
    enable?(): void;
    disable?(): void;
}

class RaycasterTools {
    inspector?: InspectorTools;
    mouseCursor?: Entity;
    onDownPosition?: THREE.Vector2;
    onUpPosition?: THREE.Vector2;
    onDoubleClickPosition?: THREE.Vector2;

    constructor(inspector?: InspectorTools) {
        this.inspector = inspector;
        this.onDownPosition = new AFRAME.THREE.Vector2();
        this.onUpPosition = new AFRAME.THREE.Vector2();
        this.onDoubleClickPosition = new AFRAME.THREE.Vector2();
    }

    init = (inspector?: InspectorTools) => {
        // Use cursor="rayOrigin: mouse".
        const mouseCursor = document.createElement('a-entity');
        mouseCursor.setAttribute('id', 'aframeInspectorMouseCursor');
        mouseCursor.setAttribute('cursor', 'rayOrigin', 'mouse');
        mouseCursor.setAttribute('data-aframe-inspector', 'true');
        mouseCursor.setAttribute('raycaster', {
            interval: 100,
            objects: 'a-scene :not([data-aframe-inspector])',
        });
        this.mouseCursor = mouseCursor;

        // Only visible objects.
        const raycaster = mouseCursor.components.raycaster;
        const refreshObjects = raycaster.refreshObjects;
        const overrideRefresh = () => {
            refreshObjects.call(raycaster);
            const objects = raycaster.objects;
            raycaster.objects = objects.filter(node => {
                while (node) {
                    if (!node.visible) { return false; }
                    node = node.parent;
                }
                return true;
            });
        };
        raycaster.refreshObjects = overrideRefresh;

        inspector.sceneEl.appendChild(mouseCursor);
        inspector.cursor = mouseCursor;

        inspector.sceneEl.addEventListener(
            'child-attached',
            debounce(() => {
                mouseCursor.components.raycaster.refreshObjects();
            }, 250),
        );

        mouseCursor.addEventListener('click', this.onClick);
        mouseCursor.addEventListener('mouseenter', this.onMouseEnter);
        mouseCursor.addEventListener('mouseleave', this.onMouseLeave);
        inspector.container.addEventListener('mousedown', this.onMouseDown);
        inspector.container.addEventListener('mouseup', this.onMouseUp);
        inspector.container.addEventListener('dblclick', this.onDoubleClick);

        inspector.sceneEl.canvas.addEventListener('mouseleave', () => {
            setTimeout(() => {
                EventTools.emit('raycastermouseleave', null);
            });
        });

        return {
            el: mouseCursor,
            enable: () => {
                mouseCursor.setAttribute('raycaster', 'enabled', true);
            },
            disable: () => {
                mouseCursor.setAttribute('raycaster', 'enabled', false);
            },
        };
    }

    getMousePosition(dom: HTMLElement, x: number, y: number) {
        const rect = dom.getBoundingClientRect();
        return [(x - rect.left) / rect.width, (y - rect.top) / rect.height];
    }

    onClick = (event: DetailEvent<Event>) => {
        // Check to make sure not dragging.
        const DRAG_THRESHOLD = 0.03;
        if (this.onDownPosition.distanceTo(this.onUpPosition) >= DRAG_THRESHOLD) {
            return;
        }
        this.inspector.selectEntity(event.detail.intersectedEl);
    }

    onMouseEnter = (event: DetailEvent<Event>) => {
        EventTools.emit('raycastermouseenter', this.mouseCursor.components.cursor.intersectedEl);
    }

    onMouseLeave = (event: DetailEvent<Event>) => {
        EventTools.emit('raycastermouseleave', this.mouseCursor.components.cursor.intersectedEl);
    }

    onMouseDown = (event: MouseEvent) => {
        if (event instanceof CustomEvent) {
            return;
        }
        event.preventDefault();
        const array = this.getMousePosition(
            this.inspector.container,
            event.clientX,
            event.clientY,
        );
        this.onDownPosition.fromArray(array);
    }

    onMouseUp = (event: MouseEvent) => {
        if (event instanceof CustomEvent) {
            return;
        }
        event.preventDefault();
        const array = this.getMousePosition(
            this.inspector.container,
            event.clientX,
            event.clientY,
        );
        this.onUpPosition.fromArray(array);
    }

    onDoubleClick = (event: MouseEvent) => {
        const array = this.getMousePosition(
            this.inspector.container,
            event.clientX,
            event.clientY,
        );
        this.onDoubleClickPosition.fromArray(array);
        const intersectedEl = this.mouseCursor.components.cursor.intersectedEl;
        if (!intersectedEl) {
            return;
        }
        EventTools.emit('objectfocus', intersectedEl.object3D);
    }

    onTouchStart = (event: TouchEvent) => {
        const touch = event.changedTouches[0];
        const array = this.getMousePosition(
            this.inspector.container,
            touch.clientX,
            touch.clientY,
        );
        this.onDownPosition.fromArray(array);
    }

    onTouchEnd = (event: TouchEvent) => {
        const touch = event.changedTouches[0];
        const array = this.getMousePosition(
          this.inspector.container,
          touch.clientX,
          touch.clientY,
        );
        this.onUpPosition.fromArray(array);
    }
}

export default RaycasterTools;
