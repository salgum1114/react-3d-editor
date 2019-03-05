import { InspectorTools } from '../tools';

declare global {
    namespace AFRAME {
        let INSPECTOR: InspectorTools;
    }
}