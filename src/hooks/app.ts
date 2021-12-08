import { useState, ChangeEventHandler } from 'react';
import { useLocalStorage } from 'react-use';
import { v4 as uuidv4 } from 'uuid';

// ui state
export const useTextInput = (initValue = '') => {
  const [value, setValue] = useState(initValue);
  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(e.target.value);
  };
  const reset = (resetValue = '') => setValue(resetValue);
  return { value, onChange, reset };
};

// ui state
export const useTodoCreateForm = () => {
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
export type TodoData = {
  title: string;
  completed: boolean;
};

export type Todo = {
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

// app
export const useApp = () => {
  const todoCreateForm = useTodoCreateForm();
  const todoRepository = useTodoRepository();

  // usecase
  const addTodo = () => {
    todoRepository.createTodo({
      newData: {
        title: todoCreateForm.titleInput.value,
        completed: false,
      },
    });
    todoCreateForm.reset();
  };

  const removeTodo = (id: string) => {
    // if (!window.confirm('削除します。よろしいですか？')) return;
    todoRepository.deleteTodo({ id });
  };

  return {
    todos: todoRepository.todos,
    todoCreateForm,
    addTodo,
    removeTodo,
  };
};
