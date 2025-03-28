import loaderGif from '../../../public/loader.gif'
import styles from './style.module.css'

export function Loader () {
    return(
        <div className={styles.loaderContainer}>
            <img
                src={loaderGif}
                alt='Loading...'
                className={styles.loaderImage}
            />
            <p className={styles.loaderText}>
                Данные загружаются. Пожалуйста, подождите...
            </p>
        </div>
    );
};