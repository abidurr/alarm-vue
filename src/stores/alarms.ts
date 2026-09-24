import { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia'
import moment from 'moment'
import { v4 as uuidv4 } from 'uuid'

interface IAlarm {
  order: number
  id: string
  time: string
  label: string
}

const STORAGE_KEY = 'alarms'

const DEFAULT_ALARMS = [
  { order: 1, id: uuidv4(), time: moment().format('HH:mm:ss'), label: 'Alarm 1' },
] as IAlarm[]

function isAlarm(value: unknown): value is IAlarm {
  if (typeof value !== 'object' || value === null) return false
  const alarm = value as Record<string, unknown>
  return (
    typeof alarm.order === 'number' &&
    typeof alarm.id === 'string' &&
    typeof alarm.time === 'string' &&
    typeof alarm.label === 'string'
  )
}

function isAlarmList(value: unknown): value is IAlarm[] {
  return Array.isArray(value) && value.every(isAlarm)
}

function loadAlarms(): IAlarm[] {
  if (typeof localStorage === 'undefined') return DEFAULT_ALARMS

  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return DEFAULT_ALARMS

    const parsed = JSON.parse(raw)
    const list = Array.isArray(parsed) ? parsed : parsed?.alarms
    if (!isAlarmList(list)) return DEFAULT_ALARMS

    return list
  } catch {
    return DEFAULT_ALARMS
  }
}

function persistAlarms(alarms: IAlarm[]) {
  if (typeof localStorage === 'undefined') return
  localStorage.setItem(STORAGE_KEY, JSON.stringify(alarms))
}

export const useAlarmsStore = defineStore('alarms', () => {
  const alarms = ref<IAlarm[]>(loadAlarms())
  const length = computed(() => alarms.value.length)

  watch(alarms, persistAlarms, { deep: true, immediate: true })

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
