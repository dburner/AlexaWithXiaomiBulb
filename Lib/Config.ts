import * as uuid from 'node-uuid';

export interface ILightConfig
{
    state : {
        on: boolean;
        bri: number;
        hue: number;
        sat: number;
        effect: string;
        ct: number;
        alert: string;
        colormode: string;
        reachable: boolean;
        xy: number[];
    };

    type: string;
    name: string;
    modelid: string;
    manufacturername: string;
    uniqueid: string;
    swversion: string;
    swconfigid: string;
    productionId: string;
    pointsymbol: {
        [x: number]: string;
    }
}

export interface IHueConfig
{
    lights: {
        [lightId: string]: ILightConfig
    }
    groups: { }
}

var lightDefaults = {
    'LCT001' : {
        capability: {
            red:   { x: 0.675,  y: 0.322 },
            green: { x: 0.4091, y: 0.518 },
            blue:  { x: 0.167,  y: 0.04  },
        }, 
        defaults: {
            state : {
                on:  true,
                bri: 254,
                hue: 0,
                sat: 255,
                xy: [0.3142, 0.331],
                ct: 0,
                alert: 'none',
                effect: 'none',
                colormode: 'xy',
                reachable: true
            },
            type : 'Extended color light',
            name : 'Light',
            modelid : 'LCT001',
            swversion : '65003148',
            pointsymbol : { 1 : 'none', 2 : 'none', 3 : 'none', 4 : 'none', 5 : 'none', 6 : 'none', 7 : 'none', 8 : 'none' }
        }
    }
}

export class LightDefaultsFactory
{
    private static defaults: ILightConfig = {
        state : {
            on:  true,
            bri: 254,
            hue: 0,
            sat: 255,
            xy: [0.3142, 0.331],
            ct: 0,
            alert: 'none',
            effect: 'none',
            colormode: 'xy',
            reachable: true
        },
        type : 'Extended color light',
        name : 'Light',
        modelid : 'LCT010',
        swversion : '1.15.2_r19181',
        swconfigid: 'F921C859',
        pointsymbol : { 1 : 'none', 2 : 'none', 3 : 'none', 4 : 'none', 5 : 'none', 6 : 'none', 7 : 'none', 8 : 'none' },

        productionId: "Philips-LCT010-1-A19ECLv4",
        manufacturername: "Philips",
        uniqueid: "5102d46c-50d5-4bc7-a180-38623e4bbb08",
    };

    private static defaultsStr = JSON.stringify(LightDefaultsFactory.defaults);

    public static CreateLight(name: string, uniqueId: string) : ILightConfig
    {
        var newLight = JSON.parse(LightDefaultsFactory.defaultsStr) as ILightConfig;

        newLight.name = name;
        newLight.uniqueid = uniqueId;

        return newLight;
    }
}

export interface IXiaomiBulb
{
    address: string;
    token: string;
    id: string;
}

export class LightsConfig
{
    private config: IHueConfig;

    private bulbList: IXiaomiBulb[];

    constructor()
    {
        this.config = { 
            lights: {},
            groups: {},
        }

        this.bulbList = [];
    }

    public addDevice(name: string, xiaomiConfig: IXiaomiBulb)
    {
        var newAlexaLight = LightDefaultsFactory.CreateLight(name, xiaomiConfig.id);
        this.bulbList.push(xiaomiConfig);

        this.config.lights[xiaomiConfig.id] = newAlexaLight;
    }

    public getLightConfig(lightId: string) : ILightConfig
    {
        var result = this.config.lights[lightId];

        return result;
    }

    public getXiaomiConfig(lightId: string) : IXiaomiBulb
    {
        var result = this.bulbList.find(s => s.id == lightId);

        return result;
    }

    public getAll()
    {
        return this.config.lights;
    }
}

var myConfig = new LightsConfig();

export var MyConfig = myConfig;