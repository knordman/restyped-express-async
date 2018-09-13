import * as express from 'express-serve-static-core';
import { RestypedBase, RestypedRoute } from 'restyped';
export interface TypedRequest<T extends RestypedRoute> extends express.Request {
    body: T['body'];
    params: T['params'];
    query: T['query'];
}
declare type Handler = (req: express.Request, res: express.Response, next: express.NextFunction) => void;
declare type TypedHandler<T extends RestypedRoute, Response> = (req: TypedRequest<T>, res: express.Response) => Promise<Response>;
declare type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'HEAD' | 'DELETE' | 'OPTIONS';
export default function AsyncRouter<APIDef extends RestypedBase>(app: express.Express | express.Router): {
    route: <Path extends keyof APIDef, Method extends HTTPMethod>(path: Path, method: Method, handler: TypedHandler<APIDef[Path][Method], APIDef[Path][Method]["response"]>, middlewares: Handler[]) => void;
    use: any;
    get: <Path extends keyof APIDef>(path: Path, handler: TypedHandler<APIDef[Path]["GET"], APIDef[Path]["GET"]["response"]>, ...middlewares: Handler[]) => void;
    post: <Path extends keyof APIDef>(path: Path, handler: TypedHandler<APIDef[Path]["POST"], APIDef[Path]["POST"]["response"]>, ...middlewares: Handler[]) => void;
    put: <Path extends keyof APIDef>(path: Path, handler: TypedHandler<APIDef[Path]["PUT"], APIDef[Path]["PUT"]["response"]>, ...middlewares: Handler[]) => void;
    delete: <Path extends keyof APIDef>(path: Path, handler: TypedHandler<APIDef[Path]["DELETE"], APIDef[Path]["DELETE"]["response"]>, ...middlewares: Handler[]) => void;
    patch: <Path extends keyof APIDef>(path: Path, handler: TypedHandler<APIDef[Path]["PATCH"], APIDef[Path]["PATCH"]["response"]>, ...middlewares: Handler[]) => void;
    options: <Path extends keyof APIDef>(path: Path, handler: TypedHandler<APIDef[Path]["OPTIONS"], APIDef[Path]["OPTIONS"]["response"]>, ...middlewares: Handler[]) => void;
    head: <Path extends keyof APIDef>(path: Path, handler: TypedHandler<APIDef[Path]["HEAD"], APIDef[Path]["HEAD"]["response"]>, ...middlewares: Handler[]) => void;
};
export {};
