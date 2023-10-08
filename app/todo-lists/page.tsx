import { addTodoLists, getTodoLists } from '@/services/todo-lists/todoListService';
import TodoListPreview from '@/components/TodoListPreview';

type PageProps = {
  params: { slug: string };
  searchParams?: CreateTodoListDto;
};
const PATH = '/todo-lists'; // can't find a way to get it from next for now

export default function TodoList({ params, searchParams }: PageProps) {
  // this will be most likely replaced by next's server actions (it's not a stable feature yet)
  if (typeof searchParams?.name === 'string') {
    addTodoLists(searchParams);
  }
  const lists = getTodoLists().map(addUrl);
  return (
    <main className="flex min-h-screen flex-col items-start p-4">
      <h2 className="border text-center w-full text-xl">All your lists</h2>
      <div className="w-full border">
        <h4 className="border w-full">Add new list</h4>
        <form>
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

      <div className="w-full items-center border">{lists.map(TodoListPreview)}</div>
    </main>
  );
}

function addUrl(list: TodoList) {
  return { ...list, url: `${PATH}/${list.id}` };
}
