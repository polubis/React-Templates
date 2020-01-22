import { useState } from 'react';

import { UseFormConfig, UseFormField, UseFormFields, UseForm, UseFormChangeEvent, UseFormSubmitEvent } from '.';

const _createInitState = (config: UseFormConfig): UseFormFields =>
  Object.keys(config).reduce((prev, key) => ({ ...prev, [key]: new UseFormField(config[key].value) }), {});

/**
 * Hook created for forms state management purposes.
 * @param `config` - needed for initial state creation
 * @returns Returns fields state and functions to change state
 */
const useForm = (config: UseFormConfig): UseForm => {
  const [fields, setFields] = useState(_createInitState(config));

  /**
   * Changes single field state and validates.
   * @param `event` - change event object
   */
  const handleChange = (event: UseFormChangeEvent) => {
    const {
      target: { value, dataset }
    } = event;
    const fieldKey = dataset.fieldKey;

    if (!fieldKey) {
      throw new Error('Attribute data-field-key is missing');
    }

    const { validators = [] } = config[fieldKey];
    const errors = validators.map(fn => fn(value, fieldKey));
    const valid = errors.every(({ valid }) => valid);

    setFields({ ...fields, [fieldKey]: new UseFormField(value, errors, valid) });
  };

  /**
   * Validates fields and changes state.
   * @param `event` - form change event object
   */
  const handleSubmit = (event: UseFormSubmitEvent) => {
    event.preventDefault();
  };

  return [fields, handleChange, handleSubmit];
};

export default useForm;
