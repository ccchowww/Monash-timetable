import React, { Component } from 'react';
import { toJson } from '../utilityFunctions/rawTimetableToJson';
import WeekView from './weekView';


class FileUpload extends Component {
    state = {
        isLoading: true,
        uploadedFileText: "",
        jsonTimetable: [],
        canInstall: false
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

    componentDidMount() {

        window.addEventListener('beforeinstallprompt', (e) => {
            // Prevent Chrome 67 and earlier from automatically showing the prompt
            e.preventDefault();
            // Stash the event so it can be triggered later.
            let deferredPrompt = e;

            deferredPrompt.prompt();
            deferredPrompt.userChoice
                .then((choiceResult) => {
                    if (choiceResult.outcome === 'accepted') {
                    console.log('User accepted the A2HS prompt');
                    } else {
                    console.log('User dismissed the A2HS prompt');
                    }
                    deferredPrompt = null;
            });
        });

        window.addEventListener('appinstalled', (evt) => {
            alert('a2hs installed');
        });
    }

    componentWillUnmount() {
        window.removeEventListener('beforeinstallprompt');
        window.removeEventListener('appinstalled');
    }

    render() {
        const uploadedText = this.state.jsonTimetable.map(
            ({ unitName, timeStart, duration, classroomCode, classroomType, dateArray }) => {
                let dateRangeSpacer = " and ";
                // let formattedDateRanges = "";
                // let dateRangeFormatter = (dateRangeArray) => {
                //     for (let i = 0; i < dateRangeArray.length; i++) {
                //         if (dateRangeArray[i + 1] === undefined) {
                //             formattedDateRanges += dateRangeArray[i];
                //         } else {
                //             formattedDateRanges += dateRangeArray[i];
                //             formattedDateRanges += dateRangeSpacer;
                //         }
                //     }
                // }
                // dateRangeFormatter(dateArray);
                return (
                    <li>
                        {unitName + ",," + timeStart + ",," + duration + ",," + classroomCode + ",,"
                        + classroomType + ",," + dateArray}
                    </li>
                );
            }
        )

        // destructuring
        const { unitName, dateArray } = this.state.jsonTimetable;
        // console.log(unitName);
        // console.log(dateArray);
        // console.log(this.state.jsonTimetable)
        return (
            <div>
                <WeekView ttData={this.state.jsonTimetable}/>
                <input
                    type="file"
                    onChange={this.onUpload}
                />
                
                {/* <ul>
                   {uploadedText}
                </ul> */}
                
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
                <span>
                    
                </span>
            </div>
        );
    }
}

export default FileUpload;