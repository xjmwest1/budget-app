import { Express } from 'express';

interface Controller {
    addEndpoints(app: Express)
}

export default Controller;