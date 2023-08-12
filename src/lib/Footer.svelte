<footer
  class="flex justify-between items-center w-[550px] h-[20px] text-[14px]  border-t-[1px] border-solid border-[#e6e6e6] text-[#777] py-[15px] px-[10px] bg-white"
>
  <span class="todo-count">
    {unCompletedNum} {unCompletedNum!=1?'items':'item'} left
  </span>
  <ul class="flex gap-x-4">
    <li><button class="active" on:click={function(){handleFilter.call(this,0)}}>All</button></li>
    <li><button  on:click={function(){handleFilter.call(this,1)}}>Active</button></li>
    <li><button  on:click={function(){handleFilter.call(this,2)}} >Completed</button></li>
  </ul>
  <button class="hover:underline" on:click={clearCompleted}> Clear completed </button>
</footer>

<script lang='ts'>
  export let unCompletedNum,clearCompleted;
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();
  function handleFilter(type:number){
    document.querySelector('button.active').classList.toggle("active");
    this.classList.toggle('active')
    dispatch('filter', {
      type,
    });
  }
</script>

<style>
  footer:before {
    @apply content-[] absolute right-0 left-0 bottom-0 h-[50px] overflow-hidden;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2), 0 8px 0 -3px #f6f6f6,
      0 9px 1px -3px rgba(0, 0, 0, 0.2), 0 16px 0 -6px #f6f6f6,
      0 17px 2px -6px rgba(0, 0, 0, 0.2);
  }
  button{
    @apply border-[1px] border-solid px-[5px] border-transparent rounded-sm;
  }
  button.active{
    @apply border-[#efd5d5];
  }
</style>
