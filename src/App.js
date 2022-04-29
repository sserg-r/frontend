import './App.css';
import React from "react";
import Map from './Map';
import MapList from './LayerList';




// Here pull data from server
const lst=[{'name':'hot points', 'path':'http:/pnx_one'}, {'name':'burnt areas', 'path':'http:/pnx_two'}]

let ll=[51.89, 29.97]
let zoom=10;
class App extends React.Component {
  state = { markerPosition: { lat: ll[0], lng: ll[1] }, zoom:zoom};
  moveMarker = () => {
    const { lat, lng } = this.state.markerPosition;
    const zoom=this.state.zoom;
    this.setState({
      markerPosition: {
        lat: lat + 0.0001,
        lng: lng + 0.0001,
         
      }
    });
  };
  render() {
    const { markerPosition } = this.state;
    return (
      <div className="App">
        <header className="App-header"> 
          {MapList(lst, 'leftTopMenu')}
          
          {/* <div className='MapContainer'>
            <Map />
          </div> */}
          <div className='MapContainer'>
            <Map markerPosition={markerPosition} />
            <div> Zoom: {zoom},  Current Position: lat: {markerPosition.lat}, lng: {markerPosition.lng}</div>
              <button
                onClick={this.moveMarker}
              >
                Move marker
              </button> 
            </div>       
      </header>
      </div>
    );
  }
}


// const App = () => (
//   <div>
//     <Map />
//   </div>
// );


export default App;
