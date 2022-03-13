import { ReactNode } from 'react';
import cn from 'classnames';
import styles from './conf-container.module.css';

interface Props {
  children: ReactNode;
  isRegistrationStarted: boolean;
}

export default function ConfContainer({ children, isRegistrationStarted }: Props) {
  return (
    <div
      className={cn(styles.container, {
        [styles.column]: !isRegistrationStarted,
        [styles['space-between']]: isRegistrationStarted
      })}
    >
      {children}
    </div>
  );
}
