const { SerialPort, ReadlineParser } = require('serialport');
const process = require('process');
process.stdin.resume();

/**
 * 0 - generic message
 * 1 - commit event
 * 
 */

// const serialPort = new SerialPort({
//     path: '/dev/cu.usbmodem143301',
//     baudRate: 9600,
//     endOnClose: true
// });

const initParser = () => {
    const parser = serialPort.pipe(new ReadlineParser({ delimiter: '\n' }));
    parser.on('data', (message) => {
        if (message.startsWith(0)) {
            console.log('Received message: ', message);
        }

        if (message.startsWith(1)) {
            console.log('Received commit event');
            // call commit functions
        }
    });

    // serialPort.on('open', () => {
    //     console.log('port is open')
    //     serialPort.write('Hello from mac\n', (error, results) => {
    //         console.log('data: ', error);
    //         console.log('results: ', results)
    //     });
    // });

    // serialPort.on('error', (error) => {
    //     console.log('Error: ', error);
    // })
}

const writeToPort = (data) => {
    serialPort.write(data, 'utf8', (error, results) => {
        console.log('data: ', error);
        console.log('results: ', results)
    });
};



(() => {
    const serialPort = new SerialPort({
        path: '/dev/cu.usbmodem143201', //'/dev/cu.usbmodem143301',
        baudRate: 9600,
        endOnClose: true
    });
    
    try {
        const parser = serialPort.pipe(new ReadlineParser({ delimiter: '\n' }));
        parser.on('data', (message) => {
            console.log(message)
            if (message.startsWith(0)) {
                console.log('Received message: ', message);
            }
    
            if (message.startsWith(1)) {
                console.log('Received commit event');
                // call commit functions
            }
        });
        
    } catch (e) {
        console.log(e);
        serialPort.close();
    }
})();