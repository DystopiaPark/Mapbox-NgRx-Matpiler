import { createReducer, on } from '@ngrx/store';
import * as MapActions from '../actions/map.action';

export interface MapState {
  center: { lat: number; lng: number };
}

export const initialState: MapState = {
  center: { lat: 0, lng: 0 },
};

export const mapReducer = createReducer(
  initialState,
  on(MapActions.setMapCenter, (state, { lat, lng }) => ({
    ...state,
    center: { lat, lng },
  }))
);
