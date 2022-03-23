import styles from './nextrip-logo.module.css'

export const NexTripLogo: React.FC = () => (
  <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" height="24">
    <circle className={styles.circle} cx="8" cy="8" r="7.5"></circle>
    <path className={styles.hands} d="M7.82 4.169v4.3z"></path>
    <path className={styles.hands} d="M7.82 8.869c-0.2 0-0.4-0.167-0.4-0.4v-4.3c0-0.2 0.167-0.4 0.4-0.4s0.4 0.2 0.4 0.4v4.3c0 0.2-0.2 0.4-0.4 0.4z"></path>
    <path className={styles.hands} d="M8.387 9.635l3.133 2.2z"></path>
    <path className={styles.hands} d="M11.52 12.202c-0.067 0-0.167-0.033-0.233-0.067l-3.133-2.2c-0.167-0.133-0.233-0.367-0.1-0.533s0.367-0.233 0.533-0.1l3.133 2.2c0.167 0.133 0.233 0.367 0.1 0.533-0.067 0.133-0.167 0.167-0.3 0.167z"></path>
  </svg>
)