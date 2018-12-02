export let singletonMap = new Map<string, any>();

function singleton<T>(Type: { new(): T; }): T {
    let name: string = Type.name;
    singletonMap.set(name, new Type());
    return <T> singletonMap.get(name);
}

export default singleton;
