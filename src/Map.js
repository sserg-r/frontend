import React, { Component } from "react";
// import L from "leaflet";
import kvartals from "./kvartals.json";
import kvartals3857 from "./kvartals3857.json";
// import "leaflet.vectorgrid";

import OlMap from "ol/Map";
import OlView from "ol/View";
import OlLayerTile from "ol/layer/Tile";
import OlSourceXYZ from "ol/source/XYZ";
import OlSourceOSM from "ol/source/OSM";

import {Vector as VectorSource} from 'ol/source';
import {Vector as VectorLayer} from 'ol/layer';

import {useGeographic} from 'ol/proj';
import GeoJSON from 'ol/format/GeoJSON';
import {Fill, Stroke, Style} from 'ol/style';

// import LayerSwitcher from "ol-ext/control"


const style = {
  width: "100%",
  height: "100%"
};

// const options = {  
//     rendererFactory: L.svg.tile,
//     attribution: 'belgosles',
//     maxNativeZoom:21,
//     maxZoom:21,
//     vectorTileLayerStyles: { 
//       sliced:{
        
//         weight: 1,
//         color: 'grey',
//         fillColor: '#9bc2c4',
//         fillOpacity: 1,
//         fill: false
//       }
//      }
// };                     

var ggg=new OlSourceOSM();
ggg.setUrl('https://tile.openstreetmap.de/{z}/{x}/{y}.png');

const vectorSource = new VectorSource({
  features: new GeoJSON().readFeatures(kvartals3857),
});

const vectorLayer = new VectorLayer({
  source: vectorSource, 
  style: new Style({ 
    stroke: new Stroke({
    color: 'grey',
    width: 1
  }),
          })
});



class Map extends Component {
  constructor(props) {
    super(props);
    
    this.state = { center: [3365000, 6730000], zoom: 10 };

    
    this.olmap = new OlMap({
      target: null,
      layers: [
        new OlLayerTile({source: ggg }),
        vectorLayer,

      ],
      view: new OlView({
        center: this.state.center,
        zoom: this.state.zoom
      })
    });
  }

  updateMap() {
    this.olmap.getView().setCenter(this.state.center);
    this.olmap.getView().setZoom(this.state.zoom);
  }

  componentDidMount() {
    this.olmap.setTarget("map");

    // Listen to map changes
    this.olmap.on("moveend", () => {
      let center = this.olmap.getView().getCenter();
      let zoom = this.olmap.getView().getZoom();
      this.setState({ center, zoom });
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    let center = this.olmap.getView().getCenter();
    let zoom = this.olmap.getView().getZoom();
    if (center === nextState.center && zoom === nextState.zoom) return false;
    return true;
  }

  userAction() {
    this.setState({ center: [3343000, 6778000], zoom: 12 });
  }
  

  render() {
    this.updateMap(); // Update map on render?
    return (
      <>
      <div id="map" style={style}/>  
       <button onClick={e => this.userAction()}>setState on click</button>
       </>
    );
  }
}


     

// class Map1 extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { center: [51.6, 30.25], zoom: 10 };
//   }
  
//   componentDidMount() {
//     // create map
//     this.map = L.map("map", {
//       center: this.state.center,
//       zoom: this.state.zoom,
//       maxZoom:21,
//       layers: [
//         L.tileLayer("https://tile.openstreetmap.de/{z}/{x}/{y}.png", {
//           attribution:
//             '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
//         }),
//         L.vectorGrid.slicer(kvartals, options)
//       ]
//     });

//     // add marker
//     this.marker = L.marker(this.props.markerPosition).addTo(this.map);
//   }
//   componentDidUpdate({ markerPosition }) {
//     // check if position has changed
//     if (this.props.markerPosition !== markerPosition) {
//       this.marker.setLatLng(this.props.markerPosition);
//     }

//    }
//   render() {
//     return <div id="map" style={style} />;
//   }
// }

export default Map;
