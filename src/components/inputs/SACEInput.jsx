import PropTypes from 'prop-types';
import React from 'react';
import { Form } from 'react-bootstrap';
import InputGroup, { InputGroupText } from 'react-bootstrap/InputGroup';

export default function SACEInput(props) {
    const {
        label,
        placeholder,
        onChange,
        value,
        onError,
        onErrorMessage,
        tipo
    } = props;

    return (
        <Form.Group>
            <Form.Label className="mb-1">
                {label}
            </Form.Label>
            <Form.Control 
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
