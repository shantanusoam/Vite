import React, { useEffect, useState } from 'react';
import './App.css';
import InputField from './components/InputField';
import TodoList from './components/TodoList';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { Todo } from './models/models';
import { useLocalStorage } from './Hooks/useLocalStorage';
import { CSVLink } from 'react-csv';

const App: React.FC = () => {
  const [todo, setTodo] = useState<string>('');
  const [todos, setTodos] = useState<Array<Todo>>([]);
  const [CompletedTodos, setCompletedTodos] = useState<Array<Todo>>([]);
  const [LocalTodos, setLocalTodos] = useLocalStorage<string>(
    'LocalTodos',
    '[]'
  );
  const DeleteTasks = (e: React.FormEvent) => {
    e.preventDefault();
    setCompletedTodos([]);
    setTodos([]);
    setLocalTodos(JSON.stringify([]));
  };
  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(todos);
    console.log(CompletedTodos);
    console.log(todo);
    console.log(`LocalTodos: ${LocalTodos}`);

    if (todo) {
      setTodos([...todos, { id: Date.now(), todo, isDone: false }]);

      setTodo('');
      setLocalTodos(
        JSON.stringify([...todos, { id: Date.now(), todo, isDone: false }])
      );
    }
    e.preventDefault();
    console.log(todos);
    console.log(CompletedTodos);
    console.log(todo);
    console.log(`LocalTodos: ${LocalTodos}`);
  };
  useEffect(() => {
    console.log(LocalTodos);
    if (todos) {
      setTodos(JSON.parse(LocalTodos));
    }
  }, []);
  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;

    console.log(result);

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    let add;
    let active = todos;
    let complete = CompletedTodos;
    // Source Logic
    if (source.droppableId === 'TodosList') {
      add = active[source.index];
      active.splice(source.index, 1);
    } else {
      add = complete[source.index];
      complete.splice(source.index, 1);
    }

    // Destination Logic
    if (destination.droppableId === 'TodosList') {
      active.splice(destination.index, 0, add);
    } else {
      complete.splice(destination.index, 0, add);
    }

    setCompletedTodos(complete);
    setTodos(active);
  };
  const headers = [
    { label: 'Task', key: 'todo' },
    { label: 'Status', key: 'isDone' },
  ];
  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="App">
          <span className="heading">Task It Up</span>
          <div className="btnList">
            <CSVLink data={todos} headers={headers} filename="DailyTask.csv">
              <button className="btnList__btn-EX">Export</button>
            </CSVLink>
            <div>
              <button className="btnList__btn-DL" onClick={DeleteTasks}>
                DELETE
              </button>
              <p className="btnList__P">Delete all the Tasks</p>
            </div>
          </div>

          <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />

          <TodoList
            todos={todos}
            setTodos={setTodos}
            CompletedTodos={CompletedTodos}
            setCompletedTodos={setCompletedTodos}
            setLocalTodos={setLocalTodos}
          />
        </div>
      </DragDropContext>
    </>
  );
};

export default App;
