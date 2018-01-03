import React, { Component } from 'react';
import ko from 'knockout';
import { WithSubscriptions } from 'react-knockout';

const Todo = (title, state = 'undone') => ({ title, state });

const todos = ko.observableArray([Todo('foo')]);

const addTodo = value => todos.push(Todo(value));
const toggleState = todo =>
  todos.replace(todo, {
    ...todo,
    state: todo.state === 'done' ? 'undone' : 'done'
  });

export default class App extends Component {
  render() {
    return (
      <div>
        <form
          onSubmit={e => {
            e.preventDefault();
            if (e.target['todo-input'].value) {
              addTodo(e.target['todo-input'].value);
              e.target['todo-input'].value = '';
            }
          }}
        >
          <label htmlFor="todo-input">
            New todo
            <input type="text" id="todo-input" />
          </label>
          <button type="submit">Add todo</button>
        </form>
        <WithSubscriptions
          subscribe={{
            todos
          }}
          render={({ todos }) => (
            <ul>
              {todos.map((todo, index) => (
                <li
                  key={index}
                  onClick={() => {
                    toggleState(todo);
                  }}
                >
                  {todo.state === 'done' ? '☑️' : '⬜️'} {todo.title}
                </li>
              ))}
            </ul>
          )}
        />
      </div>
    );
  }
}
