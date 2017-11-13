// @Flow
import type {AudioNode} from "./i-audio-node";

export interface AudioContext {
    createGain(): AudioNode;
    createOscillator(): AudioNode;
    createBiquadFilter(): AudioNode;
}
