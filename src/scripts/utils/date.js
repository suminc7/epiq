

const moment = window.moment;
const lang = epiq.lang;

const getTimeago = (dateCreated) => {
    return moment(dateCreated + new Date().getTimezoneOffset() * -60000).locale(lang).fromNow();
};


const getDuration = (duration) => {
    return duration >= 3600 ? moment.utc(duration*1000).format("HH:mm:ss") : moment.utc(duration*1000).format("mm:ss");
};

const getDate = (date) => {
    return moment(date).format('l');
};


export {
    getTimeago,
    getDuration,
    getDate
}
