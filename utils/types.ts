export interface User {
    name: {
        first: string;
        last: string;
    };
    picture: {
        large: string;
        medium: string;
        thumbnail: string;
    };
    login: {
        uuid: string;
    };
    dob: {
        age: number;
    };
    gender: string;
    email: string;
    phone: string;
    location: {
        street: {
            number: number;
            name: string;
        };
        city: string;
        state: string;
        country: string;
    };
}