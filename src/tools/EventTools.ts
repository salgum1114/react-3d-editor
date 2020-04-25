import { EventEmitter } from 'events';
import { EventType } from '../constants';

class EventTools {
    emitter: EventEmitter;

    constructor() {
        this.emitter = new EventEmitter();
        this.emitter.setMaxListeners(0);
    }

    on(type: EventType, callback?: (payload?: any) => any) {
        this.emitter.on.apply(this.emitter, [type, callback]);
        return this;
    }

    emit(type: EventType, payload?: any) {
        this.emitter.emit.apply(this.emitter, [type, payload]);
        return this;
    }

    removeListener(type: EventType, payload?: any) {
        this.emitter.removeListener.apply(this.emitter, [type, payload]);
        return this;
    }
}

export default new EventTools();
