<script>
  import {createEventDispatcher} from 'svelte'
  const dispatch = createEventDispatcher()

  import showdown from 'showdown'
  const converter = new showdown.Converter();

  export let field

  function parseContent() {
    const html = converter.makeHtml(markdown);
    field.value = html
    dispatch('input')
  }

  let markdown = typeof field.value === 'string' ? converter.makeMarkdown(field.value) : ''
</script>

<label class="label" for={field.id}>
  <span>{ field.label }</span>
  <textarea id={field.id} rows="8" bind:value={markdown} on:input={parseContent}></textarea>
</label>

<style>
  .label {
    @apply flex flex-col mb-2 font-medium;

    span {
      @apply mb-2;
    }

    textarea {
      @apply p-2 border-2 border-gray-100;
      outline-color: rgb(248,68,73);
    }
  }
</style>