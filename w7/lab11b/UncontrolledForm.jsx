import { useState } from 'react';

const UncontrolledForm = (props) => {

	const handleSubmit = (e) => {
		e.preventDefault();
		let values = `Current values are
				
				`;
		alert(values);
	}

   return (
		<form className="container" onSubmit={handleSubmit}>
			<fieldset id="box" className="has-background-white-ter">
				<legend className="is-size-5">Uncontrolled Components (DOM handles form state)</legend>
				<label className="label">Company Name</label>
				<input className="input" type="text"  />
				<label className="label">Sector</label>
				<div className="select">
					<select  >
						<option>Select a sector</option>
						<option>Advertising</option>
						<option>Information Technology</option>
						<option>Telecommunications</option>
						<option>Textbooks</option>
					</select>       
				</div>
				<label className="label">Comments</label>
				<textarea className="textarea"  ></textarea>
				<button className="button is-link">Submit</button>
			</fieldset>                                   
		</form>
	);

}


export default UncontrolledForm;