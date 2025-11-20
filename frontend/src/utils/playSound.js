const playSound = (success = true) => {
	const ctx = new (window.AudioContext || window.webkitAudioContext)()
	const now = ctx.currentTime

	const osc1 = ctx.createOscillator()
	const osc2 = ctx.createOscillator()
	const gain = ctx.createGain()

	osc1.connect(gain)
	osc2.connect(gain)
	gain.connect(ctx.destination)

	if (success) {
		osc1.frequency.setValueAtTime(660, now)
		osc2.frequency.setValueAtTime(880, now + 0.05)
	} else {
		osc1.frequency.setValueAtTime(180, now)
		osc2.frequency.setValueAtTime(160, now + 0.05)
	}

	gain.gain.setValueAtTime(0.15, now)
	gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6)

	osc1.type = "sine"
	osc2.type = "triangle"

	osc1.start(now)
	osc2.start(now + 0.05)
	osc1.stop(now + 0.6)
	osc2.stop(now + 0.6)
}

export default playSound