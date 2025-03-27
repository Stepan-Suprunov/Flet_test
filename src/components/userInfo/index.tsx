import {UserType} from '../../types';
import {Loader} from '../index.ts';

type UserInfoPropsType = {
    user: UserType | null;
    loading: boolean;
    error: string | null;
};

export function UserInfo ({ user, loading, error }: UserInfoPropsType) {

    if (loading) return <Loader/>;
    if (error) return <div>{error}</div>;
    if (!user) return null;

    return (
        <div>
            <h3>{user.name}</h3>
            <p>Электронная почта: {user.email}</p>
            <p>Телефон: {user.phone}</p>
            <p>Сайт: {user.website}</p>
            <p>Компания: {user.company.name}</p>
        </div>
    );
};