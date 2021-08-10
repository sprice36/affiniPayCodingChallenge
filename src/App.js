import React from 'react';
import './App.css';
import PropTypes from "prop-types";
import connect from "react-redux/es/connect/connect";
import { mapDispatchToProps, mapStateToProps } from "./redux/action_creator";
import axios from 'axios';
import Select from 'react-select';
import { Button, Row, Col } from "reactstrap";
import { getCurrentDate } from "./utility";
import companyLogo from "./img/affinipay.jpg";


class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			inputValue: ''
		}
	}


	apiCall = (userInput) => {
		console.log("api call initiated for" + userInput)
		let apiUrl = `https://www.alphavantage.co/query?`;
		let functionType = 'SYMBOL_SEARCH';
		let apiKey = 'QFHAW984ICVE4V6P';
		let input = userInput;
		let stockURL = apiUrl + `function=${functionType}&keywords=${input}&outputsize=full&apikey=${apiKey};`;
		console.log(stockURL);
		console.log("fetch for input:" + input);
		axios(stockURL)
			.then((response) => {
				console.log(response.data.bestMatches);
				this.props.setStockDetails(response.data.bestMatches)
			});

	}	

	getOptions = () => {
		let filteredOptions = [];
		if (this.props.stockDetails) {
			for (var i = 0; i < this.props.stockDetails.length; i++) {
				{
					filteredOptions.push({ value: this.props.stockDetails[i]["1. symbol"], label: this.props.stockDetails[i]["1. symbol"] + '      ' + this.props.stockDetails[i]["2. name"] })
				}

			}
		}
		console.log(filteredOptions)
		return filteredOptions;
	}


	dropDownChange = (selectedOption) => {
		this.setState({
			selectedOption
		})
	}

	handleChange = (e) => {
		this.setState({
			inputValue: e.target.value
		})
	}

	onFocus = (e) => {
		this.apiCall(e.target.value)
	}

	onSubmit = () => {
		let apiUrl = `https://www.alphavantage.co/query?`;
		let symbol = this.state.selectedOption ? this.state.selectedOption.value : ' ';
		let functionType = 'TIME_SERIES_DAILY';
		let outputSize = 'compact';
		let apiKey = 'QFHAW984ICVE4V6P';
		let stockURL = apiUrl + `function=${functionType}&symbol=${symbol}&outputsize=${outputSize}&apikey=${apiKey};`;
		let date = getCurrentDate();
		console.log(date)
		console.log(stockURL);
		console.log("fetch for input:" + symbol);
		axios(stockURL)
			.then((response) => {
				console.log(response.data["Time Series (Daily)"][date]);
				this.props.setStockPriceData(response.data["Time Series (Daily)"][date]);
			});

		return this.props.stockPriceData;
	}

	showStockPriceData = () => {
		let open = this.props.stockPriceData['1. open'];
		let high = this.props.stockPriceData['2. high'];
		let low = this.props.stockPriceData['3. low'];
		let close = this.props.stockPriceData['4. close'];

		return (<div className="stockDiv">
			<div className="col-md-8">Open:    {open} </div>
			<div className="col-md-8">High:    {high} </div>
			<div className="col-md-8">Low:     {low}  </div>
			<div className="col-md-8">Close:   {close} </div>
		</div>
		)
	}

	render() {
		const selectStyle = {
			option: (base, state) => ({
				...base,
				fontColor: 'black',
				color: 'black',
				background: '#ffffff',
				minHeight: 40,
				maxWidth: 300,
				lineHeight: 2,
				'&:hover': {
					background: '#e5e5e5',
					borderColor: '#dbdbdb',
					color: '#343434'
				}
			}),
			control: (base) => ({
				...base,
				borderWidth: '1px',
				borderStyle: 'solid',
				borderColor: '#d5d5d5',
				minHeight: 48,
				minWidth: 300,
				maxWidth: 300,
				display: 'flex'
			})
		};
		return (
			<div className="parentDiv">
				<img src={companyLogo} alt="affinipay logo" />

				<Row className="dropDownStyle">
					<Col>
						<Select
							value={this.state.selectedOption}
							onChange={this.dropDownChange}
							onBlur={this.onFocus}
							className="form-control"
							placeHolder="Select stock"
							options={this.getOptions()}
							styles={selectStyle}
						/>
					</Col>
				</Row>


				<Row className="buttonRow">
					<Col sm="12" md="10" lg="10">
						<Button disabled={!this.state.selectedOption ? true : false} onClick={this.onSubmit}>Search</Button>
					</Col>
				</Row>

				<Row>{this.props.stockPriceData ? this.showStockPriceData() : ''}</Row>
				
			</div>

		);
	}
}

App.propTypes = {
	setStockDetails: PropTypes.func
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
