import PropTypes from 'prop-types';
import React from 'react';
import { Form } from 'react-bootstrap';

export default function SACEInput(props) {
    const {
        type,
        label,
        placeholder,
        onChange,
        value,
        onError,
        onErrorMessage,
        tipo,
        min,
        className,
        disabled,
        size,
        autoFocus,
    } = props;

    return (
        <Form.Group>
            <Form.Label className="mb-1">
                {label}
            </Form.Label>
            <Form.Control 
                min={min}
                type={type}
                tipo={tipo}  
                autoFocus={autoFocus}
                placeholder={placeholder}
                onChange={onChange}
                value={value}
                className={className}
                disabled={disabled}
                sise={size}
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
