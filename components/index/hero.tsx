import cn from 'classnames';
import styleUtils from '../utils/utils.module.css';
import styles from './hero.module.css';
import { DATE, SITE_DESCRIPTION } from '@lib/constants';

interface Props {
  isRegistrationStarted: boolean;
}

export default function Hero({ isRegistrationStarted }: Props) {
  const [day, month, year] = DATE.split('.');
  const currentDate = new Date();
  const currentDay = currentDate.getDate().toString();
  const currentMonth = (currentDate.getMonth() + 1).toString();
  const currentYear = currentDate.getFullYear().toString();
  const isOnline = day === currentDay && month === currentMonth && year === currentYear;

  return (
    <div
      className={cn(styles.wrapper, {
        [styles['parcial-width']]: isRegistrationStarted
      })}
    >
      <h2
        className={cn(
          styleUtils.appear,
          styleUtils['appear-third'],
          styleUtils['show-on-mobile'],
          styles.description,
          {
            [styles['align-left']]: isRegistrationStarted
          }
        )}
      >
        {SITE_DESCRIPTION}
      </h2>
      <h1
        className={cn(styleUtils.appear, styleUtils['appear-third'], styles.hero, {
          [styles['align-left']]: isRegistrationStarted
        })}
      >
        DZIEŃ WYDZIAŁU <br /> FTIMS
      </h1>
      <h2
        className={cn(
          styleUtils.appear,
          styleUtils['appear-third'],
          styleUtils['show-on-tablet'],
          styles.description,
          { [styles['align-left']]: isRegistrationStarted }
        )}
      >
        {SITE_DESCRIPTION}
      </h2>
      <div
        className={cn(
          {
            [styles.justified]: !isRegistrationStarted,
            [styles['align-left']]: isRegistrationStarted
          },
          styleUtils.appear,
          styleUtils['appear-fourth'],
          styles.info
        )}
      >
        <p>{DATE}</p>
        <div className={styles['description-separator']} />
        <p>
          <strong>{isOnline ? 'Online' : 'Offline'}</strong>
        </p>
      </div>
    </div>
  );
}
