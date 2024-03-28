export default async function Page() {
    // const res = await fetch('https://jsonplaceholder.org/users?id=1');
    // // The return value is *not* serialized
    // // You can use Date, Map, Set, etc.
    // const data = await res.json();

    const data = [{ id: 1 }, { id: 2 }, { id: 3 }];

    return <div>{JSON.stringify(data)}</div>;
}
