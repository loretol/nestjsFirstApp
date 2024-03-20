import { BadRequestException, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { Logger } from '@nestjs/common';
import * as validator from 'validator';


@Injectable()
export class SecurityMiddleware implements NestMiddleware {
  private readonly logger = new Logger(SecurityMiddleware.name);

  use(req: Request, res: Response, next: NextFunction) {
    const { body } = req;
    const valores = Object.values(body) as string[];

    // Verificar si hay algún valor en el body
    if (body) {
        // Recorrer todos los valores del body
        for (const key in body) {
            if (Object.prototype.hasOwnProperty.call(body, key)) {
                const value = body[key];
                // Verificar si el valor contiene palabras clave de inyección SQL
                const sqlKeywords = ['SELECT', 'UPDATE', 'DELETE', 'INSERT', 'DROP', 'TABLE', 'FROM', 'WHERE'];
                if (sqlKeywords.some(keyword => value.toUpperCase().includes(keyword))) {
                    return res.status(400).json({ error: 'Se ha detectado una posible inyección SQL' });
                }
            }
        }
    }

    
    // 2. Verificar que las entradas no estén vacías
    if (!req.body || Object.values(req.body).some(value => value === undefined || value === '')) {
        throw new BadRequestException('Los campos no pueden estar vacíos');
      }


     // 3. Verificar que las entradas no contengan caracteres especiales
     if (valores.some(value => typeof value === 'string' && !validator.isAlphanumeric(value))) {
        throw new BadRequestException('Las entradas no pueden contener caracteres especiales');
    }
  
    next();
  }
}
