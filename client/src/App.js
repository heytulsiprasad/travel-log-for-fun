import React, { useState, useEffect } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";

import { listLogEntries } from "./api";
import LogEntryForm from "./LogEntryForm";

const App = () => {
	const [logEntries, setLogEntries] = useState([]);
	const [showPopup, setShowPopup] = useState({});
	const [addEntryLocation, setAddEntryLocation] = useState(null);

	const [viewport, setViewport] = useState({
		width: "100vw",
		height: "100vh",
		latitude: 37.7577,
		longitude: -122.4376,
		zoom: 2,
	});

	const getEntries = async () => {
		const logEntries = await listLogEntries();
		setLogEntries(logEntries);
	};

	useEffect(() => {
		(async () => {
			const logEntries = await listLogEntries();
			setLogEntries(logEntries);
			// console.log(logEntries);
		})();
	}, []);
	// [] makes it run only once: like compDidMount

	const showAddMarkerPopup = (event) => {
		// console.log(event);
		const [longitude, latitude] = event.lngLat;
		setAddEntryLocation({ latitude, longitude });
	};

	return (
		<ReactMapGL
			{...viewport}
			mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
			mapStyle="mapbox://styles/tulsi-prasad/ckcnpa9dw1fhh1iqnibytaap6"
			onViewportChange={(nextViewport) => setViewport(nextViewport)}
			onDblClick={showAddMarkerPopup}
		>
			{logEntries.map((entry) => (
				<React.Fragment key={entry._id}>
					<Marker
						latitude={entry.latitude}
						longitude={entry.longitude}
						offsetLeft={-12}
						offsetTop={-24}
					>
						<div onClick={() => setShowPopup({ showPopup, [entry._id]: true })}>
							<img
								className="marker"
								style={{
									height: `${12 * viewport.zoom}px`,
									width: `${12 * viewport.zoom}px`,
								}}
								src="https://i.imgur.com/y0G5YTX.png"
								alt="marker"
							/>
						</div>
					</Marker>
					{showPopup[entry._id] ? (
						<Popup
							latitude={entry.latitude}
							longitude={entry.longitude}
							dynamicPosition={true}
							closeButton={true}
							closeOnClick={false}
							onClose={() =>
								setShowPopup({
									...showPopup,
									[entry._id]: false,
								})
							}
							anchor="top"
						>
							<div className="popup">
								<h3>{entry.title}</h3>
								<p>{entry.comments}</p>
								<small>
									Visited on: {new Date(entry.visitDate).toLocaleDateString()}
								</small>
								{entry.image && <h1>Image provided!</h1>}
							</div>
						</Popup>
					) : null}
				</React.Fragment>
			))}
			{addEntryLocation ? (
				<React.Fragment>
					<Marker
						latitude={addEntryLocation.latitude}
						longitude={addEntryLocation.longitude}
					>
						<div>
							<img
								className="marker"
								style={{
									height: `${12 * viewport.zoom}px`,
									width: `${12 * viewport.zoom}px`,
								}}
								src="https://i.imgur.com/y0G5YTX.png"
								alt="marker"
							/>
						</div>
					</Marker>
					<Popup
						latitude={addEntryLocation.latitude}
						longitude={addEntryLocation.longitude}
						dynamicPosition={true}
						closeButton={true}
						closeOnClick={false}
						onClose={() => setAddEntryLocation(null)}
						anchor="top"
					>
						<div className="popup">
							<LogEntryForm
								onClose={() => {
									setAddEntryLocation(null);
									getEntries();
								}}
								location={addEntryLocation}
							/>
						</div>
					</Popup>
				</React.Fragment>
			) : null}
		</ReactMapGL>
	);
};

export default App;
