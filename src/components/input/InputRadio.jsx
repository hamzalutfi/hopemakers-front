import React from 'react';

const InputRadio = ({labelTitle, id, name, value }) => (
    <>
        <input type="radio" id={id} name={name} value={value} />
        <label htmlFor={id}>{value}</label>
    </>
);

export default InputRadio;
