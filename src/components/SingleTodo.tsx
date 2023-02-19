import React, { useEffect, useState } from 'react';
import { useRef } from 'react';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import { MdDone } from 'react-icons/md';
import { Todo } from '../models/models';
import { Draggable } from 'react-beautiful-dnd';

const SingleTodo: React.FC<{
  index: number;
  todo: Todo;
  todos: Array<Todo>;
  setTodos: React.Dispatch<React.SetStateAction<Array<Todo>>>;
  setLocalTodos: any;
}> = ({ index, todo, todos, setTodos, setLocalTodos }) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.todo);

  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);

  const handleEdit = (e: React.FormEvent, id: number) => {
    e.preventDefault();
    let SaveTodos_To_Reuse = todos.map((todo) =>
      todo.id === id ? { ...todo, todo: editTodo } : todo
    );
    setTodos(SaveTodos_To_Reuse);
    setLocalTodos(JSON.stringify(SaveTodos_To_Reuse));
    setEdit(false);
  };

  const handleDelete = (id: number) => {
    let SaveTodos_To_Reuse = todos.filter((todo) => todo.id !== id);
    setTodos(SaveTodos_To_Reuse);
    setLocalTodos(JSON.stringify(SaveTodos_To_Reuse));
  };

  const handleDone = (id: number) => {
    let SaveTodos_To_Reuse = todos.map((todo) =>
      todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
    );
    setTodos(SaveTodos_To_Reuse);
    setLocalTodos(JSON.stringify(SaveTodos_To_Reuse));
  };

  return (
    <Draggable draggableId={todo.id.toString()} index={index}>
      {(provided, snapshot) => (
        <form
          onSubmit={(e) => handleEdit(e, todo.id)}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className={`todos__single ${snapshot.isDragging ? 'drag' : ''}`}
        >
          {edit ? (
            <input
              value={editTodo}
              onChange={(e) => setEditTodo(e.target.value)}
              className="todos__single--text"
              ref={inputRef}
            />
          ) : todo.isDone ? (
            <s className="todos__single--text">{todo.todo}</s>
          ) : (
            <span className="todos__single--text">{todo.todo}</span>
          )}
          <div>
            <span
              className="icon"
              onClick={() => {
                if (!edit && !todo.isDone) {
                  setEdit(!edit);
                }
              }}
            >
              <AiFillEdit />
            </span>
            <span className="icon" onClick={() => handleDelete(todo.id)}>
              <AiFillDelete />
            </span>
            <span className="icon" onClick={() => handleDone(todo.id)}>
              <MdDone />
            </span>
          </div>
        </form>
      )}
    </Draggable>
  );
};

export default SingleTodo;
