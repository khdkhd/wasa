// @flow
import type { AudioContext } from './i-audio-context'
import type { AudioParam } from './i-audio-param'

export interface AudioNode {

    context: AudioContext;
    numberOfInputs: number;
    numberOfOutputs: number;
    chanelCount: number;
    chanelCountMode: string;
    chanelInterpretations: string;

    connect(destination: AudioParam | AudioNode,
            outputIndex?: number, inputIndex?: number): void;
    disconnect(destination?: AudioParam | AudioNode,
               outputIndex?: number, inputIndex?: number): void;
}
