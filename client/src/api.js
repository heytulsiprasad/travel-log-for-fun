const API_URL = "http://localhost:1992";

const listLogEntries = async () => {
	const response = await fetch(`${API_URL}/api/logs`);
	return response.json();
};

const createLogEntry = async (entry) => {
	const response = await fetch(`${API_URL}/api/logs`, {
		method: "POST",
		headers: {
			"content-type": "application/json",
		},
		body: JSON.stringify(entry),
	});

	return response.json();
};

module.exports = { listLogEntries, createLogEntry };
