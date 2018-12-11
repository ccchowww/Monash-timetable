import React, { Component } from 'react';
import Moment from 'react-moment';
import moment from 'moment';

class WeekView extends Component {
	render() {
		const today = moment().format('D/M/YYYY') //uncomment this to use today 
		// const today = '19/11/2018' //comment this to stop using static date
		const rawJson = this.props.ttData;
		const sortedJson = rawJson.sort((a,b) => {
			a = moment(a.timeStart, 'HH:mm');
			b = moment(b.timeStart, 'HH:mm');
			return a - b;
		});

		const allDays = []
		console.log(sortedJson)

		for (var classType = 0; classType < sortedJson.length; classType++) {
			let dateArray = sortedJson[classType].dateArray
			let classDay = sortedJson[classType].classDay
			for (var x = 0; x < dateArray.length; x++) {
				let rangeArr = [];
				let thisYear = moment().year();
				let nextYear = moment().add(1, 'years').format('YYYY')

				for (var i = 0; i < dateArray[x].length; i++) { // remove this loop to stop adding january in by hard code
					if (moment(dateArray[x][i],'D/M').month() == 0 ) {					
						dateArray[x][i] = dateArray[x][i] + '/' + nextYear 
					}else{
						dateArray[x][i] = dateArray[x][i] + '/' + thisYear
					}
				}

				let firstDay = moment(dateArray[x][0], 'D/M/YYYY');
				let lastDay  = moment(dateArray[x][1], 'D/M/YYYY');


				let diff = lastDay.diff(firstDay, 'days' ) // getting different in days
				rangeArr.push(moment(firstDay).format('D/M/YYYY')) //push first day of class in
				let counter = 1 // initializing counter
				for (let a = 0; a < diff+1 ; i++) { // loop with diff + 1 to get last day in as well
					let nextDay = moment(firstDay, 'D/M/YYYY').add(counter, 'day').format('D/M/YYYY')

					if (moment(nextDay, 'D/M/YYYY').format('ddd') == classDay) { //only pushing the days the classes are on into the array
						rangeArr.push(nextDay)
					}
					counter += 1;
					a += 1;
				}

				dateArray[x] = rangeArr //replacing original array with an array with all the days of the class
				allDays.push(dateArray[x]) // push into another array to get all the days of the semester
			}			
		}

		let allUniqDays = [...new Set(allDays.flat(2))] //getting unique values from all days, .flat() will flatten allDays into a 1d array
		allUniqDays.sort((a,b) => { // sorting array 
			a = moment(a, 'D/M/YYYY');
			b = moment(b, 'D/M/YYYY');
			return a - b;
		});
		
		const todayClass = [];

		for (let i = 0; i < sortedJson.length; i++) {
			for (let dateRange = 0; dateRange < sortedJson[i].dateArray.length; dateRange++) {

				if (sortedJson[i].dateArray[dateRange].includes(today)) {					
					todayClass.push(sortedJson[i])
				}
			}
		}

		const allData = sortedJson
			.map( ({ unitName, unitSeries, timeStart, duration, classroomType, dateArray }) => {
				for (let dateRange = 0; dateRange < dateArray.length; dateRange++) {
					if( dateArray[dateRange].includes(today) ){
						return (
							<div className="individual-card">
								<p> Unit Name :  {unitName} </p>
								<p> Unit Series : {unitSeries} </p>
								<p> Time Start : {timeStart} </p>
								<p> Duration : {duration} </p>
								<p> End Time : <Moment add={{ hours : duration}} parse="HH:mm" format="HH:mm">{timeStart}</Moment> </p>
								<p> Classroom Type : {classroomType} </p>
							</div>
						) 
					}
				}
			})
		return (
			<div>
				<p> {today} </p>
				{allData}
			</div> 
		)		
	}
}

export default WeekView;