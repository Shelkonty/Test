import axios from 'axios';
import { User } from '@/utils/types';

const API_URL = 'https://randomuser.me/api/';

export async function fetchUsers(page: number = 1, results: number = 10): Promise<{ results: User[], info: { results: number } }> {
    const response = await axios.get(`${API_URL}`, {
        params: {
            page,
            results,
            seed: 'abc',
            inc: 'name,picture,login,dob,gender,email,phone,location',
            nat: 'us'
        }
    });
    return response.data;
}

// export async function fetchUserById(id: string): Promise<User> {
//     const response = await axios.get(`${API_URL}`, {
//         params: {
//             seed: id,
//             inc: 'name,picture,login,dob,gender,email,phone,location',
//             nat: 'us'
//         }
//     });
//     return response.data.results[0];
// }