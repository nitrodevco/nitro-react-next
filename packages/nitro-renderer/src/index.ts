import { BrowserAdapter, DOMAdapter, HelloSystem, TextureSource } from 'pixi.js';

HelloSystem.defaultOptions.hello = true;
TextureSource.defaultOptions.scaleMode = 'nearest';
DOMAdapter.set(BrowserAdapter);

export * from './api';
export * from './assets';
export * from './avatar';
export * from './communication';
export * from './DevTools';
export * from './events';
export * from './pixi-proxy';
export * from './room';
export * from './session';
export * from './sound';
export * from './utils';
