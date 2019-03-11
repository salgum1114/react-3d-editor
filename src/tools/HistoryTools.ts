import { EventTools } from '.';
import { ObjectMapper } from '../types/utils';

class HistoryTools {
    updates?: ObjectMapper;
    constructor() {
        this.updates = {};
        EventTools.on('entityupdate', payload => {
            let value = payload.value;
            const entity = payload.entity;
            this.updates[entity.id] = this.updates[entity.id] || {};
            const component = AFRAME.components[payload.component];
            if (component) {
                // if (payload.property) {
                //     this.updates[entity.id][payload.component] =
                //     this.updates[entity.id][payload.component] || {};
                //     value = component.schema[payload.property].stringify(payload.value);
                //     this.updates[entity.id][payload.component][payload.property] = value;
                // } else {
                //     value = component.schema.stringify(payload.value);
                //     this.updates[entity.id][payload.component] = value;
                // }
            }
        });
    }
}


export default HistoryTools;
