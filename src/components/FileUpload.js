import React, { Component } from 'react';
import { toJson } from '../utilityFunctions/rawTimetableToJson';


class FileUpload extends Component {
    state = {
        isLoading: true,
        uploadedFileText: "",
        jsonTimetable: []
    }

    // When user selects file, verify, read, and set state its content
    onUpload = (e) => {
        let file = e.target.files[0];

        var fileType = /text.*/

        if (file.type.match(fileType)) {
            let reader = new FileReader();
            reader.readAsText(file);
            reader.onload = () => {
                this.setState({
                    uploadedFileText: reader.result
                });
            }
        } else {
            this.setState({
                uploadedFileText: "file type error"
            });
        }
    }

    jsonTimetable = () => {
        const jsonTimetable = toJson(this.state.uploadedFileText);

        this.setState({
            jsonTimetable: jsonTimetable
        })
    }

    clearLocalStorage = () => {
        console.log(typeof localStorage.getItem('jsonTimetable'));
        localStorage.getItem('jsonTimetable') !== "[]" && localStorage.clear()
    }

    componentWillMount() {
        localStorage.getItem('jsonTimetable') && this.setState({
            jsonTimetable: JSON.parse(localStorage.getItem('jsonTimetable')),
            isLoading: false
        });
    }

    componentWillUpdate(nextProps, nextState) {
        localStorage.setItem("jsonTimetable", JSON.stringify(nextState.jsonTimetable));
    }

    render() {
        const uploadedText = this.state.jsonTimetable.map(
            ({ unitName, timeStart, duration, classroomCode, classroomType, dateArray }) => {
                let dateRangeSpacer = " and ";
                let formattedDateRanges = "";
                let dateRangeFormatter = (dateRangeArray) => {
                    for (let i = 0; i < dateRangeArray.length; i++) {
                        if (dateRangeArray[i + 1] === undefined) {
                            formattedDateRanges += dateRangeArray[i];
                        } else {
                            formattedDateRanges += dateRangeArray[i];
                            formattedDateRanges += dateRangeSpacer;
                        }
                    }
                }
                dateRangeFormatter(dateArray);
                return (
                    <li>
                        {unitName + ",," + timeStart + ",," + duration + ",," + classroomCode + ",,"
                        + classroomType + ",," + formattedDateRanges}
                    </li>
                );
            }
        )
        return (
            <div>
                <input
                    type="file"
                    onChange={this.onUpload}
                />
                <ul>
                    {uploadedText}
                </ul>
                <input
                    type="button"
                    value="Show Timetable"
                    onClick={this.jsonTimetable}
                />
                <input
                    type="button"
                    value="Clear localStorage"
                    onClick={this.clearLocalStorage}
                />
            </div>
        );
    }
}

export default FileUpload;