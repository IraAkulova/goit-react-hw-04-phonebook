import PropTypes from 'prop-types';

export const Filter = ({ value, onChange }) => {
  return (
    <label>
          Find contacts by name
          <br></br>
      <input type="text" value={value} onChange={onChange}></input>
    </label>
  );
};

Filter.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
};