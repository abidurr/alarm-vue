<script setup lang="ts">
import { useAlarmsStore } from '@/stores/alarms'
import { v4 as uuidv4 } from 'uuid'
// import { CTimePicker } from '@coreui/vue-pro'
import { CFormInput } from '@coreui/vue'
import { ref } from 'vue'

import moment from 'moment-timezone'
// import '@coreui/coreui/dist/css/coreui.min.css'
// import '@coreui/coreui-pro/dist/css/coreui.min.css'
const alarms = useAlarmsStore()
const time_input = ref(moment().format('HH:mm:ss'))
const label = ref(`My Alarm ${alarms.alarms.length + 1}`)
</script>

<template>
  <div class="wrapper">
    <h1 style="width: 100%; text-align: center">Alarms</h1>
    <div class="inputdiv">
      <div>
        <p style="margin: 0px">Label</p>
        <CFormInput
          style="width: 200px; height: 24px"
          type="text"
          placeholder="My Alarm"
          id="label"
          v-model="label"
        />
      </div>
      <div>
        <p style="margin: 0px">Time</p>
        <input
          type="time"
          style="width: 200px"
          locale="en-US"
          v-model="time_input"
          id="time_input"
        />
      </div>

      <button
        style="height: 36px; margin-top: 40px; border-radius: 8px"
        @click="
          () => {
            alarms.addAlarm({
              label: label,
              id: uuidv4(),
              time: time_input,
              order: alarms.alarms.length + 1,
            })

            label = `My Alarm ${alarms.alarms.length + 1}`
            time_input = `00:00`
          }
        "
      >
        Add Alarm
      </button>
    </div>
    <div class="single-alarm" v-for="alarm in alarms.alarms" :key="alarm.id">
      <span class="mono-font" style="font-weight: 600">{{ alarm.order }}.</span>
      <span style="font-style: italic">{{ alarm.label }}</span> at
      <span class="mono-font" style="font-weight: 600">{{ alarm.time }}</span>
      <button
        style="margin-left: 16px"
        class="mono-font"
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
  background: black;
  border-radius: 16px;
  margin: 12px 0px;
  padding: 12px 0px;
  text-align: center;
  color: white;
}

@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
