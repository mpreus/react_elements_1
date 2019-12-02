/* element of the shopping basket with limited number of things to be bought, conditional rendering and basic style */
const HeaderElement = () => {
	return (
		<div className="item">
			<img src="../img/67225.jpg" alt="CD picture"/>
			<div>
				<h3>Electro music CD</h3>
				<p>music for demanding listeners</p>
			</div>
		</div>
	)
}

const BasketName = () => {
	return (
		<h2>Your basket</h2>
	)
}

class App extends React.Component {
	state = {
		availableProducts: 7,
		shoppingCart: 0
	}

	handleRemoveFromCart = () => {
		this.setState({ 		/* each click takes one thing from the cart: */
			shoppingCart: this.state.shoppingCart - 1,
		})
	}
	handleAddToCart = () => {
		this.setState({ 		/* each click adds one thing to the cart: */
			shoppingCart: this.state.shoppingCart + 1,
		})
	}

	/* updates 'availableProducts' when 'buy now' button clicked and empties 'shoppingCart' */
	/* this makes impossible buying more then there is available */
	handlePurchase = () => {
		this.setState({
			availableProducts: this.state.availableProducts - this.state.shoppingCart,
			shoppingCart: 0
		})
	}

	render() {
		/* to avoid in-line styles in full, we can use an auxiliary variable to put it in 'span' element: */
		const spanStyle = this.state.shoppingCart === 0 ? {opacity:0.3} : {};

		return (
			<React.Fragment>
				<BasketName />
				<HeaderElement />
				<div> 		{/* first button must be disabled when shopping cart is empty */}
					<p>Add amount ({this.state.availableProducts} left in stock):</p>
					<button disabled={this.state.shoppingCart === 0 ? true : false} onClick={this.handleRemoveFromCart}>-</button>
					{/* to make the number of things grey we use inline style: */}
					<span style={ spanStyle }>{this.state.shoppingCart}</span> {/* takes the value from the state */}
					<button disabled={this.state.shoppingCart >= this.state.availableProducts ? true : false} onClick={this.handleAddToCart}>+</button>
							{/* this button must be disabled when the number if things in the cart reaches the limit */}
					<br></br>
				{/* additional button that enables user to buy his staff: */}
					{this.state.shoppingCart > 0 && <button className="buyNowButton" onClick={this.handlePurchase}>Buy now</button>}
				{/* if there is 'false' in the first condition, JS does nothing */}
				{/* if there is 'true' in the first condition, JS runs further and sees 'button' to render, so react renders it */}
				</div>
			</React.Fragment>
		);
	}
}

ReactDOM.render(
	<App />,
	document.getElementById("root")
)