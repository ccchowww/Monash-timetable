import React, { Component } from 'react';
import Moment from 'react-moment';
import moment from 'moment';

class WeekView extends Component {
	render() {
		const rawJson = this.props.ttData;
		console.log(rawJson);
		console.log(moment('31/12/18', 'DD/MM/YY').add(2, 'days'))
		const sortedJson = rawJson.sort((a,b) => {
			a = moment(a.timeStart, 'HH:mm');
			b = moment(b.timeStart, 'HH:mm');
			return a - b;
		});


		const allData = sortedJson
			.map( ({ unitName, unitSeries, timeStart, duration, classroomType, dateArray }) => {
				for (var x = 0; x < dateArray.length; x++) {
					let i = dateArray[x]
					let firstDay = moment(i[0], 'D/M');
					let lastDay  = moment(i[1], 'D/M');
					let rangeArr = [];

					let diff = lastDay.diff(firstDay, 'days' )
					if ( diff < 0 ){ // if i[1] is next year, add year in to avoid negative figure for diff
						let thisYear = moment().year();
						let nextYear = moment().add(1, 'years').format('YYYY')

						lastDay = i[1] + '/' + nextYear;
						firstDay = i[0] + '/' + thisYear;

						let diff = moment(lastDay, 'D/M/YYYY').diff(moment(firstDay, 'D/M/YYYY'), 'days' )
						rangeArr.push(firstDay)

					}else{						
					}
					let counter = 1
					for (let a = 0; a < diff+1 ; i++) {
						let nextDay = moment(firstDay, 'D/M/YYYY').add(counter, 'day').format('D/M')
						rangeArr.push(nextDay)
						counter += 1;
						a += 1;
					}

					dateArray[x] = rangeArr
				}

				console.log(dateArray)
				return (
					<div className="individual-card">
						<p> Unit Name :  {unitName} </p>
						<p> Unit Series : {unitSeries} </p>
						<p> Time Start : {timeStart} </p>
						<p> Duration : {duration} </p>
						{
							dateArray.map( 
								i => i.map(
									x => <p> {x} </p> 
								)
							)
						}
						<p> End Time : <Moment add={{ hours : duration}} parse="HH:mm" format="HH:mm">{timeStart}</Moment> </p>
						<p> Classroom Type : {classroomType} </p>
					</div>
				) 
			})
		// console.log(this.props.ttData)
		return (
			<div>
				{allData}
			</div> 
		)		
	}
}

export default WeekView;