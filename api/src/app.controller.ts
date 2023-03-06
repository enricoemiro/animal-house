import { resolve } from 'path';

import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';

import { SkipAuth } from './app/auth/decorators/skip-auth.decorator';

@Controller()
@SkipAuth()
export class AppController {
  @Get('/')
  async home(@Res() res: Response) {
    res.send(`
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Animal House</title>

        <style>
          @import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');

          html, body {
            font-family: 'Robot', sans-serif;
          }

          html, body, .container {
            height: 100%;
          }

          body {
            margin: 0;
          }

          .container {
            display: flex;
            flex-direction: column;
            flex: 1;
            align-items: center;
            justify-content: center;
            gap: 10px;
          }

          .button {
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 10px 20px;
            border-radius: 5px;
            color: #fff;
            font-size: 18px;
            font-weight: bold;
            text-align: center;
            cursor: pointer;
            width: 100%;
            text-decoration: none;
          }

          .frontoffice { background-color: #007bff; }
          .frontoffice:hover { background-color: #0062cc; }
          .backoffice { background-color: #28a745; }
          .backoffice:hover { background-color: #218838; }
          .game { background-color: #dc3545; }
          .game:hover { background-color: #c82333; }
        </style>
      </head>

      <body>
        <div class="container">
          <a class="button frontoffice" href="./frontoffice">Frontoffice</a>
          <a class="button backoffice" href="./backoffice">Backoffice</a>
          <a class="button game" href="./game">Game</a> 
        </div>
      </body>
      </html>
    `);
  }

  @Get('frontoffice*')
  async frontoffice(@Res() res: Response) {
    res.sendFile(resolve(__dirname, '../../frontoffice/dist/index.html'));
  }

  @Get('game*')
  async game(@Res() res: Response) {
    res.sendFile(resolve(__dirname, '../../game/dist/index.html'));
  }

  @Get('backoffice*')
  async backoffice(@Res() res: Response) {
    res.sendFile(resolve(__dirname, '../../backoffice/dist/index.html'));
  }
}
