import React from 'react';

// This component returns a column with the date at the top

class Column extends React.Component{
	render(){
		const date=this.props.date;
		let backgroundColor="white";

		if(date.getDay()===0 || date.getDay()===6)  // if day is sunday or saturday the color
			backgroundColor='#e1e1e1';              // is changed to grey

		const style={
			height:this.props.size*40+'px',
			backgroundColor:backgroundColor,
			borderTop:"1px solid black"
		}
		return(
			<div className="column">

				<p>{this.props.date.getDate()}</p>

				<div style={style}></div>
			</div>
		);
	}
}
export default Column;