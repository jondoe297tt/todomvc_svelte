<script lang="ts">
  import Header from "./lib/Header.svelte";
  import TodoItem from "./lib/TodoItem.svelte";
  import Footer from "./lib/Footer.svelte";
  import { onDestroy } from "svelte";
  class Todo {
    id: number = Date.now();
    content: string;
    isCompelte: boolean = false;
    constructor(content: string) {
      this.content = content;
    }
  }
  let todoItemList: Array<Todo> =
    JSON.parse(localStorage.getItem("todoItemList")) || [];
  //添加一项todo
  const addTodoItem = (content: string) => {
    const todoItem = new Todo(content);
    todoItemList = [...todoItemList, todoItem];
    console.log(todoItemList);
  };
  //移除一项
  const removeItem = (id: number) => {
    todoItemList = todoItemList.filter((item) => item.id != id);
  };
  //完成一项
  const completeItem = (id: number) => {
    todoItemList = todoItemList.map((item, index) => {
      if (item.id === id) {
        todoItemList[index].isCompelte = !todoItemList[index].isCompelte;
      }
      return item;
    });
  };
  //全选
  $: allCompleted =
    todoItemList.length != 0 && todoItemList.every((item) => item.isCompelte);

  const doAllCompleted = () => {
    todoItemList = todoItemList.map((item) => {
      item.isCompelte = !allCompleted;
      return item;
    });
  };
  //未完成的数量
  $: unCompletedNum = todoItemList.reduce((pre, cur) => {
    if (cur.isCompelte) {
      return pre;
    }
    return ++pre;
  }, 0);

  let filterType = 0;
  $: FilterList = (function () {
    switch (filterType) {
      case 0:
        return todoItemList;
      case 1:
        return todoItemList.filter((item) => !item.isCompelte);
      case 2:
        return todoItemList.filter((item) => item.isCompelte);
    }
  })();
  //过滤
  const handleFilter = (event) => {
    filterType = event.detail.type;
  };
  //删除已完成
  const clearCompleted = () => {
    todoItemList = todoItemList.filter((item) => !item.isCompelte);
  };

  //修改item
  const updateItem = (id: number, event) => {
    todoItemList = todoItemList.map((item) => {
      if (item.id === id) {
        item.content = event.detail.content;
      }
      return item;
    });
  };
  //持久化存储
  window.addEventListener("beforeunload", () => {
    localStorage.setItem("todoItemList", JSON.stringify(todoItemList));
  });
</script>

<header class="w-fit relative mx-auto">
  <Header {addTodoItem} {allCompleted} {doAllCompleted} />
</header>
<main class="w-fit relative mx-auto shadow-main">
  <ul>
    {#each FilterList as todoItem (todoItem.id)}
      <li>
        <TodoItem
          {todoItem}
          {removeItem}
          {completeItem}
          on:update={function (event) {
            updateItem(todoItem.id, event);
          }}
        />
      </li>
    {/each}
  </ul>
  {#if todoItemList.length}
    <Footer on:filter={handleFilter} {unCompletedNum} {clearCompleted} />
  {/if}
</main>

<style>
</style>
