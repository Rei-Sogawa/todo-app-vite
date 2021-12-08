import React, {
  ChangeEventHandler,
  FormEventHandler,
  MouseEventHandler,
  VFC,
} from 'react';
import { Button, ListGroup, ListItem, TextInput } from './components';
import { Todo, useApp } from './hooks/app';

type TodoCreateFormProps = {
  titleInput: {
    value: string;
    onChange: ChangeEventHandler<HTMLInputElement>;
  };
  onSubmit: FormEventHandler<HTMLFormElement>;
};

const TodoCreateForm: VFC<TodoCreateFormProps> = ({ titleInput, onSubmit }) => {
  return (
    <form onSubmit={onSubmit}>
      <TextInput value={titleInput.value} onChange={titleInput.onChange} />
    </form>
  );
};

type TodoItemProps = {
  todo: Todo;
  onClickRemove: MouseEventHandler;
};

const TodoItem: VFC<TodoItemProps> = ({ todo, onClickRemove }) => {
  return (
    <div className="flex justify-between items-center">
      <div>{todo.title}</div>
      <Button onClick={onClickRemove}>
        <div className="text-gray-500">Remove</div>
      </Button>
    </div>
  );
};

const App: VFC = function () {
  const { todos, todoCreateForm, addTodo, removeTodo } = useApp();

  return (
    <div className="my-5 mx-auto space-y-2" style={{ width: '480px' }}>
      <TodoCreateForm
        onSubmit={(e) => {
          e.preventDefault();
          addTodo();
        }}
        titleInput={todoCreateForm.titleInput}
      />

      {todos && todos.length > 0 && (
        <ListGroup>
          {todos.map((todo) => (
            <ListItem key={todo.id}>
              <TodoItem todo={todo} onClickRemove={() => removeTodo(todo.id)} />
            </ListItem>
          ))}
        </ListGroup>
      )}
    </div>
  );
};

export default App;
