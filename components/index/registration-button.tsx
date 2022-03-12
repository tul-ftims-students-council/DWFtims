import Form from '@components/utils/form';
import cn from 'classnames';
import { useCallback, useState } from 'react';
import styleUtils from '../utils/utils.module.css';
import styles from './registration-button.module.css';

export default function () {
  const [isRegistrationStarted, setIsRegistrationStarted] = useState(false);

  const handleStartingRegistration = useCallback(() => {
    setIsRegistrationStarted(true);
  }, []);

  if (isRegistrationStarted) {
    return <Form />;
  }

  return (
    <div className={cn(styles.wrapper, styleUtils.appear, styleUtils['appear-fifth'])}>
      <button type="submit" className={styles.register} onClick={handleStartingRegistration}>
        Zgarnij upsrawiedliwienie
      </button>
      <div className={styles['only-for']}>
        Tylko dla <span className={styles.students}>Studentów</span>.
      </div>
    </div>
  );
}
