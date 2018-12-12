import React, { Component } from 'react';
import Moment from 'react-moment';
import moment from 'moment';

import { ClassesByDay } from '../utilityFunctions/getClassesByDay';

class WeekView extends Component {
	state = {
		classesToday: "initial"
	}

	addStartTime = (classStart) => {
		this.setState( prevState => ({
            classStartTimes: [...prevState.classStartTimes, classStart]
        }));
	}

	getClassesByDay = (timetableJson) => {
		// const today = '13/12/2018' //comment this to stop using static date
		const today = moment().format('D/M/YYYY');
		const classesByDayJson = ClassesByDay(timetableJson, today);
		this.setState({
			classesToday: classesByDayJson
		})
	}
	// Before component mounts(when its about to be displayed, before render() is called.)
	// call ur function to get classes, then it will put it in state
	//
	// this is not the best way to do it, better to have only one component have state={}, then pass it
	// as props to other components that need it.
	componentWillMount() {
		this.getClassesByDay(this.props.ttData);
	}

	render() {
		return (
			<div>
				{
					this.state.classesToday !== "initial" ?
						this.state.classesToday.map( ({ unitName, timeStart, duration, classroomCode, classroomType }) => {
							return (
								<div className="individual-card">
									<p> Unit Name :  {unitName} </p>
									<h4> Time Start : {timeStart} </h4>
									<p> End Time : <Moment add={{ hours : duration}} parse="HH:mm" format="HH:mm">{timeStart}</Moment> </p>
									<h4> Classroom Code : {classroomCode} </h4>
									<p> Classroom Type : {classroomType} </p>
								</div>
							)
						})
						:
						"tits"
				}
			</div> 
		)		
	}
}

export default WeekView;