import moment from "moment";

const formatYMD = 'YYYY-MM-DD';

export function getCurrentDate(){
	return moment().format(formatYMD);
}
