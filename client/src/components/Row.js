import React from 'react';
import {findStartandEndIndex} from '../utils';

// this component renders a red colored div to represent the 
// period for which the intern is busy

class Row extends React.Component{
	render(){

		const ar=this.props.ar;
		const indexRange=findStartandEndIndex(this.props.interval,ar);  //get range of indices
		if(indexRange.start===-1||indexRange.end===-1){                 //from range of dates
			return (<p></p>) ;
		}
		
		const styleDiv={
			width:(indexRange.end-indexRange.start+1)*30+'px',
			marginLeft:indexRange.start*30+'px'
		}
		const styleP={
			marginLeft:(indexRange.end-indexRange.start+1)*30+10+'px'
		}
		return(

			<div style={styleDiv} className="row">
				<p style={styleP}>{this.props.interval.name}</p>
			</div>

		);
	}
}
export default Row;