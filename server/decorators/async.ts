import { Request, Response, NextFunction } from 'express';

type routeHandler = (req: Request, res: Response, next: NextFunction) => void;

function async(fn: routeHandler) {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
}

export default async;
