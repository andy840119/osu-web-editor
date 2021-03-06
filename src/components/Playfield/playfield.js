/**
  * playfield.js
  *
  * Grid and Hitobjects
  */

import React from 'react';
import Grid from './grid.js';
import PlayfieldCircle from '../HitObjects/playfieldcircle.js';
import PlayfieldSlider from '../HitObjects/playfieldslider.js';
import PlayfieldSpinner from '../HitObjects/playfieldspinner.js';

export default class Playfield extends React.Component {
	render() {
		const currentTime = this.props.currentTime;
		const VISIBLE_RANGE = 750;
		const VISIBLE_START = Math.max(this.props.currentTime - VISIBLE_RANGE, 0);
		const VISIBLE_END = this.props.currentTime + VISIBLE_RANGE;
		const visibleObjects = this.props.objects.filter((object) => { // Get objects that show up near current time
			if (object.objectName === 'circle') {
				return (object.startTime > VISIBLE_START) && (object.startTime < VISIBLE_END);
			}
			else {
				return (object.startTime < VISIBLE_END) && (object.endTime > VISIBLE_START);
			}
		}).map((object) => { // Map these objects to object types
			switch(object.objectName) {
			case 'circle':
				return <PlayfieldCircle
							key={object.startTime}
							currentTime={currentTime}
							circleSize={this.props.circleSize}
							approachTime={this.props.approachTime}
							x={object.position[0]}
							y={object.position[1]}
							time={object.startTime}
							visibleRange={VISIBLE_RANGE}
						/>;
			case 'slider':
				return <PlayfieldSlider
							key={object.startTime}
							currentTime={currentTime}
							circleSize={this.props.circleSize}
							approachTime={this.props.approachTime}
							time={object.startTime}
							type={object.curveType}
							points={object.points}
							length={object.pixelLength}
							duration={object.duration}
							repeats={object.repeatCount}
							visibleRange={VISIBLE_RANGE}
						/>;
				// Use slider velocity or duration?
			case 'spinner':
				return <PlayfieldSpinner
							key={object.startTime}
							currentTime={currentTime}
							time={object.startTime}
							end={object.endTime}
						/>;
			case 'unknown':
			default:
				console.error('Playfield.js error: Error in hitobject.');
				console.error(object);
			}
		});
		return (
			<div className="playfield">
				{/* Playfield is 512x384
				  * Add 55opx margin for CS0 going beyond
				  */}
				<svg height="100%" viewBox="-40 -40 592 464">
					<rect x="0" y="0" width="512" height="384"
					fill="black" fillOpacity="0.2"/>
					<line x1="0" x2="512" y1="192" y2="192"
					stroke="black" strokeWidth="0.5" strokeOpacity="0.5" />
					<line x1="256" x2="256" y1="0" y2="384"
					stroke="black" strokeWidth="0.5" strokeOpacity="0.5" />
					<Grid />
					{visibleObjects}
				</svg>
			</div>
		);
	}
}

Playfield.propTypes = {
	currentTime: React.PropTypes.number,
	objects: React.PropTypes.arrayOf(React.PropTypes.object),
	circleSize: React.PropTypes.number,
	approachTime: React.PropTypes.number
};