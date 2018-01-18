import ssdp = require("peer-ssdp");
import { logger } from './Logger';

export class UpnpServer
{
    public start()
    {
        var peer = ssdp.createPeer();

        // handle SSDP M-SEARCH messages.  
        // param headers is JSON object containing the headers of the SSDP M-SEARCH message as key-value-pair.  
        // param address is the socket address of the sender 
        peer.on("search",function(headers, address){
            // handle search request 
            // reply to search request 
            // {{networkInterfaceAddress}} will be replaced with the actual IP Address of the corresponding
            // sending the SSDP message with the actual IP Address of the corresponding 
            // Network interface. 
            logger.debug("SEARCH: headers: %j, address: %j", headers, address);

            if (headers.ST && headers.MAN=='"ssdp:discover"') {
                peer.reply({
                    
                    NT: "urn:schemas-upnp-org:device:basic:1",
                    SERVER: "node.js/0.10.28 UPnP/1.1",
                    ST: "urn:schemas-upnp-org:device:basic:1",
                    USN: "uuid:Socket-1_0-221438K0100073::urn:Belkin:device:**",
                    LOCATION: "http://{{networkInterfaceAddress}}:8082/upnp/amazon-ha-bridge/setup.xml",
                }, address);
            }
        });

        peer.start();
    }
}