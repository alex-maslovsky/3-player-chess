import { Socket } from 'socket.io';
import ControllerEvents from '../constants/controller-events';
import * as jwtService from '../services/jwt-service';

export interface IAuthParams {
    token: string;
}

export interface ITokenData {
    username: string;
}

export default function auth<TParams extends IAuthParams>(fn: (params: TParams, tokenData: ITokenData) => void) {
    return function (this: Socket, params: TParams): void {
        const tokenData = jwtService.verify<ITokenData>(params.token);

        if (tokenData) {
            fn(params, tokenData);
        } else {
            this.emit(ControllerEvents.Unauthorized);
        }
    };
}
