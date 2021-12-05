import React, { ChangeEventHandler, FormEventHandler, VFC } from 'react';
import useInput from './hooks/useInput';

const App: VFC = function () {
  const newTodoInput = useInput();
  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    console.log(newTodoInput.value);
    newTodoInput.reset();
  };

  return (
    <div className="my-5 mx-auto" style={{ width: '480px' }}>
      <form onSubmit={onSubmit}>
        <TextInput
          value={newTodoInput.value}
          onChange={newTodoInput.onChange}
        />
      </form>
    </div>
  );
};

export default App;

type TextInputProps = {
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
};

const TextInput: VFC<TextInputProps> = (props) => {
  return (
    <div className="form-control">
      <input type="text" className="input input-bordered" {...props} />
    </div>
  );
};
