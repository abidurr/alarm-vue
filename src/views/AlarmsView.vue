<script setup lang="ts">
import { useAlarmsStore } from '@/stores/alarms'
import { v4 as uuidv4 } from 'uuid'
// import { CTimePicker } from '@coreui/vue-pro'
import { CFormInput } from '@coreui/vue'
import { ref } from 'vue'

import moment from 'moment-timezone'
import { Howl } from 'howler'
// import chime1 from '@/assets/chime1.mp3'
// import '@coreui/coreui/dist/css/coreui.min.css'
// import '@coreui/coreui-pro/dist/css/coreui.min.css'
const alarms = useAlarmsStore()
const time_input = ref(moment().format('HH:mm:ss'))
const label = ref(`Alarm ${alarms.alarms.length + 1}`)

// alarms.$subscribe(
//   (mutation, state) => {
//     // persist the whole state to the local storage whenever it changes
//     localStorage.setItem('alarms', JSON.stringify(state))
//   },
//   { flush: 'sync' },
// )

// export function playSound() {
//   new Howl({ src: ['@/assets/chime1.mp3'] }).play()
// }
</script>

<template>
  <div class="wrapper">
    <h1 style="width: 100%; text-align: center">Alarms</h1>
    <div class="inputdiv">
      <div>
        <p style="margin: 0px; padding: 0px; line-height: 1; font-size: 24px">Label</p>
        <CFormInput
          style="width: 200px; height: 24px"
          type="text"
          placeholder="My Alarm"
          id="label"
          v-model="label"
        />
      </div>
      <div>
        <p style="margin: 0px; padding: 0px; line-height: 1; font-size: 24px">Time</p>
        <input
          type="time"
          style="width: 200px"
          locale="en-US"
          v-model="time_input"
          id="time_input"
        />
      </div>

      <button
        style="height: 36px; margin-top: 12px; border-radius: 8px"
        @click="
          () => {
            alarms.addAlarm({
              label: label,
              id: uuidv4(),
              time: time_input,
              order: alarms.alarms.length + 1,
            })

            label = `Alarm ${alarms.alarms.length + 1}`
            // time_input = `00:00:00`
          }
        "
      >
        Add Alarm
      </button>
    </div>
    <div class="single-alarm" v-for="alarm in alarms.alarms" :key="alarm.id">
      <span class="mono-font" style="font-weight: 600; margin-top: 4px">{{ alarm.order }}.</span>
      <div>
        <span style="font-style: italic; align-content: baseline">{{ alarm.label }}</span> at
        <span class="mono-font" style="font-weight: 600">{{ alarm.time }}</span>
      </div>
      <button
        style="margin-left: 16px; border-radius: 50%"
        class="mono-font close-button"
        @click="() => alarms.removeAlarm(alarm.id)"
      >
        X
      </button>
    </div>
  </div>
</template>

<style>
.inputdiv {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 40px 0px;
  margin: 0px;
}
.single-alarm {
  display: flex;
  justify-content: space-between;
  background: black;
  border-radius: 24px;
  margin: 12px 0px;
  padding: 12px 36px;
  text-align: center;
  color: ghostwhite;
  box-shadow:
    0 4px 6px rgba(50, 50, 200, 0.7),
    0 5px 15px rgba(5, 5, 20, 0.1);
}

@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
