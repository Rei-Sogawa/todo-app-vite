import React, { ChangeEventHandler, VFC } from 'react';
import useInput from './hooks/useInput';

const App: VFC = function () {
  const newTodoInput = useInput();
  return (
    <div className="my-5 mx-auto" style={{ width: '480px' }}>
      <form
        onSubmit={(e) => {
          console.log();
        }}
      >
        <TextInput {...newTodoInput} />
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
      <input
        type="text"
        className="input input-primary input-bordered"
        {...props}
      />
    </div>
  );
};
