import React from 'react';
import { Form } from 'react-bootstrap';
import Select from 'react-select';

export default function SACESelect(props) {
    const {
        label,
        onChange,
        value,
        onError,
        onErrorMessage,
        selectedOption,
        options,
        isDisabled,
    } = props;

    return (
        <Form.Group>
            <Form.Label className="mb-1">
                {label}
            </Form.Label>
            <Select
                onChange={onChange}
                selectedOption={selectedOption}
                options={options && options.length && options.map(option => ({ value: option.id, label: option.nome}))}
                value={value}
                isDisabled={isDisabled}
            />
            {onError && 
                <Form.Text className="text-danger">
                    {onErrorMessage}
                </Form.Text>
            }
        </Form.Group>
    );
}
