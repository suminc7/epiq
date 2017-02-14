import moment from 'moment'


export function getMoment(){
	return moment()
}

export function getMillisecond(){
	return parseInt(moment().format('X') * 1000)
}

export function getUtcOffset(date = 0){
	return parseInt(date) + moment().utcOffset() * 60000;
}

export function formatUtc(date){
	return moment(parseInt(date) + getUtcOffset()).format('YYYY/MM/DD HH:mm')
}

export function formatUtcFromServer(date){
	return moment(moment(date) + getUtcOffset()).format('YYYY/MM/DD HH:mm')
}