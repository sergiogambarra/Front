import PropTypes from 'prop-types';
import React from 'react';
import { Form } from 'react-bootstrap';

export default function SACEInput(props) {
    const {
        label,
        placeholder,
        onChange,
        value,
        onError,
        onErrorMessage,
        tipo,
        min
    } = props;

    return (
        <Form.Group>
            <Form.Label className="mb-1">
                {label}
            </Form.Label>
            <Form.Control 
                min={min}
                type={tipo}  
                placeholder={placeholder}
                onChange={onChange}
                value={value}
            />
            {onError && 
                <Form.Text className="text-danger">
                    {onErrorMessage}
                </Form.Text>
            }
        </Form.Group>
        
    );
}

SACEInput.propTypes = {
    tipo: PropTypes.string
}
SACEInput.defaultProps = {
    tipo:"text"
}
