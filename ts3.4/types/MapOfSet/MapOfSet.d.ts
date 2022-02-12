export declare class MapOfSet<K, V> {
    readonly map: Map<K, Set<V>>;
    constructor();
    get(key: K): Set<V>;
    add(key: K, value: V): void;
}
