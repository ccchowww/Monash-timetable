export const toJson = (rawText) => {
    // console.log("1st"+ rawText);
    let stringsOfClasses = rawText.trim().split("\n");
    let classesArray = [];
    // Remove table headers line
    stringsOfClasses.map(line => (
        line.indexOf("Subject") === -1 ?
        classesArray.push(line) :
        null
    ));
    // console.log("result first step: " + classesArray);
    // Loop through the massive string
    // Split by Tab to separate into usable items in an array
    for (let i = 0; i < classesArray.length; i++) {
        classesArray[i] = classesArray[i].split('\t');

        // Remove empty string from array
        classesArray[i] = classesArray[i].filter(item => (
            item === "" ?
            false : true
        ))

        // Convert Date String to Array of date ranges
        for (let k = 0; k < classesArray[i].length; k++) {
            if (classesArray[i][k].indexOf('/') === -1) {
                
            } else {
                classesArray[i][k] = classesArray[i][k].split(', ');
                for (let j = 0; j < classesArray[i][k].length; j++) {
                    classesArray[i][k][j] = classesArray[i][k][j].split('-');
                }
            }
        }
        // attempt convert class code thingy to array
        for (let k = 0; k < classesArray[i].length; k++) {
            if (classesArray[i][k].indexOf('_') === -1) {
                
            } else {
                classesArray[i][k] = classesArray[i][k].split('_');
            }
        }
    }
    // console.log("result 2nd step: " + classesArray);
    // console.log(classesArray);
    // Convert to useful json data
    let jsonTimetable = [];
    for (let i = 0; i < classesArray.length; i++) {
        let timetableItem = {
            unitName: classesArray[i][0][0],
            unitSeries: classesArray[i][3],
            timeStart: classesArray[i][5],
            duration: /[0-9]{1}/.exec(classesArray[i][9])[0],
            classroomType: classesArray[i][7][1].toLowerCase(),
            classroomCode: classesArray[i][7][2],
            campus: classesArray[i][7][0],
            dateArray: classesArray[i][10]
        }
        jsonTimetable.push(timetableItem);
    }
    console.log(jsonTimetable);
    return jsonTimetable;
}