import React from 'react';

class FiveOhThree extends React.Component {
	static propTypes = {
		// no props
	}

	render() {
		return (
			<div className="fiveOhThree">
				<h3>Service Unavailable</h3>
				<p>Ugh. We're sorry, something's wrong with our servers at the moment. try checking out <a href="http://status.ivymdl.com">our status page</a> for more info.</p>
			</div>
		);
	}
}

export default FiveOhThree;