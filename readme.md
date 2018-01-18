# Xiaomi Philips Hue
A nodejs basic implementation of the Philips HUE Bridge that sents commands to Xiaomi Lights. With this application you can tell Alexa turn on/off your Xiaomi Bulbs or set them to a specific intensity ex: "Alexa, set office to 40%".

# How to use
1. First install miio cli tool
`npm install -g miio`

2. Then start the device discovery see for more info
`miio --discover`

3. Add your lights in start.ts like this:
``` TypeScript
var officeLight: IXiaomiBulb = {
    address: '192.168.1.X', // Ip of the bulb
    token: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", // bulb token get using miio cli tool
    id: "2cd0a800-20bc-4f6a-b472-c0786592e745", // generate a UUID
};

MyConfig.addDevice("Office", officeLight);
```

4. Use the alexa app to discover devices

# Not supported yet
- Set light temprerature

## How it works
This basically emulates a Hue Bridge and some lights and routes/transforms the requests to Xiaomi Bulbs using the Miio library.

### Credits
The application started based on https://github.com/samhiatt/node-hue-emulator project.
