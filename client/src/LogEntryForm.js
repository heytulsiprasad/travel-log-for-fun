import React, { useState } from "react";
import { useForm } from "react-hook-form";

import { createLogEntry } from "./api";

const LogEntryForm = ({ location, onClose }) => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	const { register, handleSubmit } = useForm();

	const onSubmit = (data) => {
		// console.log(data);
		data.latitude = location.latitude;
		data.longitude = location.longitude;
		createLogEntry(data)
			.then((res) => {
				console.log(res);
				onClose();
			})
			.catch((err) => {
				setError(err);
				console.log(err);
				setLoading(false);
			});
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="entry-form">
			{error ? <h3 className="error">{error}</h3> : null}
			<label htmlFor="title">Title</label>
			<input type="text" name="title" required ref={register} />
			<label htmlFor="comments">Comments</label>
			<textarea type="text" name="comments" rows={3} ref={register} />
			<label htmlFor="description">Description</label>
			<input type="text" name="description" />
			<label htmlFor="image">Image</label>
			<input type="text" name="image" ref={register} />
			<label htmlFor="visitDate">Visit Date</label>
			<input type="date" name="visitDate" required ref={register} />
			<button disabled={loading}>
				{loading ? "Loading..." : "Update Database"}
			</button>
		</form>
	);
};

export default LogEntryForm;
