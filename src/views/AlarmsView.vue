<script setup lang="ts">
import { useAlarmsStore } from '@/stores/alarms'
import { v4 as uuidv4 } from 'uuid'
// import { CTimePicker } from '@coreui/vue-pro'
import { CFormInput } from '@coreui/vue'
import { ref } from 'vue'

import moment from 'moment-timezone'

const alarms = useAlarmsStore()
const time_input = ref(moment().format('HH:mm:ss'))
const label = ref(`Alarm ${alarms.alarms.length + 1}`)

const SECONDS_PER_DAY = 24 * 3600

const timeToAlarm = (time: string): number => {
  const timeToAlarm = moment(time, 'HH:mm:ss').diff(moment(), 'seconds')
  return (SECONDS_PER_DAY - timeToAlarm) / SECONDS_PER_DAY
}

// Current time in reactive state
const current_time = ref(moment().format('HH:mm:ss'))

setInterval(() => {
  current_time.value = moment().format('HH:mm:ss')
  return
}, 1000)
</script>

<template>
  <div class="wrapper">
    <h1 style="width: 100%; text-align: center">Alarms</h1>

    <p style="width: 100%; text-align: center; font-size: 32px; opacity: 0.8">{{ current_time }}</p>
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
        style="height: 36px; margin-top: 14px; border-radius: 8px"
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
      <div class="progress-bar" :style="{ width: `${timeToAlarm(alarm.time) * 100}%` }"></div>
      <span class="mono-font" style="font-weight: 600; margin-top: 4px">{{ alarm.order }}.</span>
      <div style="z-index: 2">
        <span style="font-style: italic; align-content: baseline">{{ alarm.label }}</span
        >&nbsp; at
        <span class="mono-font" style="font-weight: 600">{{ alarm.time }}</span>
      </div>
      <button
        style="margin-left: 16px; border-radius: 50%; z-index: 2"
        class="mono-font close-button"
        @click="() => alarms.removeAlarm(alarm.id)"
      >
        OK
      </button>
    </div>
  </div>
</template>

<style>
input {
  font-size: 20px;
  min-height: 32px;
}
.inputdiv {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 40px 0px;
  margin: 0px;
}

.progress-bar {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  transition: width 0.3s ease-in-out;
  /*width: 27%;*/
  background-color: rgba(50, 50, 200, 0.6);
  border-radius: 30px;
  z-index: 1;
  max-width: 100%;
}
.single-alarm {
  position: relative;
  display: flex;
  justify-content: space-between;
  background: black;
  border-radius: 26px;
  margin: 16px 0px;
  padding: 12px 36px;
  text-align: center;
  color: ghostwhite;
  box-shadow:
    0 4px 6px rgba(50, 50, 200, 0.7),
    0 5px 15px rgba(5, 5, 20, 0.1);
  span {
    z-index: 2;
  }
}

@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
