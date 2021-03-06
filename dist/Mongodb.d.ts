import "missing-native-js-functions";
import { Collection, Connection } from "mongoose";
import { ChangeEvent } from "mongodb";
import { Projection, Provider } from "./Provider";
import { ProviderCache } from "./ProviderCache";
import { Database } from "./Database";
import { DatastoreInterface, DatastoreProxyPath } from "./Datastore";
declare global {
    interface Array<T> {
        last(): T;
    }
}
export declare class MongoDatabase extends Database {
    uri?: string | undefined;
    opts?: {
        useNewUrlParser: boolean;
        useUnifiedTopology: boolean;
    } | undefined;
    private mongod?;
    conn: Connection;
    provider: typeof MongodbProvider;
    constructor(uri?: string | undefined, opts?: {
        useNewUrlParser: boolean;
        useUnifiedTopology: boolean;
    } | undefined);
    get data(): DatastoreInterface;
    init(): Promise<void>;
    destroy(): Promise<void>;
}
export interface MongodbProviderCache {
    on(event: "update", listener: (old: any, newdata: any) => void): this;
    on(event: "change", listener: (data: ChangeEvent<Record<string, any>>) => void): this;
}
interface MongodbProviderCacheOptions {
    onlyEvents: boolean;
}
export declare class MongodbProviderCache extends ProviderCache {
    provider: MongodbProvider;
    opts?: MongodbProviderCacheOptions | undefined;
    private changeStream?;
    static CHANGE_STREAM_SUPPORTED: boolean;
    constructor(provider: MongodbProvider, opts?: MongodbProviderCacheOptions | undefined);
    init(): Promise<MongodbProviderCache>;
    update: (data: ChangeEvent<Record<string, any>>) => Promise<void> | undefined;
    destroy(): Promise<void>;
}
export declare class MongodbProvider extends Provider {
    protected db: MongoDatabase;
    protected path: DatastoreProxyPath;
    collection: Collection;
    pipe: any[];
    document?: any;
    subpath?: string;
    updatepath?: string;
    options: any;
    arrayFilters: any[];
    cache(opts?: MongodbProviderCacheOptions): MongodbProviderCache;
    constructor(db: MongoDatabase, path: DatastoreProxyPath);
    convertFilterToQuery(obj: any): any;
    delete(): Promise<void> | Promise<boolean> | Promise<import("mongodb").DeleteWriteOpResultObject>;
    get(projection?: Projection): Promise<any>;
    set(value: any): any;
    exists(): Promise<boolean>;
    checkIfModified(result: any): Promise<boolean>;
    push(element: any): any;
    pull(): Promise<boolean> | Promise<import("mongodb").DeleteWriteOpResultObject>;
    pop(): Promise<import("mongodb").DeleteWriteOpResultObject>;
    first(): Promise<any>;
    last(): Promise<any>;
    random(): Promise<any>;
    __getProvider(): this;
}
export {};
