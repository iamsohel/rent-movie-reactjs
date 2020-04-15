
import React from 'react';
const Input = ({name, label, error,disabled=false, ...rest}) => {
    return (  
        <div className="form-group">
            <label htmlFor={name}>{label}</label>
            <input {...rest}
                name={name}
                className="form-control" 
                id={name} 
                disabled={disabled ? 'disabled': ''}
                placeholder=""/>
               { error &&  <div  className="alert alert-danger">{error}</div>}
        </div>
    );
};
 
export default Input;