import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as MapActions from '../../actions/map.action';
import { Observable } from 'rxjs';
import { MapState } from '../../reducers/map.reducer';
import mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-map',
  template: `<div id="map" style="width: 100%; height: 500px;"></div>`,
  styles: [],
})
export class MapComponent implements OnInit {
  map: mapboxgl.Map | undefined;
  center$: Observable<{ lat: number; lng: number }>;

  constructor(private store: Store<{ map: MapState }>) {
    this.center$ = this.store.select('map', 'center');
  }

  ngOnInit(): void {
    mapboxgl.accessToken = 'MAPBOX_ACCESS_TOKEN'; // currently absent since it's a service that require cc info
    this.initializeMap();

    // Subscribe to the map center from the store
    this.center$.subscribe((center) => {
      if (this.map) {
        this.map.setCenter([center.lng, center.lat]);
      }
    });
  }

  initializeMap(): void {
    this.map = new mapboxgl.Map({
      container: 'map',
      style:
        'https://api.maptiler.com/maps/streets/style.json?key=CNtldwIiTvffxFVmYKRQ',
      center: [0, 0], // Initial position [lng, lat]
      zoom: 2,
    });

    // Add a marker at a specific location
    const marker = new mapboxgl.Marker()
      .setLngLat([0, 0]) // Marker position [lng, lat]
      .addTo(this.map);

    // Add click event to update store with new center
    this.map.on('click', (event) => {
      const { lng, lat } = event.lngLat;
      this.store.dispatch(MapActions.setMapCenter({ lat, lng }));
      marker.setLngLat([lng, lat]); // Move marker to clicked position
    });
  }
}
