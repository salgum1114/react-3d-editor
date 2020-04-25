import EventTools from './EventTools';
import { EntityTools, InspectorTools, AssetTools } from '.';
import { ObjectMapper } from '../types/utils';
import { getOS } from './UtilTools';

interface IShortcuts {
    default?: ObjectMapper;
    modules?: ObjectMapper;
}

class ShortcutTools {
    enabled: boolean;
    shortcuts: IShortcuts;
    inspector: InspectorTools;

    constructor(inspector: InspectorTools) {
        this.init(inspector);
    }

    init = (inspector: InspectorTools) => {
        this.inspector = inspector;
        this.enabled = false;
        this.shortcuts = {
            default: {},
            modules: {},
        }
    }

    onKeyUp = (event: KeyboardEvent) => {
        if (!this.shouldCaptureKeyEvent(event) || !AFRAME.INSPECTOR.opened) {
            return;
        }
        const keyCode = event.keyCode;
        // h: help
        if (keyCode === 72) {
            EventTools.emit('openhelpmodal');
        }
        // esc: close inspector
        if (keyCode === 27) {
            if (this.inspector.selectedEntity) {
                this.inspector.selectEntity(null);
            }
            if (this.inspector.selectedAsset) {
                this.inspector.selectAsset(null);
            }
        }
        // w: translate
        if (keyCode === 87) {
            EventTools.emit('transformmodechange', 'translate');
        }
        // e: rotate
        if (keyCode === 69) {
            EventTools.emit('transformmodechange', 'rotate');
        }
        // r: scale
        if (keyCode === 82) {
            EventTools.emit('transformmodechange', 'scale');
        }
        // o: transform space
        if (keyCode === 79) {
            EventTools.emit('transformspacechange');
        }
        // g: toggle grid
        if (keyCode === 71) {
            EventTools.emit('togglegrid');
        }
        // m: motion capture
        if (keyCode === 77) {
            EventTools.emit('togglemotioncapture');
        }
        // n: new entity
        if (keyCode === 78) {
            EventTools.emit('entitycreate', { element: 'a-entity', components: {} });
        }
        // backspace & supr: remove selected entity
        if (keyCode === 8 || keyCode === 46) {
            if (AFRAME.INSPECTOR.selectedEntity) {
                EntityTools.removeSelectedEntity();
            } else if (AFRAME.INSPECTOR.selectedAsset) {
                AssetTools.removeSelectedAsset();
            }
        }
        // d: clone selected entity
        if (keyCode === 68) {
            EntityTools.cloneSelectedEntity();
        }
        // f: Focus on selected entity.
        if (keyCode === 70) {
            const selectedEntity = AFRAME.INSPECTOR.selectedEntity;
            if (selectedEntity !== undefined && selectedEntity !== null) {
                EventTools.emit('objectfocus', selectedEntity.object3D);
            }
        }
        if (keyCode === 49) {
            EventTools.emit('cameraperspectivetoggle');
        } else if (keyCode === 50) {
            EventTools.emit('cameraorthographictoggle', 'left');
        } else if (keyCode === 51) {
            EventTools.emit('cameraorthographictoggle', 'right');
        } else if (keyCode === 52) {
            EventTools.emit('cameraorthographictoggle', 'top');
        } else if (keyCode === 53) {
            EventTools.emit('cameraorthographictoggle', 'bottom');
        } else if (keyCode === 54) {
            EventTools.emit('cameraorthographictoggle', 'back');
        } else if (keyCode === 55) {
            EventTools.emit('cameraorthographictoggle', 'front');
        }
        Object.keys(this.shortcuts.modules).forEach(moduleName => {
            const shortcutsModule = this.shortcuts.modules[moduleName];
            if (
                shortcutsModule[keyCode] &&
                (!shortcutsModule[keyCode].mustBeActive ||
                (shortcutsModule[keyCode].mustBeActive &&
                    this.inspector.modules[moduleName].active))
            ) {
                this.shortcuts.modules[moduleName][keyCode].callback();
            }
        })
    }

    onKeyDown = (event: KeyboardEvent) => {
        if (!this.shouldCaptureKeyEvent(event)) {
            return;
        }
        if (
            (event.ctrlKey && getOS() === 'windows') ||
            (event.metaKey && getOS() === 'macos')
        ) {
            if (
                this.inspector.selectedEntity &&
                document.activeElement.tagName !== 'INPUT'
            ) {
                // x: cut selected entity
                if (event.keyCode === 88) {
                    this.inspector.entityToCopy = this.inspector.selectedEntity;
                    EntityTools.removeSelectedEntity();
                }
                // c: copy selected entity
                if (event.keyCode === 67) {
                    this.inspector.entityToCopy = this.inspector.selectedEntity;
                }
                // v: paste copied entity
                if (event.keyCode === 86) {
                    EntityTools.cloneEntity(this.inspector.entityToCopy);
                }
            }
            // s: focus search input
            if (event.keyCode === 83) {
                event.preventDefault();
                event.stopPropagation();
                document.getElementById('filter').focus();
            }
        }
        // º: toggle sidebars visibility
        if (event.keyCode === 48) {
            EventTools.emit('togglesidebar', { which: 'all' });
            event.preventDefault();
            event.stopPropagation();
        }
    }

    enable = () => {
        if (this.enabled) {
            this.disable();
        }
        window.addEventListener('keydown', this.onKeyDown, false);
        window.addEventListener('keyup', this.onKeyUp, false);
        this.enabled = true;
    }

    disable = () => {
        window.removeEventListener('keydown', this.onKeyDown);
        window.removeEventListener('keyup', this.onKeyUp);
        this.enabled = false;
    }

    shouldCaptureKeyEvent = (event: any) => {
        if (event.metaKey) {
          return false;
        }
        return (
            event.target.closest('#cameraToolbar') ||
            (event.target.tagName !== 'INPUT' && event.target.tagName !== 'TEXTAREA')
        );
    }

    checkModuleShortcutCollision = (keyCode, moduleName, mustBeActive): boolean => {
        if (
            this.shortcuts.modules[moduleName] &&
            this.shortcuts.modules[moduleName][keyCode]
        ) {
            console.warn(
                'Keycode <%s> already registered as shorcut within the same module',
                keyCode,
            );
            return true;
        }
        return false;
    }

    registerModuleShortcut = (keyCode, callback, moduleName, mustBeActive) => {
        if (this.checkModuleShortcutCollision(keyCode, moduleName, mustBeActive)) {
            return;
        }
        if (!this.shortcuts.modules[moduleName]) {
            this.shortcuts.modules[moduleName] = {};
        }
        if (mustBeActive !== false) {
            mustBeActive = true;
        }
        this.shortcuts.modules[moduleName][keyCode] = {
            callback,
            mustBeActive,
        };
    }

}

export default ShortcutTools;
