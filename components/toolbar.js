import { useRouter } from 'next/router';
import styles from '../styles/Toolbar.module.css';

export const Toolbar = () => {
  const router = useRouter();

  return (
    <div className={styles.main}>
      <div onClick={() => router.push('/')}>Home</div>
      <div onClick={() => window.location.href = 'https://www.cristianoronaldo.com/#cr7'}>Cristiano</div>
      <div onClick={() => window.location.href = 'https://messi.com/'}>Messi</div>
      <div onClick={() => window.location.href = 'https://www.neymarjr.com/en'}>Neymar</div>
    </div>
  );
};