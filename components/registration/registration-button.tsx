import cn from 'classnames';
import styleUtils from '../utils/utils.module.css';
import styles from './registration-button.module.css';

interface RegistrationButtonProps {
  isRegistrationStarted: boolean;
  handleStartingRegistration: () => void;
}

const RegistrationButton = ({
  isRegistrationStarted,
  handleStartingRegistration
}: RegistrationButtonProps) => {
  return (
    <div
      className={cn(styles.wrapper, styleUtils.appear, styleUtils['appear-fifth'], {
        [styles['wrapper-hidden']]: isRegistrationStarted,
        [styleUtils.disappear]: isRegistrationStarted
      })}
    >
      <button type="submit" className={styles.register} onClick={handleStartingRegistration}>
        Zgarnij upsrawiedliwienie
      </button>
      <div className={styles['only-for']}>
        Tylko dla <span className={styles.students}>Studentów</span>.
      </div>
    </div>
  );
};

export default RegistrationButton;
