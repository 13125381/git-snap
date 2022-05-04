import process from 'process';
import { SerialPort, ReadlineParser } from 'serialport';
import { commit, resultCodes } from './gitUtils.js';
import EventEmitter from 'events';
const arduinoInitializeState = new EventEmitter();
const commitEvent = new EventEmitter();

// const eventCodes = {
//     SUCCESS: '[SUCCESS]',
//     COMMITPUSH: '[COMMITPUSH]',
//     INFO: '[INFO]',
//     READY: '[READY]',
//     INPROGRESS: '[INPROGRESS]',
//     ERROR: '[ERROR]'
// };


// commitEvent.on(eventCodes.COMMITPUSH, async () => {
//     await writeData(eventCodes.INPROGRESS);
//     const result = await commit();
//     switch (result) {
//         case resultCodes.NOCHANGES:
//             await writeData(resultCodes.NOCHANGES);
//             break;
//         case resultCodes.SUCCESS:
//             await writeData(eventCodes.SUCCESS);
//             break;
//         default:
//             await writeData(eventCodes.ERROR);
//             break;
//     }
// });


// const serialPort = new SerialPort({
//     path: '/dev/cu.usbmodem143201',
//     baudRate: 9600,
//     endOnClose: true
// });

// const waitForArduino = async () => {
//     await new Promise(resolve => arduinoInitializeState.once('ready', resolve));
// }

// const writeData = (message) => {
//     return new Promise((resolve) => {
//         serialPort.write(`${message}\n`);
//         serialPort.drain(() => {
//             resolve();
//         });
//     });
// }

// const parser = serialPort.pipe(new ReadlineParser({ delimiter: '\r\n' }));
// parser.on('data', (message) => {
//     console.log(message)
//     const eventCode = message.match(/^\[.*\]/gm)[0];
//     switch (eventCode) {
//         case eventCodes.READY:
//             console.log('Arduino has been initialized');
//             arduinoInitializeState.emit('ready');
//             break;
//         case eventCodes.COMMITPUSH:
//             console.log('Received commit event');
//             commitEvent.emit(eventCodes.COMMITPUSH);
//             break;
//         case eventCodes.INFO:
//             console.log('Received info event');
//             console.log(message);
//             break;
//         default:
//             break;
//     }
// });

// serialPort.on('error', (error) => {
//     console.error(error);
//     serialPort.close();
//     process.exit = 1;
// });

(async () => {

    try {
        // await waitForArduino();

        const result = await commit();


    } catch (e) {
        console.error(e);
        //serialPort.close();
    }
})();

