import { createAction, props } from '@ngrx/store';

export const setMapCenter = createAction(
  '[Map] Set Map Center',
  props<{ lat: number; lng: number }>()
);
