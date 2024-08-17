import '../styles/leadForm.css'
import { useState } from "react";


const LeadForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    number: "",
    product: "",
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    let errors = {};
    if (!formData.email) errors.email = "Email is required";
    if (!formData.name) errors.name = "Name is required";
    if (!formData.number) errors.number = "Number is required";
    if (!formData.product) errors.product = "Product is required";
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }
    onSubmit(formData);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="card">
      <div className="card-header">
        <div className="card-title">Create a New Lead</div>
        <div className="card-description">Fill out the form to get started</div>
      </div>

      <div className="card-content">
        <form onSubmit={handleSubmit} className="grid">
          <div className="field">
            <label className='label' htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              id="name"
              className='input'
            />
            {errors.name && <p className="errors">*{errors.name}</p>}
          </div>
          <div className="field">
            <label htmlFor="email" className='label'>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              id="email"
              className='input'
            />
            {errors.email && <p className="errors">*{errors.email}</p>}
          </div>
          <div className="field">
            <label htmlFor="phone" className='label'>Phone Number</label>
            <input
              type="text"
              name="number"
              placeholder="Number"
              value={formData.number}
              onChange={handleChange}
              id="phone"
              className='input'
            />
            {errors.number && <p className="errors">*{errors.number}</p>}
          </div>
          <div className="field">
            <label htmlFor="product" className='label'>Product</label>
            <select
              name="product"
              value={formData.product}
              onChange={handleChange}
              id="product"
              className='select'
            >
              <option value="" disabled>
                Select a product
              </option>
              <option value="Product A">Product A</option>
              <option value="Product B">Product B</option>
              <option value="Product C">Product C</option>
            </select>

            {errors.product && <p className="errors">*{errors.product}</p>}
          </div>

          <div className="card-footer">
            <button className="btn-primary" type="submit">
              Create Lead
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LeadForm;
