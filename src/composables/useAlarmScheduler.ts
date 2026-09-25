import { onUnmounted, watch } from 'vue'
import moment from 'moment-timezone'
import { useAlarmsStore } from '@/stores/alarms'
import { playChime, unlockAudio } from '@/utils/playChime'

function normalizeTime(time: string): string {
  const [hours = '00', minutes = '00', seconds = '00'] = time.split(':')
  return `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}:${seconds.padStart(2, '0')}`
}

export function useAlarmScheduler() {
  const store = useAlarmsStore()
  const lastFired = new Map<string, string>()

  function checkAlarms() {
    const now = moment()
    const current = now.format('HH:mm:ss')
    const today = now.format('YYYY-MM-DD')

    for (const alarm of store.alarms) {
      if (normalizeTime(alarm.time) !== current) continue
      if (lastFired.get(alarm.id) === today) continue
      lastFired.set(alarm.id, today)
      playChime()
    }
  }

  const intervalId = window.setInterval(checkAlarms, 1000)
  checkAlarms()

  watch(() => store.alarms, checkAlarms, { deep: true })

  function onGesture() {
    unlockAudio()
    window.removeEventListener('pointerdown', onGesture)
    window.removeEventListener('keydown', onGesture)
  }

  window.addEventListener('pointerdown', onGesture)
  window.addEventListener('keydown', onGesture)

  onUnmounted(() => {
    window.clearInterval(intervalId)
    window.removeEventListener('pointerdown', onGesture)
    window.removeEventListener('keydown', onGesture)
  })
}
