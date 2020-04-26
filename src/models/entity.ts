import { Entity } from 'aframe';

export interface IEntity {
	id?: string | number;
	key?: string | number;
	type?: string;
	title?: string | boolean;
	icon?: string;
	parentKey?: string | number;
	entity?: Entity;
	children?: IEntity[];
	mixin?: string;
}

export interface IDetailEntity {
	component: string;
	entity: Entity;
	property: string;
	value: any;
}
