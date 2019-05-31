import React, {Component} from 'react'

var colors = ['red','orange','yellow','green','aqua','blue','purple']

var listStyle  = {
    float: 'left',
    'listStyle': 'none'
}
var btnStyle = {
    width: '1em',
    height: '1em'
}
function ColorSelect(props){
    return (
        <ul style={{margin:'0',padding:'0'}}>
            {
                colors.map(color =>(
                    <li style={listStyle} key={color}>
                        <button onClick={()=> props.onChange(color)} style={{ ...btnStyle,backgroundColor: color}}>
                        </button>
                    </li>
                ))
            }
        </ul>
    
    )

}
export default ColorSelect