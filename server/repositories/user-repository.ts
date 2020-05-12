import BaseRepository, { IBaseDocument } from './base-repository';
import DatabaseCollections from '../constants/database-collections';

export interface IUserCollection extends IBaseDocument {
    socketIds: string[];
    username: string;
    lastRequestAt: Date;
}

export default class UserRepository extends BaseRepository<IUserCollection> {
    constructor() {
        super(DatabaseCollections.Users);
    }

    public findByUsername(username: string): IUserCollection | null {
        return this.collection.findOne({ username });
    }

    public updateLastRequestAt(username: string): IUserCollection | null {
        const user = this.findByUsername(username);

        if (!user) {
            return null;
        }

        user.lastRequestAt = new Date();

        return this.collection.update(user);
    }

    public deleteInactiveUsers(): void {
        const twoDaysMs = 1000 * 60 * 60 * 24 * 2;
        const users = this.collection.find({ lastRequestAt: { $lte: new Date(Date.now() - twoDaysMs) } });

        if (users.length) {
            this.collection.remove(users);
        }
    }

    public findBySocketId(socketId: string): IUserCollection | null {
        return this.collection.findOne({ socketIds: { $contains: socketId } });
    }
}
