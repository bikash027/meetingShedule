import React from 'react';
import {monthMapping} from '../utils';

//this component is for rendering the months on top of the chart

class Months extends React.Component{
	
	// this function returns an array of months 
	// corresponding to each date on the chart
	getMonths(){                                        
		const dates=this.props.dates;                   
		let month=dates[0].getMonth();                  
		let firstDate=dates[0].getDate();
		const months=[];
		for(let i=1;i<dates.length;i++){
			if(dates[i].getMonth()!==month){
				months.push(
						{	
							month: monthMapping[month],
							period: dates[i-1].getDate()-firstDate+1,
							year: dates[i-1].getFullYear()
						}
					);
				month=dates[i].getMonth();
				firstDate=1;
			}
		}
		months.push(
					{	
						month: monthMapping[month],
						period: dates[dates.length-1].getDate()-firstDate+1,
						year: dates[dates.length-1].getFullYear()
					}
				);
		return months;
	}

	render(){
		
		const months=this.getMonths();		
		const monthElements=months.map(month=>{
			const style={
				width:month.period*30+'px',
			}

			return <p className="month" style={style}>{month.month} {month.year}</p>
		});
		return(
			<div>
				{monthElements}
			</div>
		);
	}
}
export default Months;