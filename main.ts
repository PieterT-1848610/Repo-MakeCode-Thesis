namespace ServiceImpl{
    export class DepthServer {
        private serviceClass = jacdac.SRV_DISTANCE;
        private packFormat = jacdac.DistanceRegPack.Distance;
        options: jacdac.SimpleSensorServerOptions;
        inputFunc: () => number;

        constructor(inputFunc: () => number, options ?: jacdac.SimpleSensorServerOptions) {
            this.inputFunc = inputFunc;
            if (options) {
                this.options = options;
            }
        }

        public setOptions(options: jacdac.SimpleSensorServerOptions) {
            this.options = options;
        }

        public setMinRange(minReading: number) {
            this.options.minReading = minReading;
        }

        public setMaxRange(maxReading: number) {
            this.options.minReading = maxReading;
        }

        public setInputFunc(inputFunc: () => number) {
            this.inputFunc = inputFunc;
        }

        public startServer(): jacdac.SimpleSensorServer {
            return new jacdac.SimpleSensorServer(
                this.serviceClass,
                this.packFormat,
                this.inputFunc,
                this.options
            );
        }
    } 

    export class RGBServer{
        options: jacdac.LedServerOptions;
        rgbDevice: LedRGB;
        instanceName: string;
        constructor(redPin: AnalogPin, greenPin: AnalogPin, bluePin: AnalogPin, instanceName: string ,options?: jacdac.LedServerOptions){
            this.rgbDevice = new LedRGB(redPin, greenPin, bluePin);
            this.instanceName = instanceName;
        }


        public startServer() {
            return new jacdac.LedServer(1, jacdac.LedPixelLayout.Rgbw, (p,b) => {
                this.rgbDevice.setChange(p[0], p[1], p[2]);
            }, {
                "instanceName": this.instanceName
            })
        }
    }  
}