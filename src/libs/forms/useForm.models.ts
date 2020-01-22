import { ChangeEvent } from 'react';

import { Validator, Validation } from '.';

export class UseFormField<T = any> {
  constructor(public value: T, public errors: Validation[] = [], public valid = true) {}
}

export interface UseFormFields {
  [key: string]: UseFormField;
}

export interface UseFormFieldConfig<T = any> {
  value: T;
  validators?: Validator[];
}

export interface UseFormConfig {
  [key: string]: UseFormFieldConfig;
}

export type UseFormChangeEvent = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

export type UseFormSubmitEvent = ChangeEvent<HTMLFormElement>;

export type UseForm = [UseFormFields, (event: UseFormChangeEvent) => void, (event: UseFormSubmitEvent) => void];
