import React, {
  ChangeEventHandler,
  FormEventHandler,
  MouseEventHandler,
  VFC,
} from 'react';
import { IconButton, ListGroup, ListItem, TextInput } from './components';
import { Todo, useApp } from './hooks/app';

// depend on todo
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

// depend on todo
type TodoItemProps = {
  todo: Todo;
  onClickRemove: MouseEventHandler;
};

const TodoItem: VFC<TodoItemProps> = ({ todo, onClickRemove }) => {
  return (
    <div className="flex justify-between items-center space-x-2">
      <div>{todo.title}</div>
      <IconButton onClick={onClickRemove}>
        <svg
          className="h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
        </svg>
      </IconButton>
    </div>
  );
};

// app
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
