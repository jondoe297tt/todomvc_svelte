<script lang="ts">
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
  export let todoItem, removeItem, completeItem;
  //完成
  const handleComplete = () => {
    completeItem(todoItem.id);
  };
  //判断编辑
  let editable = false;
  const completeClass = "line-through text-[#d9d9d9]";
  //提交编辑
  function submitChange() {
    dispatch("update", {
      content: editValue,
    });
    editable = false;
  }
  //监听键盘事件
  function handleKeydown(event){
    if(event.key === "Enter"){
      event.target.blur()
    }else if(event.key === "Escape"){ 
      editValue=todoItem.content
      event.target.blur();
    }
  }
  let editValue = todoItem.content;
</script>

<div
  class="w-[550px] h-[65px] text-left text-[24px] border-b-[1px] border-solid border-[#ededed] bg-[#fefefe] relative leading-[65px]"
  on:dblclick={() => {
    editable = true;
    editValue = todoItem.content;
  }}
>
  {#if !editable}
    <input
      class="toggle w-[40px] h-[40px] appearance-none"
      type="checkbox"
      checked={todoItem.isCompelte}
      on:click={handleComplete}
    />
    <label
      class="absolute left-0 pl-[60px] pointer-events-none {todoItem.isCompelte
        ? completeClass
        : ''} transition-all duration-500"
    >
      {todoItem.content}
    </label>
    <button
      class="absolute right-[21px] text-[#cc9a9a] hover:text-[#af5b5e]"
      on:click={removeItem(todoItem.id)}
    >
      ×
    </button>
  {:else}
    <input
      autofocus
      class="w-[500px] ml-[50px] px-[7px] outline-none border-[1px] border-solid border-[#999] shadow-[inset_0_-1px_5px_0_rgba(0,_0,_0,_0.2)]"
      type="text"
      bind:value={editValue}
      on:focusout ={submitChange}
      on:keydown={handleKeydown}
    />
  {/if}
</div>

<style>
  label {
    background-image: url("data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23ededed%22%20stroke-width%3D%223%22/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: center left;
  }
  .toggle:checked + label {
    background-image: url("data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23bddad5%22%20stroke-width%3D%223%22/%3E%3Cpath%20fill%3D%22%235dc2af%22%20d%3D%22M72%2025L42%2071%2027%2056l-4%204%2020%2020%2034-52z%22/%3E%3C/svg%3E");
  }
</style>
