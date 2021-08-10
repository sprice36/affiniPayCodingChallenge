import axios from 'axios';
import connect from "react-redux/es/connect/connect";
import { mapStateToProps, mapDispatchToProps } from "./redux/action_creator";
import PropTypes from "prop-types";


export function fetchAPI(input) {

	let apiUrl = `https://www.alphavantage.co/query?`;
	let functionType = 'SYMBOL_SEARCH';
	let apiKey = 'QFHAW984ICVE4V6P';
	let stockURL = apiUrl + `function=${functionType}&keywords=${input}&apikey=${apiKey};`;
	console.log(stockURL);
	console.log("fetch for input:" + input);
    let data = [];
	axios(stockURL)
		.then((response) => {
           console.log(response.data);
           data.push(response.data)
           console.log(data);
           return data;
			}); 	
}

fetchAPI.propTypes = {
	setStockDetails: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(fetchAPI);







