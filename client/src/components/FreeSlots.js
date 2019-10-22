import React from 'react';
import {findStartandEndIndex} from '../utils';

//this component decides which columns should be highlighted

class FreeSlots extends React.Component{
	constructor(props){
		super(props);
		this.state={
			display:'none'
		}
	}

	// callback for click event on button
	showFreeSlots(){
		this.setState({display:'block'});
	}

	// this method applies the "difference table" method to find
	// dates on which no intern is busy 
	findSlots(){
		const slots=[];
		const data=this.props.data;
		const ar=this.props.ar;
		const differenceArray=[];
		for(let i=0;i<ar.length;i++){
			differenceArray.push(0);
		}
		for(let i=0;i<data.length;i++){
			const indexRange=findStartandEndIndex(data[i],ar);
			differenceArray[indexRange.start]++;
			if(indexRange.end<ar.length-1)
				differenceArray[indexRange.end+1]--;
		}
		for(let i=1;i<ar.length;i++){
			differenceArray[i]+=differenceArray[i-1];
		}
		for(let i=0;i<ar.length;i++){
			if(differenceArray[i]===0)
				slots.push(i);
		}
		return slots;
	}

	render(){
		
		const slots=this.findSlots();

		const columns=slots.map(slot=>{
			const style={
				left:slot*30+'px',
				height:this.props.data.length*40+'px',
				display:this.state.display
			}
			return <div style={style}  className='slot-column'></div>
		})
		
		return(
			<div className="free-slots">
				{columns}
				<button className="btn btn-primary" onClick={()=>this.showFreeSlots()}>show free slots</button>
			</div>

		);
	}
}

				// 
export default FreeSlots;