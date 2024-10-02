import { ref } from 'vue'
export const useGuessList = () => {
  const guessRef = ref()

  const onScrolltolower = () => {
    guessRef.value?.getMore()
  }

  return {
    guessRef,
    onScrolltolower,
  }
}
