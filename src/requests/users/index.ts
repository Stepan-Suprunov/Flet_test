import {UserType} from '../../types';

export const fetchUsers = async (userId: number): Promise<UserType> => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
    if (!response.ok) {
        throw new Error('Failed to fetch users');
    };

    return response.json();
};