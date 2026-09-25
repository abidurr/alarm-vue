import { Howl, Howler } from 'howler'
import chimeUrl from '@/assets/chime1.mp3'

const chime = new Howl({
  src: [chimeUrl],
  preload: true,
})

export function playChime() {
  chime.stop()
  chime.play()
}

export function unlockAudio() {
  void Howler.ctx?.resume()
}
