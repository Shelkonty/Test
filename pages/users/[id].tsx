import { NextPage } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { User } from '@/utils/types';
import styles from '../../styles/UserCard.module.css';

const UserPage: NextPage = () => {
    const router = useRouter();
    const { userData } = router.query;

    let user: User | null = null;
    if (typeof userData === 'string') {
        try {
            user = JSON.parse(userData) as User;
        } catch (error) {
            console.error('Error parsing user data:', error);
        }
    }

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div className={styles.container}>
            <h1>{user.name.first} {user.name.last}</h1>
            <img src={user.picture.large} alt={`${user.name.first} ${user.name.last}`} />
            <p>Age: {user.dob.age}</p>
            <p>Gender: {user.gender}</p>
            <p>Email: {user.email}</p>
            <p>Phone: {user.phone}</p>
            <p>Address: {`${user.location.street.number} ${user.location.street.name}, ${user.location.city}, ${user.location.state}, ${user.location.country}`}</p>
            <Link className={styles.backButton} href="/">
                Back to List
            </Link>
        </div>
    );
};

export default UserPage;