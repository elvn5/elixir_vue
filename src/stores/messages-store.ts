import { defineStore } from "pinia";

export const useMessagesStore =
  defineStore('messages',
  () => {
  const queue = ref<string[]>([])

  function add (message: string | string[]) {
    if(Array.isArray(message)) {
      message.forEach(item => {
        queue.value.push(item)
      })
    } else {
      queue.value.push(message)
    }
  }

  return { queue, add }
})

