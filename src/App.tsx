import React, { VFC } from 'react';
import { TextInput } from './components';
import { useAppPage } from './hooks';

const App: VFC = function () {
  const { todos, todoCreateFormState, onSubmit, onRemove } = useAppPage();

  return (
    <div className="my-5 mx-auto" style={{ width: '480px' }}>
      <form onSubmit={onSubmit}>
        <TextInput
          value={todoCreateFormState.titleInput.value}
          onChange={todoCreateFormState.titleInput.onChange}
        />
      </form>

      {todos?.map((todo) => (
        <div key={todo.id} className="flex space-x-2">
          <div>{todo.title}</div>
          <button onClick={() => onRemove({ id: todo.id })}>remove</button>
        </div>
      ))}
    </div>
  );
};

export default App;
