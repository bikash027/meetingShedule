
// This function accepts the raw data sent and converts the 
// date strings of each record to date objects
export const convertDateStringtoDate=function(ar){
	for(let i=0;i<ar.length;i++){
		const startDate=ar[i].start;

		let day=startDate.substring(0,2);
		let month=startDate.substring(3,5);
		let year=startDate.substring(6,10);

		day=parseInt(day);
		month=parseInt(month)-1;
		year=parseInt(year);

		ar[i].start=new Date(year,month,day);  //replace date string with date object

		const endDate=ar[i].end;

		day=endDate.substring(0,2);
		month=endDate.substring(3,5);
		year=endDate.substring(6,10);

		day=parseInt(day);
		month=parseInt(month)-1;
		year=parseInt(year);

		ar[i].end=new Date(year,month,day);  //replace date string with date object
	}
}

export const monthMapping=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];


// This function converts date object in each record to a more readable
// format e.g. 27/Sep 
export const formatDate=function(ar){

	return ar.map(function(intern){
		return{
			id: intern.id,
			name: intern.name,
			start: intern.start.getDate()+'/'+monthMapping[intern.start.getMonth()],
			end: intern.end.getDate()+'/'+monthMapping[intern.end.getMonth()]
		}
	})
}

// compares two date objects on the basis of date, month and year
const compare=function(d1,d2){
	if(d1.getFullYear()===d2.getFullYear()){
		if(d1.getMonth()===d2.getMonth()){
			if(d1.getDate()===d2.getDate()){
				return 0;
			}
			else if(d1.getDate()<d2.getDate())
				return -1;
		}
		else if(d1.getMonth()<d2.getMonth())
			return -1;
	}
	else if(d1.getFullYear()<d2.getFullYear())
		return -1;
	return 1;
}

export const binarySearch=function(sortedArray, seekElement){
	let startIndex = 0;
	let endIndex = sortedArray.length - 1;
	while (startIndex <= endIndex) {
    	const middleIndex = startIndex + Math.floor((endIndex - startIndex) / 2);
    	if(compare(seekElement,sortedArray[middleIndex])===0)
    		return middleIndex;
    	if(compare(seekElement,sortedArray[middleIndex])===1)
    		startIndex = middleIndex + 1;
    	else
    		endIndex=middleIndex-1;
    }
    return -1;
}

// returns the range of indices in the dates array given the intern record(interval) 
export const findStartandEndIndex=function(interval,ar){
	return {
		start: binarySearch(ar,interval.start),
		end: binarySearch(ar,interval.end)
	}
}