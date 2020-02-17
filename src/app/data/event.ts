import { ILocation } from './location';
import { ISession } from './session';

export interface IEvent {
    id: number;
    name: string;
    date: string;
    time: string;
    price: number;
    imageUrl: string;
    location: ILocation;
    sessions: ISession[];
}
