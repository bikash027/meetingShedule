import React from 'react';
import Column from './Column';
import Row from './Row';
import FreeSlots from './FreeSlots';
import Months from './Months';
class Chart extends React.Component{
	constructor(){
		super();
		this.dates=[];
		this.min='';
		this.max='';
		this.state={}
	}

	// this method determines the range of dates the chart should contain
	findRangeofDates(){                           
		let min=new Date(2030,1,1);                
		let max=new Date(1990,1,1);
		const ar=this.props.data;
		for(let i=0;i<ar.length;i++){
			if(ar[i].start<min)
				min=ar[i].start;
			if(ar[i].end>max)
				max=ar[i].end;
		}
		this.min=min;
		this.max=max;
	}

	// this method makes an array of dates ranging from the earliest
	// date to the latest date found in the data
	setDates(){
		this.dates=[];
		let min=new Date(this.min);
		while(min<=this.max){
			this.dates.push(new Date(min));
			min.setDate(min.getDate()+1);
		}
		this.dates.push(new Date(min));
	}
	render(){
		this.findRangeofDates();
		this.setDates();
		const dataLength=this.props.data.length;

		const columns=this.dates.map(date=>{
			return <Column size={dataLength} date={date}/>;
		})
		const data=Array.from(this.props.data);
		const rows=data.map(intern=>{
			return <Row interval={intern} ar={this.dates}/>;
		});
		const style={
			width:30*this.dates.length+'px'
		}
		return(
				<div id="chart">
					<div style={style} id="canvas">
						<Months dates={this.dates}/>
						{columns}

						<FreeSlots data={data} ar={this.dates}/>

						<div id="row-container">
							{rows}
						</div>
					</div>
				</div>
		);
	}

}
export default Chart;