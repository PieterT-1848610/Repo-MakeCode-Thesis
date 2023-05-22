namespace ServiceImpl{
    export class DepthService {
        private serviceClass = jacdac.SRV_DISTANCE;
        private packFormat = jacdac.DistanceRegPack.Distance;
        private instanceName: string
        private options: jacdac.SimpleSensorServerOptions = {};
        private inputFunc: () => number;

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

        public run(){
            jacdac.startSelfServers(() =>[
                this.startServer(),
            ]
            )
        }
    } 

    export class RGBService {
        private options: jacdac.LedServerOptions = {};
        private rgbDevice: LedRGB;
        private instanceName: string;

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

        public run() {
            jacdac.startSelfServers(() => [
                this.startServer(),
            ]
            )
        }
    }  

    export class LcdScreenService {
        private options: jacdac.ServerOptions = {};
        private instanceName: string;

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

        public run() {
            jacdac.startSelfServers(() => [
                this.startServer(),
            ]
            )
        }

    }

    export class RelayService {
        private options: jacdac.ServerOptions = {};
        private instanceName: string = "";
        private inputPin: DigitalPin;

        constructor(inputPin: DigitalPin,instanceName: string ,options?: jacdac.ServerOptions){
            this.inputPin = inputPin;
            if(options){
                this.options = options;
            }
            this.options.instanceName = instanceName;
            this.options.variant = jacdac.RelayVariant.Electromechanical;
            this.options.intensityPackFormat= jacdac.RelayRegPack.Active;
        }

        public setInputPin(pin:DigitalPin){
            this.inputPin = pin;
        }


        public setInstanceName(instanceName: string){
            this.instanceName = instanceName;
            this.options.instanceName = instanceName;
        }

        public startServer(){
            return jacdac.createActuatorServer(jacdac.SRV_RELAY, server =>{
                const active = server.intensity > 0 ? 1 : 0
                pins.digitalWritePin(this.inputPin, active);},
                this.options);
        }

        public run() {
            jacdac.startSelfServers(() => [
                this.startServer(),
            ]
            )
        }

    }

    export class LightLevelService {
        private serviceClass = jacdac.SRV_LIGHT_LEVEL;
        private packFormat = jacdac.LightLevelRegPack.LightLevel;
        private options: jacdac.SimpleSensorServerOptions = {};
        private inputFunc: () => number;
        private instanceName: string = "";

        constructor(inputFunc: () => number, instanceName: string, options?: jacdac.SimpleSensorServerOptions) {
            this.inputFunc = inputFunc;
            if (options) {
                this.options = options;
            }
            this.instanceName = instanceName;
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

        public setInstanceName(instanceName: string) {
            this.instanceName = instanceName;
            this.options.instanceName = instanceName;
        }

        public startServer(): jacdac.SimpleSensorServer {
            this.options.instanceName = this.instanceName;
            return new jacdac.SimpleSensorServer(
                this.serviceClass,
                this.packFormat,
                this.inputFunc,
                this.options
            );
        }

        public run() {
            jacdac.startSelfServers(() => [
                this.startServer(),
            ]
            )
        }
    }
}