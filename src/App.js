import React, { Component } from 'react';
import './App.css';

import FileUpload from './components/FileUpload';


class App extends Component {
    requestNotificationPermission = () => {
        if ("Notification" in window) {
            if (
              Notification.permission !== "denied" &&
              Notification.permission !== "granted"
            ) {
              Notification.requestPermission();
            }
        }
    }

    openNotification = () => {
        if ("Notification" in window && Notification.permission === "granted") {
            const notification = new Notification("NOTIFIED BITCH");
        }
    }


    render() {
    
    return (
        <div>
            <FileUpload />
            <input
                type="button"
                onClick={this.requestNotificationPermission}
                value="request notification"
            />
            <input
                type="button"
                onClick={this.openNotification}
                value="open notification"
            />
        </div>
    );
    }
}

export default App;
