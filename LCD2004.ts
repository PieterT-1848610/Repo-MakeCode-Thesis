// Add your code here
//changed to work with the LCD 2004, on basis of makerbit code i2c lcd 1602
//github.com/1010Technologies/pxt-makerbit-lcd1602/
namespace makerbit {
    /**
     * Displays a text on a LCD2004 in the given position range.
     * The text will be cropped if it is longer than the provided length.
     * If there is space left, it will be filled with pad characters.
     * @param text the text to show, eg: "MakerBit"
     * @param startPosition the start position on the LCD, [1 - 32]
     * @param length the maximum space used on the LCD, eg: 16
     * @param option configures padding and alignment, eg: TextOption.Left
     */
    //% subcategory="LCD"
    //% blockId="LCD 2004"
    //% block="LCD2004 show %text | at position %startPosition=makerbit_lcd_position_2004 with length %length || and %option"
    //% text.shadowOptions.toString=true
    //% length.min=1 length.max=80 length.fieldOptions.precision=1
    //% expandableArgumentMode="toggle"
    //% inlineInputMode="inline"
    //% weight=90
    export function showStringOnLcd2004(
        text: string,
        startPosition: number,
        length: number,
        option?: TextOption
    ): void {
        updateCharacterBuffer(
            text,
            startPosition - 1,
            length,
            20,
            4,
            toAlignment(option),
            toPad(option)
        );
    }

    /**
     * Clears the LCD2004 completely.
     */
    //% subcategory="LCD"
    //% blockId="makerbit_lcd_clear_2004" block="LCD2004 clear display"
    //% weight=89
    export function clearLcd2004(): void {
        showStringOnLcd2004("", 1, 80);
    }

    /**
     * Turns a LCD position into a number.
     * @param pos the LCD position, eg: LcdPosition2004.Pos1
     */
    //% subcategory="LCD"
    //% blockId=makerbit_lcd_position_2004
    //% block="%pos"
    //% pos.fieldEditor="gridpicker"
    //% pos.fieldOptions.columns=20
    //% blockHidden=true
    export function position2004(pos: LCDPosition2004): number {
        return pos;
    }

    /**
     * Display a custom character at a specified LCD position.
     */
    //% subcategory="LCD"
    //% blockId="makerbit_lcd_showchararacter2004"
    //% block="LCD2004 show character %char|at position %position=makerbit_lcd_position_2004"
    //% weight=58
    export function lcdShowCharacter2004(char: LcdChar, position: number): void {
        setCharacter(char, position - 1, 20, 4);
    }

}