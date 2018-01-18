const miio = require('miio');

import { IXiaomiBulb } from "./Config";

interface IMiioDictionary {
    [id: string]: any;
}

export class MiioDeviceRepo
{
    private cache: IMiioDictionary = { };

    public async getMiioDevice(bulb: IXiaomiBulb) : Promise<any>
    {
        var cachedVal = this.cache[bulb.id];

        if (cachedVal)
            return cachedVal;

        var device = await miio.device(bulb);

        this.cache[bulb.id] = device;

        return device;
    }
}

export var miioRepo = new MiioDeviceRepo();