import './App.css';
import React from 'react';

const styles={
  li: {
    display: 'flex',
    minWidth: '25vh',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '.5rem 1rem',
    border: '1px solid #ccc',
    borderRadius: '4px',
    marginBottom: '.5rem',
    fontSize: 'calc(3px + 2vmin)',
    boxShadow: '10px 5px 5px black',    
    margin: '0.2em 0em 0.2em 0em',
  },
  div: {
    backgroundColor: '#707a7d',      
  }
}


class MapLayer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visib: 'none',
    };
  }
   render() {    
    return (
      <div>  
        <span>
        <input type='checkbox'/>
          {this.props.a.name}
      </span>      
        <button onClick={() => {
          this.setState({ visib: (this.state.visib==='none') ? 'block':'none' });          
        }          
          }>&#9776;</button>
        <div className='controlBox' style={{...styles.div, ...{display: this.state.visib}}}>
          <GetControls a={this.props.a} />
        </div>

      </div>
    );
  }
}

function GetControls(a){
  return <div >
    <p>controll elements will be here</p>
    <input type="date" id="start" name="start date"></input>
    <input type="date" id="end" name="end date" value={Date().now}></input>
  </div>
}

function MapListItems(lst){    
  return lst.map((a, i) => <li path={a['path']} key={i}  style={styles.li}>    
    <MapLayer a={a}/>   
    </li>)    
}

function MapList(lst, cls){
  let listitems=MapListItems(lst)
  return <div className={cls}><ul>{listitems}</ul></div>
}



export default MapList
        
        
