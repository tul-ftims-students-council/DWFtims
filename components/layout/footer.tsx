import cn from 'classnames';
import styles from './footer.module.css';

import { SITE_NAME } from '@lib/constants';

export default function Footer() {
  return (
    <footer className={cn(styles.footer)}>
      <div className={styles['footer-legal']}>
        <div className={styles['footer-copyright']}>
          Copyright © {`${new Date().getFullYear()} ${SITE_NAME}.`} All
          rights reserved.
        </div>
      </div>
    </footer>
  );
}
