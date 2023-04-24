namespace ServiceImpl{
    export class DepthServer {
        private serviceClass = jacdac.SRV_DISTANCE;
        private packFormat = jacdac.DistanceRegPack.Distance;
        instanceName: string
        options: jacdac.SimpleSensorServerOptions = {};
        inputFunc: () => number;

        constructor(inputFunc: () => number, instanceName: string, options ?: jacdac.SimpleSensorServerOptions) {
            this.inputFunc = inputFunc;
            this.instanceName = instanceName
            if (options) {
                this.options = options;
            }
            this.options.instanceName = instanceName;
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

        public setInstanceName(instanceName: string){
            this.instanceName = instanceName;
            this.options.instanceName = instanceName;
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
        options: jacdac.LedServerOptions = {};
        rgbDevice: LedRGB;
        instanceName: string;

        constructor(redPin: AnalogPin, greenPin: AnalogPin, bluePin: AnalogPin, instanceName: string ,options?: jacdac.LedServerOptions){
            this.rgbDevice = new LedRGB(redPin, greenPin, bluePin);
            this.instanceName = instanceName;
            if(options){
                this.options = options;
            }
            this.options.instanceName = instanceName;
        }

        public setInstanceName(instanceName: string) {
            this.instanceName = instanceName;
            this.options.instanceName = instanceName;

        }

        public startServer() {
            if(this.options){
                return new jacdac.LedServer(1, jacdac.LedPixelLayout.Rgbw, (p,b) => {
                    this.rgbDevice.setChange(p[0], p[1], p[2]);
                }, this.options);
            }else{
                return new jacdac.LedServer(1, jacdac.LedPixelLayout.Rgbw, (p,b) => {
                    this.rgbDevice.setChange(p[0], p[1], p[2]);
                }, {
                    "instanceName": this.instanceName
                })
            }
        }
    }  

    export class CharLCDScreen{
        options: jacdac.ServerOptions = {};
        instanceName: string;

        constructor(instanceName: string, options?: jacdac.ServerOptions){
            this.instanceName = instanceName;
            if(options){
                this.options = options;
            }
            this.options.instanceName = instanceName;
            this.options.variant= jacdac.CharacterScreenVariant.LCD;
        }

        public setInstanceName(instanceName: string) {
            this.instanceName = instanceName;
            this.options.instanceName = instanceName;
        }


        public startServer(){
            if(this.options){
                return new CharacterScreenServer(12, 80, 4, 20, this.options);
            }else{
                return new CharacterScreenServer(12, 80, 4, 20, ({"instanceName": this.instanceName, variant: jacdac.CharacterScreenVariant.LCD}))
            }
        }

    }
}