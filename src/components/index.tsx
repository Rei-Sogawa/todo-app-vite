import React, { ChangeEventHandler, VFC } from 'react';

export type TextInputProps = {
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
};

export const TextInput: VFC<TextInputProps> = (props) => {
  return (
    <div className="form-control">
      <input type="text" className="input input-bordered" {...props} />
    </div>
  );
};
