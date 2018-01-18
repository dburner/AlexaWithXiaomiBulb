import * as fs from 'fs';
import Hapi = require('hapi');
import { RequestParams } from './Constants';
import { LightsConfig, MyConfig } from './Config';
import { logger } from './Logger';
import { miioRepo } from './MiioDevicesRepo';


export class AlexaController
{
    public static async PutState(request: Hapi.Request, reply: Hapi.ReplyNoContinue)
    {
        var lightId = request.params[RequestParams.LightId];
        
        logger.debug("Got request for %s", lightId);
        logger.debug("Request payload: %j ", request.payload);

        var bulb = MyConfig.getXiaomiConfig(lightId);
        var device = await miioRepo.getMiioDevice(bulb);

        var payload = JSON.parse(Object.keys(request.payload)[0]);

        if (payload.bri !== undefined)
        {
            var value = Math.round(payload.bri / 255 * 100);

            logger.debug("Setting brightness to: %s", value);
            device.setBrightness(value);
        }

        if (payload.on !== undefined)
            device.setPower(payload.on);

        // {"bri":127}
        // {"on": true}

        var responseStr= [{ 
            "success": { 
                ['/lights/' + lightId + '/state/on']: payload.on 
            }
        }];

        return reply(responseStr);
    }

    public static GetState(request: Hapi.Request, reply: Hapi.ReplyNoContinue)
    {
        var lightId = request.params[RequestParams.LightId];

        var light = MyConfig.getLightConfig(lightId);

        return reply(light).code(200);
    }

    public static GetAllLights(request: Hapi.Request, reply: Hapi.ReplyNoContinue)
    {
        logger.debug("Seding config.json, Request path: %j", request.path);
        var allLights = MyConfig.getAll()

        return reply(allLights).code(200);
    }

    public static GetSetupXml(request: Hapi.Request, reply: Hapi.ReplyNoContinue)
    {
        var setup = fs.readFileSync('Staticfiles/setup.xml');
        
        logger.debug("Sending setup.xml");

        return reply(setup).code(200).type("application/xml");
    }
}