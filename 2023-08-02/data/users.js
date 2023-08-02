import crypto from "crypto";

export const listUser = [
    {
        id: crypto.randomUUID(),
        userName: "Alice",
        age: 18,
        email: "iZs3r@example.com",
        location: "New York",
        password: "password1",
    },
    {
        id: crypto.randomUUID(),
        userName: "Bob",
        age: 25,
        email: "bob@example.com",
        location: "London",
        password: "password2",
    },
    {
        id: crypto.randomUUID(),
        userName: "Charlie",
        age: 30,
        email: "charlie@example.com",
        location: "Paris",
        password: "password3",
    },
    {
        id: crypto.randomUUID(),
        userName: "Dave",
        age: 40,
        email: "dave@example.com",
        location: "Berlin",
        password: "password4",
    },
    {
        id: crypto.randomUUID(),
        userName: "Eve",
        age: 35,
        email: "eve@example.com",
        location: "Tokyo",
        password: "password5",
    },
    {
        id: crypto.randomUUID(),
        userName: "Frank",
        age: 22,
        email: "frank@example.com",
        location: "Sydney",
        password: "password6",
    },
];
