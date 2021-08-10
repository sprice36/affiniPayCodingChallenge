//import action-creators
import { STOCK_DETAILS, STOCK_PRICE_DATA } from "./action_creator";

const initialState = {
	stockDetails: {},
	stockPriceData: {}
};

function global_reducer(state = initialState, action){
	switch (action.type){
		case STOCK_DETAILS:
		return Object.assign({}, state, {
			stockDetails:  action.payload
		});
		case STOCK_PRICE_DATA: 
		return Object.assign({}, state, {
			stockPriceData: action.payload
		})
	}
	return state;
}

export default global_reducer;
