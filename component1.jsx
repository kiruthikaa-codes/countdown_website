import React, { useState } from "react";
import styles from './home.module.css';

const Component1 = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [eventName, setEventName] = useState('');
    const [eventDate, setEventDate] = useState('');
    const [eventHour, setEventHour] = useState('');
    const [eventMinute, setEventMinute] = useState('');
    const [days, setDays] = useState('00');
    const [hours, setHours] = useState('00');
    const [minutes, setMinutes] = useState('00');
    const [seconds, setSeconds] = useState('00');
    const [message, setMessage] = useState('');
    const [customMessageVisible, setCustomMessageVisible] = useState(false);
    const [customMessage, setCustomMessage] = useState('');
    const [isStartDisabled, setIsStartDisabled] = useState(true);
    const [submittedCustomMessage, setSubmittedCustomMessage] = useState('');

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        if (name === 'event_name') {
            setEventName(value);
            if (value !== 'CUSTOM') {
                setCustomMessageVisible(false); // Hide form for non-custom events
                setIsStartDisabled(false); // Enable Start Countdown button for non-custom events
            } else {
                setCustomMessageVisible(true); // Show form for custom events
                setIsStartDisabled(true); // Disable Start Countdown button for custom events
            }
        } else if (name === 'date') {
            setEventDate(value);
        } else if (name === 'hour') {
            setEventHour(value);
        } else if (name === 'minute') {
            setEventMinute(value);
        }
    };

    const handleButtonClick = () => {
        if (!customMessageVisible) {
            setIsVisible(true);
            updateCountdown();
        }
    };

    const updateCountdown = () => {
        const currentDate = new Date().getTime();
        const selectedDate = new Date(eventDate);

        // Set default values for hours and minutes if not provided
        const hour = eventHour ? parseInt(eventHour) : 0;
        const minute = eventMinute ? parseInt(eventMinute) : 0;

        selectedDate.setHours(hour);
        selectedDate.setMinutes(minute);
        selectedDate.setSeconds(0);

        if (selectedDate.getTime() <= currentDate) {
            setMessage("Invalid date and time. Please select a future date and time.");
            return;
        }

        const intervalId = setInterval(() => {
            const currentTime = new Date().getTime();
            const remaining = selectedDate.getTime() - currentTime;
            if (remaining <= 0 || isNaN(remaining)) {
                clearInterval(intervalId);
                setDays('00');
                setHours('00');
                setMinutes('00');
                setSeconds('00');
                displayMessage();
            } else {
                const daysRemaining = Math.floor(remaining / (1000 * 60 * 60 * 24));
                const hrs = Math.floor((remaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const mins = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
                const secs = Math.floor((remaining % (1000 * 60)) / 1000);
                setDays(daysRemaining < 10 ? `0${daysRemaining}` : daysRemaining.toString());
                setHours(hrs < 10 ? `0${hrs}` : hrs.toString());
                setMinutes(mins < 10 ? `0${mins}` : mins.toString());
                setSeconds(secs < 10 ? `0${secs}` : secs.toString());
            }
        }, 1000);
    };

    const displayMessage = () => {
        if (eventName === 'CUSTOM') {
            setMessage(submittedCustomMessage); // Set custom message after countdown finishes
        } else {
            switch (eventName) {
                case 'BIRTHDAY':
                    setMessage('HAPPY BIRTHDAY!');
                    break;
                case 'ANNIVERSARY':
                    setMessage('HAPPY ANNIVERSARY!');
                    break;
                case 'NEW YEAR':
                    setMessage('HAPPY NEW YEAR!');
                    break;
                default:
                    setMessage('');
            }
        }
    };

    const handleCustomMessageSubmit = (event) => {
        event.preventDefault();
        setSubmittedCustomMessage(customMessage);
        setIsStartDisabled(false); // Enable Start Countdown button
    };

    return (
        <div className={styles.App}>
            <div className={styles.div1}>COUNTDOWN</div>
            <label>What's the event?</label>
            <select name="event_name" onChange={handleInputChange}>
                <option value="BIRTHDAY">Birthday</option>
                <option value="ANNIVERSARY">Anniversary</option>
                <option value="NEW YEAR">New Year</option>
                <option value="CUSTOM">Custom Message</option> {/* Add custom message option */}
            </select>
            <label>Date:</label>
            <input type="date" name="date" onChange={handleInputChange} />
            <label>Hour:</label>
            <input type="number" name="hour" min="0" max="23" onChange={handleInputChange} />
            <label>Minute:</label>
            <input type="number" name="minute" min="0" max="59" onChange={handleInputChange} />
            <button onClick={handleButtonClick} disabled={isStartDisabled}>Start Countdown</button>

            {isVisible && (
                <div className="component">
                    <table cellPadding="10px">
                        <tr>
                            <td><div className={styles.div2}>{days}</div></td>
                            <td><div className={styles.div5}>:</div></td>
                            <td><div className={styles.div2}>{hours}</div></td>
                            <td><div className={styles.div5}>:</div></td>
                            <td><div className={styles.div3}>{minutes}</div></td>
                            <td><div className={styles.div5}>:</div></td>
                            <td><div className={styles.div4}>{seconds}</div></td>
                        </tr>
                    </table>
                    <p>{message}</p>
                    {customMessageVisible && (
                        <form onSubmit={handleCustomMessageSubmit}>
                            <input
                                type="text"
                                value={customMessage}
                                onChange={(e) => setCustomMessage(e.target.value)}
                                placeholder="Enter custom message..."
                            />
                            <button type="submit">Submit</button>
                        </form>
                    )}
                </div>
            )}
        </div>
    );
};

export default Component1;