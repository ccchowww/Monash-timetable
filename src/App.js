import React, { Component } from 'react';
import './App.css';


// const regexUnitName = /[A-Z]{3}[0-9]{4}/;
// Raw timetable
const loadofshit = `
Subject Code	Description	Group	Activity	Day	Time	Campus	Location	Staff	Duration	Dates
FIT1045_MA_OCT-MY-01_ON-CAMPUS	ALG PROG FUN PYTHON	Lecture	01	Mon	09:00	MA	MA_ClassRoom_9308		Dr Chern Hong Lim	2 hrs	22/10-17/12, 31/12-14/1
FIT1045_MA_OCT-MY-01_ON-CAMPUS	ALG PROG FUN PYTHON	Tutorial	01-P1	Tue	08:00	MA	MA_Tutorial_6209		Ms Hui Xuan Tan	2 hrs	23/10-18/12, 1/1-15/1
FIT1045_MA_OCT-MY-01_ON-CAMPUS	ALG PROG FUN PYTHON	Tutorial	01-P2	Tue	14:00	MA	MA_Clab_2-4-05		Ms Hui Xuan Tan	2 hrs	23/10-18/12, 1/1-15/1
FIT1047_MA_OCT-MY-01_ON-CAMPUS	INTRO CSN&SEC	Comp-Lab	01-P2	Thu	14:00	MA	MA_Clab_2-4-05		Mr Weng Kee Tham	2 hrs	29/11-20/12, 3/1-17/1
FIT1047_MA_OCT-MY-01_ON-CAMPUS	INTRO CSN&SEC	Comp-Lab	01-P1	Thu	16:00	MA	MA_Clab_2-4-05		Dr Hasti Khorasanizadeh	2 hrs	25/10-22/11
FIT1047_MA_OCT-MY-01_ON-CAMPUS	INTRO CSN&SEC	Lecture	01	Thu	12:00	MA	MA_LT_6002		Mr Weng Kee Tham	2 hrs	25/10-20/12, 3/1-17/1
FIT1051_MA_OCT-MY-01_ON-CAMPUS	PROG FUNDAMENTALS IN JAVA	Comp-Lab	01	Fri	11:00	MA	MA_Clab_2-4-05		Mr Boon Pui Chew	2 hrs	26/10-21/12, 4/1-18/1
FIT1051_MA_OCT-MY-01_ON-CAMPUS	PROG FUNDAMENTALS IN JAVA	Lecture	01	Mon	14:00	MA	MA_ClassRoom_9308		Mr Nicholas Wong	2 hrs	22/10-17/12, 31/12-14/1
FIT1051_MA_OCT-MY-01_ON-CAMPUS	PROG FUNDAMENTALS IN JAVA	Tutorial	01	Wed	11:00	MA	MA_Tutorial_6210		Mr Boon Pui Chew	1 hr	24/10-19/12, 2/1-16/1
MAT1830_MA_OCT-MY-01_ON-CAMPUS	DISC MATH COMPSC	Lecture	01-P2	Fri	08:00	MA	MA_LT_6002		Mr Weng Kee Tham	1 hr	26/10-21/12, 4/1-18/1
MAT1830_MA_OCT-MY-01_ON-CAMPUS	DISC MATH COMPSC	Lecture	01-P1	Thu	08:00	MA	MA_LT_6002		Mr Weng Kee Tham	2 hrs	25/10-20/12, 3/1-17/1
MAT1830_MA_OCT-MY-01_ON-CAMPUS	DISC MATH COMPSC	Tutorial	02	Fri	09:00	MA	MA_Tutorial_6210		Mr Weng Kee Tham	1.5 hrs	2/11-14/12, 28/12-18/1
MPU3113_MA_OCT-MY-01_ON-CAMPUS	ETHNIC RELATIONS	Lecture	01	Tue	17:00	MA	MA_Audi_2_6117		Ms Thamayanthee Thamayanthee	2 hrs	23/10-11/12, 25/12-15/1
`
// Convert Raw timetable to array of arrays
const makeTimetableFromRaw = (line) => {
    let separatedStrings = line.trim().split("\n");
    let timetableArray = [];
    
    let arrayObjects = [];
    let timetableSlot = {};

    // Remove table headers line
    separatedStrings.map(line => (
        line.indexOf("Subject") === -1 ?
        timetableArray.push(line) :
        null
        ));

    // Loop through the massive string
    // Split by Tab to separate into usable items in an array
    for (let i = 0; i < timetableArray.length; i++) {
        timetableArray[i] = timetableArray[i].split('\t');

        // Remove empty string from array
        timetableArray[i] = timetableArray[i].filter(item => (
            item === "" ?
            false : true
        ))

        // Convert Date String to Array of date ranges
        for (let k = 0; k < timetableArray[i].length; k++) {
            if (timetableArray[i][k].indexOf('/') === -1) {
                
            } else {
                timetableArray[i][k] = timetableArray[i][k].split(', ');
            }
        }
        // attempt convert class code thingy to array
        for (let k = 0; k < timetableArray[i].length; k++) {
            if (timetableArray[i][k].indexOf('_') === -1) {
                
            } else {
                timetableArray[i][k] = timetableArray[i][k].split('_');
            }
        }
    }
    
    return timetableArray;
}

const makeJsonTimetable = (rawTimetable) => {
    let jsonTimetable = [];
    for (let i = 0; i < rawTimetable.length; i++) {
        let timetableItem = {
            unitName: rawTimetable[i][0][0],
            unitSeries: rawTimetable[i][3],
            timeStart: rawTimetable[i][5],
            duration: /[0-9]{1}/.exec(rawTimetable[i][9])[0],
            classroomType: rawTimetable[i][7][1].toLowerCase(),
            classroomCode: rawTimetable[i][7][2],
            campus: rawTimetable[i][7][0],
            dateArray: rawTimetable[i][10]
        }
        jsonTimetable.push(timetableItem);
    }
    console.log(jsonTimetable);
    jsonTimetable.map(({ unitName, timeStart, duration, classroomCode, classroomType, dateArray }) => {
        let spacer = " , "
        // Date range formatting proof of concept
        let dateRangeSpacer = " and "
        let formattedDateRanges = [];
        let dateRangeFormatter = (dateRangeArray) => {
            console.log("formatter input"+ dateRangeArray);
            for (let i = 0; i < dateRangeArray.length; i++) {
                if (dateRangeArray[i + 1] === undefined) {
                    formattedDateRanges.push(dateRangeArray[i]);
                } else {
                    formattedDateRanges.push(dateRangeArray[i]);
                    formattedDateRanges.push(dateRangeSpacer);
                }
            }
            console.log("xd what dis do "+ formattedDateRanges);
        }
        dateRangeFormatter(dateArray);
        return (
            console.log(unitName +spacer+ timeStart +spacer+ duration +spacer+ classroomType +spacer+ classroomCode +spacer+ formattedDateRanges)
        )
    });
    console.log("Ho ho ho we're lit🔥")
}


class App extends Component {
    state = {
        timetableArray: []
    }

    componentDidMount() {
        const convertedTimetable = makeTimetableFromRaw(loadofshit);
        this.setState({
            timetableArray: convertedTimetable
        });
        makeJsonTimetable(convertedTimetable);
    }

    render() {
    
    


    
    
    // const unitName = this.state.timetableArray[0][0].exec(regexUnitName);
    


    return (
        <div>
        </div>
    );
    }
}

export default App;
