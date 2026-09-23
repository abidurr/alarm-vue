import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import moment from 'moment'

interface IAlarm {
  order: number
  id: string
  time: string
  label: string
}

export const useAlarmsStore = defineStore('alarms', () => {
  const alarms = ref([
    { order: 1, id: 'shagudhaskjdkajs', time: moment().format('HH:mm'), label: 'My Label 1' },
  ] as IAlarm[])
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
