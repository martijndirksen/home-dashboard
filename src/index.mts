import { createServer } from 'net';
import { config } from 'dotenv';
import { Parser } from 'binary-parser';
import { envNum } from './env.mjs';

/*const parser = new Parser()
  // Signed 32-bit integer (little endian)
  .int32le("a")
  // Unsigned 8-bit integer
  .uint8("b")
  // Signed 16-bit integer (big endian)
  .int16be("c");
  // signed 64-bit integer (big endian)
  .int64be("d")*/

// Supported:
// Two Byte Integer: .int16be("a")
// Four Byte Integer: .int32be("a")

const variableIntegerOptions = {
  type: 'uint8',
  readUntil: function (item: number) {
    return item === 0;
  },
  formatter: function (array: number[]) {
    return array.reduce((acc, cur) => {
      return (acc << 7) + (cur & 0x7f);
    }, 0);
  },
};

const parser = new Parser()
  .bit4('control')
  .bit4('flags')
  .array('remainingLength', variableIntegerOptions)
  .array('properties', variableIntegerOptions)
  .string('header', { length: 4, encoding: 'utf8' });
//.int16be('remainingLength');
//.string('header', { length: 4, encoding: 'utf8' });
// .string('b', {
//   encoding: 'utf8',
//   length: function () {
//     return (this as any).headerLength - 1;
//   },
// })

/*enum Control {
  CONNECT = 1,
  CONNACK = 2,
  PUBLISH = 3,
  PUBACK = 4,
  PUBREC = 5,
  PUBREL = 6,
  PUBCOMP = 7,
  SUBSCRIBE = 8,
  SUBACK = 9,
  UNSUBSCRIBE = 10,
  UNSUBACK = 11,
  PINGREQ = 12,
  PINGRESP = 13,
  DISCONNECT = 14,
  AUTH = 15,
}*/

config();

const server = createServer(
  {
    allowHalfOpen: true,
    keepAlive: true,
    keepAliveInitialDelay: 1000,
    pauseOnConnect: false,
    noDelay: true,
  },
  (socket) => {
    console.log('client connected', socket.remoteAddress, socket.remotePort);

    socket.on('data', (data) => {
      console.log('receiving data', data.toString());
      const result = parser.parse(data);
      console.log(result);
    });
    socket.on('end', () => {
      console.log(
        'client disconnected',
        socket.remoteAddress,
        socket.remotePort
      );
    });
  }
);

server.on('error', (err) => {
  throw err;
});

server.listen(envNum('MQTT_PORT', 1883), () => {
  console.log('server bound');
});
