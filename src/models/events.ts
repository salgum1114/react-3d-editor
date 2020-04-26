export type EventType =
	| EntityEventType
	| ObjectEventType
	| CameraEventType
	| AssetEventType
	| 'helperremove'
	| 'raycastermouseenter'
	| 'raycastermouseleave'
	| 'inspectortoggle'
	| 'transformmodechange'
	| 'transformspacechange'
	| 'transformspacechanged'
	| 'entitytransformed'
	| 'refreshsidebarobject3d'
	| 'componentadd'
	| 'componentremove'
	| 'windowresize'
	| 'gridvisibilitychanged'
	| 'togglegrid'
	| 'geometrychanged'
	| 'inspectorcleared'
	| 'snapchanged'
	| 'sceneloaded'
	| 'openhelpmodal';

export type EntityEventType = 'entitycreate' | 'entityupdate' | 'entityclone' | 'entityselect';

export type ObjectEventType = 'objectselect' | 'objectfocus' | 'objectremove';

export type CameraEventType =
	| 'cameraperspectivetoggle'
	| 'cameraorthographictoggle'
	| 'cameraperspectivetoggle'
	| 'cameraorthographictoggle'
	| 'cameratoggle';

export type AssetEventType = 'assetsimagesload' | 'assetselect' | 'assetcreate' | 'assetupdate' | 'assetremove';
