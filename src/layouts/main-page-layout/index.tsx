import React from 'react';
import styles from './style.module.css'

type MainPageLayoutPropsType = {
    children: React.ReactNode;
};

export function MainPageLayout({ children }: MainPageLayoutPropsType) {
    return (
        <div className={styles.layout}>
            <header className={styles.header}>
                <h1 className={styles.title}>Приложение для просмотра Постов</h1>
            </header>

            <main className={styles.content}>
                <div className={styles.container}>
                    {children}
                </div>
            </main>

            <footer className={styles.footer}>
                <p>© 2025 ФЛЕТ</p>
            </footer>
        </div>
    );
};