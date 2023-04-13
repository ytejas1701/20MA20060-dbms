import styles from './styles.module.css'

export default function Center({children}) {
    return (
        <div className={styles.outer}>
            {children}
        </div>
    )
}