import React from 'react';
import './parsingResult.css';

interface ParsingResultProps {
	jsonData: BillData
}
interface Goods { 
	name: string;
	quantity: string;
	price_per_one: string;
	total_price: string;
}
interface BillData { 
	company_name: string;
	location: string;
	bill_number: string;
	bill_date: string;
	goods: Goods[];
	total_price: string;
}

const ParsingResult: React.FC<ParsingResultProps> = ({ jsonData }) => {
	

	return (
		<div className='parsing-result'>
			<h2 className='title'>Recognizing Result</h2>
			<div className='row-wrapper'>
				<p>Company Name:</p>
				<p>{jsonData.company_name}</p>
			</div>
			<div className='row-wrapper'>
				<p>Location:</p>
				<p>{jsonData.location}</p>
			</div>
			<div className='row-wrapper'>
				<p>Bill Number:</p>
				<p>{jsonData.bill_number}</p>
			</div>
			<div className='row-wrapper'>
				<p>Bill Date:</p>
				<p>{jsonData.bill_date}</p>
			</div>
			<div className='row-wrapper'>
				<p>Goods:</p>
				<div className='goods-wrapper'>
					{jsonData.goods.map((good, index) => (
						<div className='good-wrapper' key={index}>
							<div className='row-wrapper'>
								<p>Good</p>
								<p>{index + 1}</p>
							</div>
							<div className='row-wrapper'>
								<p>Name:</p>
								<p>{good.name}</p>
							</div>
							<div className='row-wrapper'>
								<p>Quantity:</p>
								<p>{good.quantity}</p>
								</div>
							<div className='row-wrapper'>
								<p>Price per one:</p>
								<p>{good.price_per_one}</p>
							</div>
							<div className='row-wrapper'>
								<p>Summary Price:</p>
								<p>{good.total_price}</p>
							</div>
						</div>
					))}
				</div>

			</div>
			<div className='row-wrapper'>
				<p>Total Price:</p>
				<p>{jsonData.total_price}</p>
			</div>
		</div>
	);
};

export default ParsingResult;