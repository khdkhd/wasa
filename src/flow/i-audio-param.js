// @flow
export interface AudioParam {

    defaultValue: number;
    maxValue: number;
    minValue: number;
    +value: number;

    setValueAtTime(value: number, time: number): void;
    linearRampToValueAtTime(value: number, time: number): void;
    exponentialRampToValueAtTime(value: number, time: number): void;
    setTargetAtTime(value: number, time: number): void;
    setValueCurveAtTime(value: number, time: number): void;
    cancelScheduledValues(startTime: number): void;
    cancelAndHoldAtTime(cancelTime: number): void;
}
