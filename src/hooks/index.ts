import { ChangeEventHandler, FormEventHandler, useState } from 'react';
import { useLocalStorage } from 'react-use';
import { v4 as uuidv4 } from 'uuid';

// common
export const useTextInput = (initValue = '') => {
  const [value, setValue] = useState(initValue);
  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(e.target.value);
  };
  const reset = (resetValue = '') => setValue(resetValue);
  return { value, onChange, reset };
};

// form state
export const useTodoCreateFormState = () => {
  const titleInput = useTextInput();
  const reset = () => {
    titleInput.reset();
  };
  return {
    titleInput,
    reset,
  };
};

// repository
type TodoData = {
  title: string;
  completed: boolean;
};

type Todo = {
  id: string;
  title: string;
  completed: boolean;
};

export const useTodoRepository = () => {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);

  const createTodo = (payload: { newData: TodoData }) => {
    setTodos(todos && [...todos, { ...payload.newData, id: uuidv4() }]);
  };

  const updateTodo = (paylaod: { id: string; editData: TodoData }) => {
    setTodos(
      todos?.filter((todo) =>
        todo.id === paylaod.id ? { ...todo, ...paylaod.editData } : todo
      )
    );
  };

  const deleteTodo = (paylaod: { id: string }) => {
    setTodos(todos?.filter((todo) => todo.id !== paylaod.id));
  };

  return {
    todos,
    createTodo,
    updateTodo,
    deleteTodo,
  };
};

// app page
export const useAppPage = () => {
  const todoCreateFormState = useTodoCreateFormState();
  const todoRepository = useTodoRepository();

  // usecase
  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    todoRepository.createTodo({
      newData: {
        title: todoCreateFormState.titleInput.value,
        completed: false,
      },
    });
    todoCreateFormState.reset();
  };

  return {
    todos: todoRepository.todos,
    todoCreateFormState,
    onSubmit,
    onRemove: todoRepository.deleteTodo,
  };
};
