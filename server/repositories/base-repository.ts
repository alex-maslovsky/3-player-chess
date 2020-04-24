import database from './index';
import DatabaseCollections from '../constants/database-collections';

export interface IBaseCollection {
    id: number;
}

export default class BaseRepository<TCollection extends IBaseCollection> {
    protected database: Loki = database;
    protected collection: Collection<TCollection>;

    constructor(databaseCollection: DatabaseCollections) {
        this.collection = this.createOrGetCollection(databaseCollection);
    }

    public insert(doc: Omit<TCollection, 'id'>): TCollection {
        return this.collection.insert({
            id: this.collection.maxId + 1,
            ...doc
        } as TCollection);
    }

    public update(collection: TCollection): TCollection {
        return this.collection.update(collection);
    }

    public findOneById(id: number): TCollection | null {
        return this.collection.findOne({ id } as TCollection);
    }

    public getAll(): TCollection[] {
        return this.collection.find();
    }

    public delete(id: number): void {
        const doc = this.findOneById(id);

        if (doc) {
            this.collection.remove(doc);
        }
    }

    private createOrGetCollection(databaseCollection: DatabaseCollections): Collection<TCollection> {
        const collectionName = DatabaseCollections[databaseCollection];
        return this.database.getCollection(collectionName) || this.database.addCollection(collectionName);
    }
}
