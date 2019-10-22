import React from 'react';
import axios from 'axios';
import Table from './components/Table';
import Chart from './components/Chart';
import {convertDateStringtoDate} from './utils';

class App extends React.Component {
	constructor(props){
		super(props);
		this.t='';
		this.state={
			tableData:''
		}
	}
	/////// This method is responsible for fetching data every 10s////////
	componentDidMount(){
		this.getData();
		this.t=setInterval(()=>{
			this.getData();
		},10000);
	}
	/////// this method is responsible for disposing of the timer////////
	componentWillUnmount(){
		clearInterval(this.t);
	}
	////// this method decides whether an update is required or not////////
	shouldComponentUpdate(nextProps,nextState){
		const next=nextState.tableData;
		const current=this.state.tableData;
		if(next.length!==current.length)
			return true;

		for(let i=0;i<next.length;i++){
			if(next[i].name===current[i].name)
				if(next[i].start===current[i].start)
					if(next[i].end===current[i].end)
						return false;
		}
		return true;
	}
	/////// this method fetches data from server/////////
	getData(){
		axios.get("/api")
		.then((res)=>{
			const ar=res.data;
			convertDateStringtoDate(ar);
			this.setState({
				tableData:ar
			});
		})
		.catch(function(err){
			console.log(err);
		});
	}
	////// this method renders the table and the chart///////
	render(){
		return (
			<div style={{width:"100%"}}>
				<Table tableData={this.state.tableData}/>
				<Chart data={this.state.tableData}/>
			</div>
		);
	}
}

export default App;
