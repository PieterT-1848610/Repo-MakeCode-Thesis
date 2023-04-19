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
}