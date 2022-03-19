import { ReactNode } from 'react';
import cn from 'classnames';
import styles from './header-wrapper.module.css';

interface HeaderWrapperProps {
  isRegistrationStarted: boolean;
  children: ReactNode;
}

const HeaderWrapper = ({ isRegistrationStarted, children }: HeaderWrapperProps) => (
  <div
    className={cn(styles.container, {
      [styles.hidden]: isRegistrationStarted
    })}
  >
    {children}
  </div>
);

export default HeaderWrapper;
