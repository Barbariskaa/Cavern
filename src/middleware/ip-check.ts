   // src/server/middleware/ipWhitelist.ts
   import { defineEventHandler, H3Event, sendError } from 'h3';
   import { accessConfig  } from '../../data/config/app/access';

   export default defineEventHandler(async (event: H3Event) => {
    if (!accessConfig.enableIPWhitelist) {
      return; // Если белый список выключен, пропускаем
    }

    const clientIP = event.node.req.socket.remoteAddress;

    if (!accessConfig.allowedIPs.includes(clientIP)) {
      return sendError(event, {
        statusCode: 403,
        statusMessage: 'Доступ запрещён',
      });
    }
  });
