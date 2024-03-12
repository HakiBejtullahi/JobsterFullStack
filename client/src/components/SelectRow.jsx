const SelectRow = ({ handleChange, name, options, value, labelText }) => {
  return (
    <li className='form-row'>
      <label htmlFor={name} className='form-label'>
        {labelText ? labelText : name}
      </label>
      <select
        name={name}
        id={name}
        value={value}
        onChange={handleChange}
        className='form-select'
      >
        {options.map((itemValue, index) => {
          return (
            <option value={itemValue} key={index}>
              {itemValue}
            </option>
          );
        })}
      </select>
    </li>
  );
};

export default SelectRow;
