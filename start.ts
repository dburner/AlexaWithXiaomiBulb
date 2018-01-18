import { UpnpServer } from './Lib/UpnpServer';
import { HttpServer } from './Lib/HttpServer';
import { MyConfig, IXiaomiBulb } from './Lib/Config';


// Uncomment the section bellow and fill the fields 

// var officeLight: IXiaomiBulb = {
//     address: '192.168.1.X', // IP of the bulb
//     token: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",  // bulb token get using miio cli tool
//     id: "2cd0a800-20bc-4f6a-b472-c0786592e745", // generate a UUID
// };
// MyConfig.addDevice("Office", officeLight);


var upnpServer = new UpnpServer();
var httpServer = new HttpServer()

upnpServer.start();
httpServer.start();