import {UserType} from '../../types';
import {Loader} from '../index.ts';
import styles from './style.module.css'

type UserInfoPropsType = {
    user: UserType | null;
    loading: boolean;
    error: string | null;
};

export function UserInfo({user, loading, error}: UserInfoPropsType) {

    if (loading) return <Loader/>;
    if (error) return <div>{error}</div>;
    if (!user) return null;

    return (
        <div className={styles.userInfo}>
            <h3 className={styles.userName}>{user.name}</h3>
            <div className={styles.userDetails}>
                <p><span className={styles.label}>Электронная почта:</span> {user.email}</p>
                <p><span className={styles.label}>Телефон:</span> {user.phone}</p>
                <p><span className={styles.label}>Сайт:</span> {user.website}</p>
                <p><span className={styles.label}>Компания:</span> {user.company.name}</p>
            </div>
        </div>
    );
};