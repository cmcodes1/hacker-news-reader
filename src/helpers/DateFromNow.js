const DAYS_OF_WEEK = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const MONTHS_OF_YEAR = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const daysBetween = (date1, date2) => {
    const ONE_DAY_ON_SECONDS = 1000 * 60 * 60 * 24;
    const date1Ms = date1.getTime();
    const date2Ms = date2.getTime();
    const differenceMs = date2Ms - date1Ms;
    return Math.round(differenceMs / ONE_DAY_ON_SECONDS);
}

const getHoursFromDate = (date) => {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    return hours + ':' + minutes + ' ' + ampm;
}

const dateFromNow = (dateUNIX) => {
    var date = new Date(dateUNIX * 1000);
    const currentDate = new Date();
    if (date.getUTCDate() === currentDate.getUTCDate() && date.getUTCMonth() === currentDate.getUTCMonth() && date.getUTCFullYear() === currentDate.getUTCFullYear()) {
        const hours = Math.floor(Math.abs(date - currentDate) / 36e5);
        if (hours === 0) {
            const minutes = Math.round(((Math.abs(date - currentDate) % 86400000) % 3600000) / 60000);
            return minutes <= 1 ? 'a while ago' : `${minutes} minutes ago.`
        } else {
            return `${Math.floor(hours)} hours ago`;
        }
    } else {
        if (date.getUTCFullYear() < currentDate.getUTCFullYear() || daysBetween(date, currentDate) > 6) {
            return `${date.getDate()}/${MONTHS_OF_YEAR[date.getMonth()]} /${date.getFullYear()}`;
        }
        else {
            return `on ${DAYS_OF_WEEK[date.getDay()]} at ${getHoursFromDate(date)}`;
        }
    }
}

export default dateFromNow;