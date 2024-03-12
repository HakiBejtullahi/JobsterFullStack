const FormRow = ({ handleChange, name, type, value, labelText }) => {
  return (
    <li className='form-row'>
      <label htmlFor={name} className='form-label'>
        {labelText || name}
      </label>
      <input
        type={type}
        id={name}
        value={value}
        className='form-input'
        onChange={handleChange}
        name={name}
      />
    </li>
  );
};

export default FormRow;
