import { useState, useEffect, useMemo } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import UserList from '../components/UserList';
import Pagination from '../components/Pagination';
import SearchBar from '../components/SearchBar';
import { fetchUsers } from '../services/api';
import { User } from '../utils/types';
import styles from '../styles/Home.module.css';

const USERS_PER_PAGE = 10;

const Home: NextPage = () => {
    const [allUsers, setAllUsers] = useState<User[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const loadUsers = async () => {
            const data = await fetchUsers(1, 100); // Загружаем 100 пользователей сразу
            setAllUsers(data.results);
        };
        loadUsers();
    }, []);
// фильтрация
    const filteredUsers = useMemo(() => {
        return allUsers.filter(user =>
            user.name.first.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.name.last.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [allUsers, searchTerm]);
// тут мы делаем список
    const paginatedUsers = useMemo(() => {
        const startIndex = (currentPage - 1) * USERS_PER_PAGE;
        return filteredUsers.slice(startIndex, startIndex + USERS_PER_PAGE);
    }, [filteredUsers, currentPage]);
//тут сколько страниц будет
    const totalPages = Math.ceil(filteredUsers.length / USERS_PER_PAGE);
//тут я делаю поиск
    const handleSearch = (term: string) => {
        setSearchTerm(term);
        setCurrentPage(1);
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <div className={styles.container}>
            <Head>
                <title>User List App</title>
                <meta name="description" content="User list application" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <h1 className={styles.title}>User List</h1>
                <SearchBar onSearch={handleSearch} />
                <UserList users={paginatedUsers} />
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            </main>
        </div>
    );
};

export default Home;