import React, { useState } from 'react';
import 'leaflet/dist/leaflet.css';

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Circle,
  CircleMarker,
  Polyline,
  Polygon,
  Rectangle,
  Tooltip,
} from 'react-leaflet';

import MarkerClusterGroup from 'react-leaflet-markercluster';

const center = [59.280757, 17.972577];

const styles = {
  Line: {
    hovered: {
      color: 'blue',
      weight: 10,
    },
    unhovered: {
      color: 'black',
      dashArray: [4],
      weight: 3,
    },
  },
};

const StyleSwitcher = (event, type, mode) => {
  var style = styles[type]?.[mode];
  if (!event) return style;

  event.target.setStyle(style);
};

const FeatureTypes = {
  Outline: ({ feature }) => {
    var { properties } = feature;
    return (
      <Polygon
        pathOptions={{ color: properties.color }}
        positions={feature.geometry.coordinates}
      >
        <Tooltip>{properties.short_description}</Tooltip>
      </Polygon>
    );
  },

  Line: ({ feature }) => {
    var { properties } = feature;
    return (
      <Polyline
        eventHandlers={{
          click: (e) => {},
          mouseover: (e) => StyleSwitcher(e, 'Line', 'hovered'),
          mouseout: (e) => StyleSwitcher(e, 'Line', 'unhovered'),
        }}
        pathOptions={StyleSwitcher(null, 'Line', 'unhovered')}
        positions={feature.geometry.coordinates}
      >
        <Tooltip>{properties.short_description}</Tooltip>
      </Polyline>
    );
  },

  Marker: ({ feature }) => {
    var { properties } = feature;
    return (
      <Marker position={feature.geometry.coordinates}>
        <Popup>{properties.short_description}</Popup>
        <Tooltip>{properties.short_description}</Tooltip>
      </Marker>
    );
  },
};

function PopulateFeatures({ features, filters }) {
  console.log({ features });
  // do filtering
  // var featuresToShow = features.filter(
  //   (f) => f.properties.kmlength > 8 && f.properties.kmlength < 12
  // );
  var featuresToShow = features;

  var OutlineGroup = featuresToShow.filter(
    (feature) => feature?.properties?.shape?.type == 'Outline'
  );
  var LineGroup = featuresToShow.filter(
    (feature) => feature?.properties?.shape?.type == 'Line'
  );
  var MarkerGroup = featuresToShow.filter(
    (feature) => feature?.properties?.shape?.type == 'Marker'
  );

  featuresToShow = [...OutlineGroup, ...LineGroup, ...MarkerGroup];

  console.log({ featuresToShow });
  return (
    <>
      {featuresToShow.map((feature, i) => {
        const SelectedFeature = FeatureTypes[feature?.properties?.shape?.type];
        if (!SelectedFeature) {
          return null;
        }
        return <SelectedFeature key={'sf' + i} feature={feature} />;
      })}
    </>
  );
}

var PreProcessGeodata = (features) => {
  return features.map((f, i) => {
    // get length
    var feature = turf.feature(f.geometry);
    feature.properties = f.properties;
    feature.properties.kmlength = turf.length(feature, { units: 'kilometers' });

    feature = turf.flip(feature);

    return feature;
  });
};

const Map = ({ geodata }) => {
  // we do the intial processing of the coords

  return (
    <MapContainer center={center} zoom={13}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      <Marker position={center}>
        <Popup>Starting point (usually)</Popup>
      </Marker>
      <MarkerClusterGroup>
        <PopulateFeatures features={geodata} />
      </MarkerClusterGroup>
    </MapContainer>
  );
};

export default Map;
export { PreProcessGeodata, Map };
