import { TextInput } from '@patternfly/react-core';
import * as React from 'react';

export interface IEditableInputProps<T = any> {
  type: string;
  value: T;
  id: string;
  onChange?: (event: any) => {}
}

export const EditableInput: React.FunctionComponent<
  IEditableInputProps
> = props => {
  const { id, value, onChange, ...field } = props;

  const handleChange = (
    _: string,
    event: React.FormEvent<HTMLInputElement>
  ) => {
    onChange(event);
  };

  return (
    <TextInput
      {...field}
      value={value}
      data-testid={id}
      id={id}
      type={(props.type || 'text') as any}
      onChange={handleChange}
    />
  );
};
