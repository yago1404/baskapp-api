import {NestMiddleware} from "@nestjs/common";
import {NextFunction} from "express";

export class AuthMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction): void {
        const token: string = req.headers.get('Authentication');
        console.log(token);
        next();
    }
}