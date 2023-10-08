import { getTodoLists } from '@/services/todo-lists/todoListService';
import TodoListPreview from '@/components/TodoListPreview';
import { PATH } from '@/app/todo-lists/common';
import { create } from '@/app/todo-lists/actions';

export default function TodoList() {
  return (
    <main className="flex min-h-screen flex-col items-start p-4">
      <h2 className="border text-center w-full text-xl">All your lists</h2>
      <div className="w-full border">
        <h4 className="border w-full">Add new list</h4>
        <form action={create}>
          <div>
            <label htmlFor="new-todo-list-name" className="">
              List name
            </label>
            <input type="text" id="new-todo-list-name" name="name" className="border" placeholder={'todo list name'} defaultValue={'list name'} />
          </div>
          <button type="submit" className="border-2">
            Add
          </button>
        </form>
      </div>

      <div className="w-full items-center border">{getTodoLists().map(toTodoListPreview)}</div>
    </main>
  );
}

function toTodoPreviewListProps(list: TodoList) {
  return { ...list, url: `${PATH}/${list.id}`, key: list.id };
}

function toTodoListPreview(todoList: TodoList) {
  return <TodoListPreview {...toTodoPreviewListProps(todoList)} />;
}
