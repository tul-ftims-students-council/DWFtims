import Link from 'next/link';
import cn from 'classnames';
import { useRouter } from 'next/router';
import { SkipNavContent } from '@reach/skip-nav';

import styles from './layout.module.css';
import Logo from '../icons/icon-logo';
import Text from '@components/svg/sign/text';
import MobileMenu from './menu/mobile-menu';
import Footer from './footer';

import { NAVIGATION } from '@lib/constants';

type Props = {
  children: React.ReactNode;
  className?: string;
  hideNav?: boolean;
  layoutStyles?: any;
  fullWidth?: boolean;
};

export default function Layout({ children, className, hideNav, layoutStyles, fullWidth }: Props) {
  const router = useRouter();
  const activeRoute = router.asPath;

  return (
    <>
      <div className={styles.background}>
        {!hideNav && (
          <header className={cn(styles.header)}>
            <div className={styles['header-container']}>
              <div className={styles['header-logos']}>
                <MobileMenu key={router.asPath} />
                <Link href="/">
                  {/* eslint-disable-next-line */}
                  <a className={styles.logo}>
                    <Text />
                  </a>
                </Link>
              </div>
              <div className={styles.tabs}>
                {NAVIGATION.map(({ name, route }) => (
                  <Link key={name} href={route}>
                    <a
                      className={cn(styles.tab, {
                        [styles['tab-active']]: activeRoute.startsWith(route)
                      })}
                    >
                      {name}
                    </a>
                  </Link>
                ))}
              </div>
            </div>
          </header>
        )}
        <div className={styles.page}>
          <main className={styles.main} style={layoutStyles}>
            <SkipNavContent />
            <div className={cn(fullWidth ? styles.full : styles.contained, className)}>
              {children}
            </div>
          </main>
          {!activeRoute.startsWith('/stage') && <Footer />}
        </div>
      </div>
    </>
  );
}
