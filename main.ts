namespace ServiceImpl{
    class BasicServiceClass {
        private instanceName: string;
        private startService: boolean;
        private options: jacdac.ServerOptions = {};

        constructor(instanceName: string, startService:boolean, options?: jacdac.ServerOptions){
            this.instanceName = instanceName;
            this.startService = startService;
            if (options) {
                this.options = options;
            }
            this.options.instanceName = instanceName;

            if (startService) {
                this.run();
            }
        }

        setInstanceName(instanceName:string){
            this.instanceName = instanceName;
            this.options.instanceName = instanceName;
        }

        public startServer(): jacdac.Server{
            return null;
        }

        public setOptions(options: jacdac.ServerOptions) {
            this.options = options;
        }
        public run(){
            jacdac.startSelfServers(() =>[
                this.startServer(),
            ])
        }
    }

    export class DepthService{
        private serviceClass = jacdac.SRV_DISTANCE;
        private packFormat = jacdac.DistanceRegPack.Distance;
        private options: jacdac.SimpleSensorServerOptions = {};
        private inputFunc: () => number;
        private instanceName:string;

        constructor(inputFunc: () => number, instanceName: string, startService: boolean ,options ?: jacdac.SimpleSensorServerOptions) {
            this.inputFunc = inputFunc;
            this.instanceName = instanceName;
            if (options) {
                this.options = options;
            }
            this.options.instanceName = instanceName;

            if(startService){
                this.run();
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

        constructor(redPin: AnalogPin, greenPin: AnalogPin, bluePin: AnalogPin, instanceName: string, startService: boolean ,options?: jacdac.LedServerOptions){
            this.rgbDevice = new LedRGB(redPin, greenPin, bluePin);
            this.instanceName = instanceName;
            if(options){
                this.options = options;
            }
            this.options.instanceName = instanceName;
            
            if (startService) {
                this.run();
            }
        }

        public setInstanceName(instanceName: string) {
            this.instanceName =(instanceName);
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
        private screeenSize: number;

        constructor(instanceName: string, screenSize: number, startService:boolean, options?: jacdac.ServerOptions){
            this.instanceName = instanceName;
            this.screeenSize = screenSize;
            if(options){
                this.options = options;
            }
            this.options.instanceName = instanceName;
            this.options.variant= jacdac.CharacterScreenVariant.LCD;
            
            if (startService) {
                this.run();
            }

        }

        public setInstanceName(instanceName: string) {
            this.instanceName = instanceName;
            this.options.instanceName = instanceName;
        }


        public startServer(){
            if(this.screeenSize == 80){
                return new CharacterScreenServer(12, 80, 4, 20, this.options);
            }else{
                return new CharacterScreenServer(12, 32, 2, 16, this.options);
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

        constructor(inputPin: DigitalPin,instanceName: string, startService: boolean, options?: jacdac.ServerOptions){
            this.inputPin = inputPin;
            if(options){
                this.options = options;
            }
            this.instanceName = instanceName;
            this.options.instanceName = instanceName;
            if(!this.options.variant){
                this.options.variant = jacdac.RelayVariant.Electromechanical;
            }
            this.options.intensityPackFormat= jacdac.RelayRegPack.Active;

            if (startService) {
                this.run();
            }
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

        constructor(inputFunc: () => number, instanceName: string, startService:boolean, options?: jacdac.SimpleSensorServerOptions) {
            this.inputFunc = inputFunc;
            if (options) {
                this.options = options;
            }
            this.instanceName = instanceName;
            this.options.instanceName = instanceName;

            if (startService) {
                this.run();
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