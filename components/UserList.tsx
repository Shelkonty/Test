import Link from 'next/link';
import { User } from '../utils/types';
import styles from '../styles/UserList.module.css';

interface UserListProps {
    users: User[];
}

const UserList: React.FC<UserListProps> = ({ users }) => {
    return (
        <ul className={styles.userList}>
            {users.map((user) => (
                <li key={user.login.uuid}>
                    <Link
                        href={{
                            pathname: `/users/${user.login.uuid}`,
                            query: { userData: JSON.stringify(user) },
                        }}
                        as={`/users/${user.login.uuid}`}
                    >

                            <img src={user.picture.thumbnail} alt={`${user.name.first} ${user.name.last}`} />
                            <span>{user.name.first} {user.name.last}</span>

                    </Link>
                </li>
            ))}
        </ul>
    );
};

export default UserList;