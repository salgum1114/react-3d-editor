import { EventEmitter } from 'events';

class EventTools {
    emitter: EventEmitter;

    constructor() {
        this.emitter = new EventEmitter();
        this.emitter.setMaxListeners(0);
    }

    on(...args: any[]) {
        this.emitter.on.apply(this.emitter, args);
        return this;
    }

    emit(...args: any[]) {
        this.emitter.emit.apply(this.emitter, args);
        return this;
    }

    removeListener(...args: any[]) {
        this.emitter.removeListener.apply(this.emitter, args);
        return this;
    }
}

export default new EventTools();
