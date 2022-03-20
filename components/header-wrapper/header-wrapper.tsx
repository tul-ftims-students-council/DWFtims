import { ReactNode } from 'react';
import cn from 'classnames';
import styles from './header-wrapper.module.css';

interface HeaderWrapperProps {
  isRegistrationStarted: boolean;
  isFormVisible: boolean;
  children: ReactNode;
}

const HeaderWrapper = ({ isRegistrationStarted, isFormVisible, children }: HeaderWrapperProps) => (
  <div
    className={cn(styles.container, {
      [styles.hidden]: isRegistrationStarted,
      [styles['display-none']]: isFormVisible
    })}
  >
    {children}
  </div>
);

export default HeaderWrapper;
