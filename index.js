const { SerialPort, ReadlineParser } = require('serialport');
const process = require('process');
const EventEmitter = require('events');
const arduinoInitializeState = new EventEmitter();

process.stdin.resume();

/**
 * 0 - arduino is ready
 * 1 - commit and push event
 * 2 - info
 */

const serialPort = new SerialPort({
    path: '/dev/cu.usbmodem143201', //'/dev/cu.usbmodem143301',
    baudRate: 9600,
    endOnClose: true
});

const waitForArduino = async () => {
    await new Promise(resolve => arduinoInitializeState.once('ready', resolve));
}

const writeData = (message) => {
    serialPort.write(`${message}\n`);
    serialPort.drain();
}

const parser = serialPort.pipe(new ReadlineParser({ delimiter: '\n' }));
parser.on('data', (message) => {
    const eventCode = message.charAt(0);
    switch (eventCode) {
        case 0:
            console.log('Arduino has been initialized');
            arduinoInitializeState.emit('ready');
            break;
        case 1:
            console.log('Received commit event');
            break;
        case 2:
            console.log('Received info event');
            break;
        default:
            break;
    }
});

serialPort.on('error', (error) => {
    console.error(error);
    serialPort.close();
    process.exit = 1;
});

(async () => {

    try {
        await waitForArduino();
        writeData('hello');

    } catch (e) {
        console.error(e);
        serialPort.close();
    }
})();

