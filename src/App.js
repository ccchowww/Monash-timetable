import React, { Component } from 'react';
import './App.css';


class App extends Component {


    render() {
    
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


    const makeTimetableFromRaw = (line) => {
        let separatedStrings = line.trim().split("\n");
        let timetableArray = [];

        // Remove table headers line
        separatedStrings.map(line => (
            line.indexOf("Subject") === -1 ?
            timetableArray.push(line) :
            null
            ));

        // Split by Tab to separate into usable items
        for (let i = 0; i < timetableArray.length; i++) {
            timetableArray[i] = timetableArray[i].split('\t');

            timetableArray[i] = timetableArray[i].filter(item => (
                item === "" ?
                false : true
            ))

            // Convert Date String to Array of strings
            for (let k = 0; k < timetableArray[i].length; k++) {
                if (timetableArray[i][k].indexOf('/') === -1) {
                    
                } else {
                    timetableArray[i][k] = timetableArray[i][k].split(', ');
                }
            }
        }
        console.log(timetableArray);
        
        return timetableArray;
    }


    return (
        <div>
            {/* <h1>horse</h1> */}
            <ul>
                {makeTimetableFromRaw(loadofshit).map(activity => (
                    activity.map(activityName => (
                        <li>
                            {
                                typeof activityName !== "string" ?
                                activityName.map(activityDate => (
                                    <li>{activityDate}</li>
                                ))
                                :
                                activityName
                            }
                        </li>
                    ))
                ))}
            </ul>
        </div>
    );
    }
}

export default App;
