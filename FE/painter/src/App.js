import React,{Component} from 'react';
import PixelGrid from './pixelGrid';
import ColorSelect from'./ColorSelect';
import './App.css';
import io from "socket.io-client";

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      pixelData: null
    }
  }
  componentDidMount(){
    this.socket = io('ws://localhost:3005')
    this.socket.on('pixel-data',(data)=>{
      console.log(data)
      this.setState({
        pixelData: data
      })
    })
    this.socket.on('update-dot',(info)=>{
      this.setState({
          pixelData:this.state.pixelData.map((row,rowidx) =>{
            if(rowidx === info.row){
              return row.map((color,colidx)=>{
                if(colidx === info.col){
                  return info.color
                } else {
                  return color
                }
              })
            } else {
              return row
            }
          })
      })
    })

  }
  handlePixelClick = (row,col)=>{
    this.socket.emit('draw-dot',{
      row,
      col,
      color: this.state.currentColor
    })
    
  }//传回后端
  changeCurrentColor = (color) =>{
    console.log(color)
    this.setState({
      currentColor: color
    })
  }
  render() {
    return (
        <div>
          <PixelGrid onPixelClick={this.handlePixelClick} pixels ={this.state.pixelData}/>
          <ColorSelect onChange = {this.changeCurrentColor} color={this.state.currentColor}/>   
        </div>
    );
  }
}

export default App;
