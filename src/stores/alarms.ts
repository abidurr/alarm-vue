import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import moment from 'moment'
import { v4 as uuidv4 } from 'uuid'

interface IAlarm {
  order: number
  id: string
  time: string
  label: string
}

const DEFAULT_ALARMS = [
  { order: 1, id: uuidv4(), time: moment().format('HH:mm:ss'), label: 'Alarm 1' },
] as IAlarm[]

export const useAlarmsStore = defineStore('alarms', () => {
  // import local storage state
  // const storedAlarms = localStorage.getItem('alarms')
  const alarms = ref(DEFAULT_ALARMS)
  const length = computed(() => alarms.value.length)

  function addAlarm(alarm: IAlarm) {
    alarms.value = [...alarms.value, alarm]
  }

  function removeAlarm(id: string) {
    alarms.value = alarms.value.filter((alarm) => alarm.id !== id)
  }

  function updateAlarm(id: string, alarm: IAlarm) {
    alarms.value = alarms.value.map((a) => (a.id === id ? alarm : a))
  }

  return { alarms, length, addAlarm, removeAlarm, updateAlarm }
})

// useAlarmsStore.$subscribe(
//   (mutation, state) => {
//     // persist the whole state to the local storage whenever it changes
//     localStorage.setItem('cart', JSON.stringify(state))
//   },
//   { flush: 'sync' },
// )
