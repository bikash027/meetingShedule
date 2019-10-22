import React from 'react';
import {formatDate} from '../utils';

// this component renders the data in tabular format

class Table extends React.Component{    
	render(){                           
		let tableBody='wait for a moment';
		if(this.props.tableData!==''){

			tableBody=formatDate(this.props.tableData);   //format the dates

			tableBody=tableBody.map(intern=>{              //make table-rows for each record
				return (<tr key={intern.id}>
							<td className="index">{intern.id}</td>
							<td className="name">{intern.name}</td>
							<td className="date">{intern.start}</td>
							<td className="date">{intern.end}</td>
						</tr>);
			});
		}
		return(
			<div id="table">
				
				<table>
					<tbody>
						<tr>
							<td id="head">intern-assignment</td>
							<td className="date Date">start date</td>
							<td className="date Date">end date</td>
						</tr>
					</tbody>
				</table>
				<table>
					<tbody>
						{tableBody}
					</tbody>
				</table>
			</div>
		);
	}

}
export default Table;