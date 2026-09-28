import React from 'react';
import { CityLocation, UnifiedEvent, CitizenReport, MapLayerSettings, CityId } from '../types';
import { MultiCityMap } from './MultiCityMap';

export interface PuneMapProps {
  locations: CityLocation[];
  events: UnifiedEvent[];
  citizenReports: CitizenReport[];
  selectedLocation: CityLocation | null;
  selectedEvent: UnifiedEvent | null;
  currentCityId?: CityId;
  layers: MapLayerSettings;
  onSelectLocation: (loc: CityLocation) => void;
  onSelectEvent: (event: UnifiedEvent) => void;
  onMapClickCoordinates: (coords: [number, number], defaultLocId?: string) => void;
}

export const PuneMap: React.FC<PuneMapProps> = ({
  locations,
  events,
  citizenReports,
  selectedLocation,
  selectedEvent,
  currentCityId = 'pune',
  layers,
  onSelectLocation,
  onSelectEvent,
  onMapClickCoordinates,
}) => {
  return (
    <MultiCityMap
      locations={locations}
      events={events}
      citizenReports={citizenReports}
      selectedLocation={selectedLocation}
      selectedEvent={selectedEvent}
      currentCityId={currentCityId}
      layers={layers}
      onSelectLocation={onSelectLocation}
      onSelectEvent={onSelectEvent}
      onMapClickCoordinates={onMapClickCoordinates}
    />
  );
};
