class LedRGB {
    redPin: AnalogPin;
    greenPin: AnalogPin;
    bluePin: AnalogPin;

    redValue: number;
    greenValue: number;
    blueValue: number;

    constructor(
        redPin: AnalogPin,
        greenPin: AnalogPin,
        bluePin: AnalogPin) {
        this.redPin = redPin;
        this.greenPin = greenPin;
        this.bluePin = bluePin;
    }

    setValues(redValue: number, greenValue: number, blueValue: number, brightness: number = 0) {
        this.redValue = redValue;
        this.greenValue = greenValue;
        this.blueValue = blueValue;
    }

    changeLed() {
        pins.analogWritePin(this.redPin, this.redValue);
        pins.analogWritePin(this.greenPin, this.greenValue);
        pins.analogWritePin(this.bluePin, this.blueValue);
    }

    setChange(redValue: number, greenValue: number, blueValue: number, brightness: number = 0) {
        this.setValues(redValue, greenValue, blueValue, brightness);
        this.changeLed();
    }
}