<script lang="ts">
  export let addTodoItem,allCompleted,doAllCompleted;
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
        if(newTodo.trim()){
            addTodoItem(newTodo);
        }
      newTodo = "";
    }
  };
  let newTodo: string = "";
</script>

<div class="min-w-fit relative border-b-[1px] border-solid border-[#ededed]">
  <h1 class="w-fit mx-auto text-[rgba(175,47,47,0.15)] text-[100px]">todos</h1>
  <input
    class=" w-[550px] h-[65px] p-[16px] pl-[60px] outline-none bg-[#fefefe] text-[24px] text-[#e6e6e6] focus:text-black rounded-sm shadow-main"
    autofocus
    autocomplete="off"
    placeholder="请写下你的任务!"
    bind:value={newTodo}
    on:keydown={handleKeyDown}
  />
  <div
    class="w-fit mx-auto absolute bottom-[15px] left-[18px] text-[22px] text-[#e6e6e6] rotate-90 cursor-pointer {allCompleted ? 'text-[#737373]':''}"
  on:click={doAllCompleted}>
    ❯
  </div>
</div>
