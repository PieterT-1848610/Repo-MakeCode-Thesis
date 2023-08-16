class CharacterScreenServer extends jacdac.Server {
    private i2cAddress: number = 12;
    message: string = "";
    textDirection = jacdac.CharacterScreenTextDirection.LeftToRight;
    screenSize: number = 80;
    rowSize: number = 4;
    columSize: number = 20;

    constructor(adress: number =12, screenSize: number = 80, rowSize: number = 4, columSize: number = 20, options?: jacdac.ServerOptions) {
        super(jacdac.SRV_CHARACTER_SCREEN, options);
        
        //     super(jacdac.SRV_CHARACTER_SCREEN,
        //         {
        //             variant: jacdac.CharacterScreenVariant.LCD,
        //         })
        
        this.i2cAddress = adress;
        this.screenSize = screenSize;
        this.rowSize = rowSize;
        this.columSize = columSize;
    }

    handlePacket(pkt: jacdac.JDPacket): void {
        this.textDirection = this.handleRegValue(
            pkt,
            jacdac.CharacterScreenReg.TextDirection,
            jacdac.CharacterScreenRegPack.TextDirection,
            this.textDirection
        )
        this.handleRegFormat(pkt,
            jacdac.CharacterScreenReg.Columns,
            jacdac.CharacterScreenRegPack.Columns,
            [this.columSize]) // NUMBER_OF_CHAR_PER_LINE
        this.handleRegFormat(pkt,
            jacdac.CharacterScreenReg.Rows,
            jacdac.CharacterScreenRegPack.Rows,
            [this.rowSize]) // NUMBER_OF_CHAR_PER_LINE

        const oldMessage = this.message
        this.message = this.handleRegValue(
            pkt,
            jacdac.CharacterScreenReg.Message,
            jacdac.CharacterScreenRegPack.Message,
            this.message
        )
        if (this.message != oldMessage) this.syncMessage()
    }

    private syncMessage() {
        if (this.screenSize == 32) {
            if (!this.message) {
                makerbit.clearLcd1602()
            }
            else {
                makerbit.showStringOnLcd1602(this.message, 0, this.message.length)
            }
        } else if (this.screenSize == 80) {
            if (!this.message) {
                makerbit.clearLcd2004()
            }
            else {
                makerbit.showStringOnLcd2004(this.message, 0, this.message.length)
            }
        }

    }
}

class CharScreenServer extends jacdac.Server {
    message: string = "";
    textDirection = jacdac.CharacterScreenTextDirection.LeftToRight;
    screenSize: number = 80;
    rowSize: number = 4;
    columSize: number = 20;
    clearMsgFunc: () => void;
    setMsgFunc: (msg: string, startPos: number, direction: jacdac.CharacterScreenTextDirection) => void;

    constructor(screenSize: number = 80, rowSize: number = 4, columSize: number = 20, clearMsgFunc: () => void,
        setMsgFunc: (msg: string, startPos: number, direction: jacdac.CharacterScreenTextDirection) => void,
        options?: jacdac.ServerOptions) {

        super(jacdac.SRV_CHARACTER_SCREEN, options);
        this.clearMsgFunc = clearMsgFunc;
        this.setMsgFunc = setMsgFunc;
        this.screenSize = screenSize;
        this.rowSize = rowSize;
        this.columSize = columSize;
    }

    handlePacket(pkt: jacdac.JDPacket): void {
        this.textDirection = this.handleRegValue(
            pkt,
            jacdac.CharacterScreenReg.TextDirection,
            jacdac.CharacterScreenRegPack.TextDirection,
            this.textDirection
        )
        this.handleRegFormat(pkt,
            jacdac.CharacterScreenReg.Columns,
            jacdac.CharacterScreenRegPack.Columns,
            [this.columSize]) // NUMBER_OF_CHAR_PER_LINE
        this.handleRegFormat(pkt,
            jacdac.CharacterScreenReg.Rows,
            jacdac.CharacterScreenRegPack.Rows,
            [this.rowSize]) // NUMBER_OF_CHAR_PER_LINE
        const oldMessage = this.message
        this.message = this.handleRegValue(
            pkt,
            jacdac.CharacterScreenReg.Message,
            jacdac.CharacterScreenRegPack.Message,
            this.message
        )
        if (this.message != oldMessage) this.syncMessage()
    }

    private syncMessage() {
        if (!this.message) {
            this.clearMsgFunc()
        }
        else {
            this.setMsgFunc(this.message, 0, this.textDirection)
        }
    }
}
