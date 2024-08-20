// Your code here

function createEmployeeRecord(arr) {
    return {
        firstName : arr[0],
        familyName : arr[1],
        title : arr[2],
        payPerHour : arr[3],
        timeInEvents : [],
        timeOutEvents : [],
    }
}

function createEmployeeRecords(arr) {
    return arr.map(createEmployeeRecord)
}

function createTimeInEvent(employeeRecord, timeData) {
    const [date, time] = timeData.split(" ");
    const hour = parseInt(time.slice(0, 2), 10) * 100 + parseInt(time.slice(2), 10); // Convert to 24-hour format (e.g., 1400)
    
    employeeRecord.timeInEvents.push({
        type: "TimeIn",
        hour: hour, // Store as a number
        date: date
    });

    return employeeRecord;
}

function createTimeOutEvent(employeeRecord, timeData) {
    const [date, time] = timeData.split(" ");
    const hour = parseInt(time.slice(0, 2), 10) * 100 + parseInt(time.slice(2), 10); 
    
    employeeRecord.timeOutEvents.push({
        type: "TimeOut",
        hour: hour,
        date: date
    });

    return employeeRecord;
}

function hoursWorkedOnDate(employeeRecord, date) {
    const timeInEvents = employeeRecord.timeInEvents.filter(e => e.date === date);
    const timeOutEvents = employeeRecord.timeOutEvents.filter(e => e.date === date);

    const timeInEvent = timeInEvents[0];
    const timeOutEvent = timeOutEvents[0];

    if (timeInEvent && timeOutEvent) {
        return (timeOutEvent.hour - timeInEvent.hour) / 100;
    }

    return 0;
}


function wagesEarnedOnDate(employeeRecord, date) {
    const hours = hoursWorkedOnDate(employeeRecord, date);
    return hours * employeeRecord.payPerHour;
}

function allWagesFor(employeeRecord) {
    const dates = employeeRecord.timeInEvents.map(e => e.date);
    return dates.reduce((total, date) => total + wagesEarnedOnDate(employeeRecord, date), 0);
}

function calculatePayroll(employeeRecords) {
    return employeeRecords.reduce((total, record) => total + allWagesFor(record), 0);
}


