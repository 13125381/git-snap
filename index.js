const { SerialPort, ReadlineParser } = require('serialport');
const process = require('process');
const EventEmitter = require('events');

process.stdin.resume();

/**
 * 0 - arduino is ready
 * 1 - commit event
 * 
 */

let arduinoInitialized = false;

const serialPort = new SerialPort({
    path: '/dev/cu.usbmodem143201', //'/dev/cu.usbmodem143301',
    baudRate: 9600,
    endOnClose: true
});



const waitForArduino = async () => {
    if (!arduinoInitialized) {
        await new Promise((resolve) => setTimeout(resolve, 50));
        await waitForArduino();
    }
}

const writeData = (message) => {
    console.log('writing data')
    serialPort.write(message);
    serialPort.drain(() => {
        console.log('done')
    });
}

(async () => {

    try {

        const parser = serialPort.pipe(new ReadlineParser({ delimiter: '\n' }));
        parser.on('data', (message) => {
            console.log(message)
            if (message.startsWith(0)) {
                console.log('Arduino has been initialized');
                arduinoInitialized = true;
            }

            if (message.startsWith(1)) {
                console.log('Received commit event');
            }
        });


        serialPort.on('error', (error) => {
            console.log(error);
        })

        await waitForArduino();
        writeData('hello\n');

    } catch (e) {
        console.log(e);
        serialPort.close();
    }
})();

