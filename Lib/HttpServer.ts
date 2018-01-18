import Hapi = require('hapi');

import { AlexaController } from './AlexaController';
import { MyConfig as config } from './Config';
import { logger } from './Logger';

const PORT=8082;
const server = new Hapi.Server();

export class HttpServer
{
    public start()
    {
        server.connection({ host: '0.0.0.0', port: PORT });

        // GET /api/hm3JnxYjJAKVDx8OkGQZwk1UKTwslVGKn0or5N29/lights
        // GET /api/hm3JnxYjJAKVDx8OkGQZwk1UKTwslVGKn0or5N29/groups/0
        // GET /api/hm3JnxYjJAKVDx8OkGQZwk1UKTwslVGKn0or5N29/lights/c876ba4b-1f7c-40fa-9bdd-c4a4402e66d9
        // PUT /api/hm3JnxYjJAKVDx8OkGQZwk1UKTwslVGKn0or5N29/lights/c876ba4b-1f7c-40fa-9bdd-c4a4402e66d9/state

        server.route({ method: 'GET', path: '/upnp/amazon-ha-bridge/setup.xml',     handler: AlexaController.GetSetupXml  });
        server.route({ method: 'GET', path: '/api/{userId}/lights',                 handler: AlexaController.GetAllLights });
        server.route({ method: 'GET', path: '/api/{userId}/lights/{lightId}',       handler: AlexaController.GetState     });
        server.route({ method: 'PUT', path: '/api/{userId}/lights/{lightId}/state', handler: AlexaController.PutState     });
        
        // Start the server
        server.start((err) => {
            if (err) {
                throw err;
            }
            
            logger.log('Server running at:', server.info.uri);
        });
    }
}