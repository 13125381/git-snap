const { SerialPort, ReadlineParser } = require('serialport');
const process = require('process');
const EventEmitter = require('events');
const arduinoInitializeState = new EventEmitter();


/**
 * READY - arduino is ready
 * COMMITPUSH - commit and push event
 * INFO - info
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

const parser = serialPort.pipe(new ReadlineParser({ delimiter: '\r\n' }));
parser.on('data', (message) => {
    // get event code from between square brackets
    const eventCode = message.match(/[^\[\]]+/gm)[0];
    switch (eventCode) {
        case 'READY':
            console.log('Arduino has been initialized');
            arduinoInitializeState.emit('ready');
            break;
        case 'COMMIT':
            console.log('Received commit event');
            break;
        case 'INFO':
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

