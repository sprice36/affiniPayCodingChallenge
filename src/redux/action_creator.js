export const STOCK_DETAILS = "STOCK_DETAILS";
export const STOCK_PRICE_DATA = "STOCK_PRICE_DATA";

export function setStockDetails(payload){
	return {type: STOCK_DETAILS, payload}
}

export function setStockPriceData(payload){
	return {type: STOCK_PRICE_DATA, payload}
}

export const mapStateToProps = (state) => {
	return {
		stockDetails: state.global_reducer.stockDetails,
		stockPriceData: state.global_reducer.stockPriceData
	}	
}

export const mapDispatchToProps = {
	setStockDetails,
	setStockPriceData
}