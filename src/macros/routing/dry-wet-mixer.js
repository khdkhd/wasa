import { createNodeOutputMixer } from './node-output-mixer'

export const createDryWetMixer = (audioContext) => {
	const nodeOutputMixer = createNodeOutputMixer(audioContext)
	const inputGainNode = audioContext.createGain()
	const dryGainNode = audioContext.createGain()

	let wetNode = audioContext.createGain()

	inputGainNode.connect(dryGainNode)
	inputGainNode.connect(wetNode)

	nodeOutputMixer.setLeftInput(dryGainNode)
	nodeOutputMixer.setRightInput(wetNode)

	return Object.assign(nodeOutputMixer, {
		getInput() {
			return inputGainNode
		},
		setWetNode(sfxNodeOrMacro) {
			wetNode = sfxNodeOrMacro.getInput ? sfxNodeOrMacro.getInput() : sfxNodeOrMacro
			nodeOutputMixer.setRightInput(wetNode)
			inputGainNode.disconnect()
			inputGainNode.connect(dryGainNode)
			inputGainNode.connect(wetNode)
			return this
		},
	})
}
