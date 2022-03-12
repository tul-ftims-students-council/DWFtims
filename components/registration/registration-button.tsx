import cn from 'classnames';
import styleUtils from '../utils/utils.module.css';
import styles from './registration-button.module.css';

interface Props {
  handleStartingRegistration: () => void;
}

export default function ({ handleStartingRegistration }: Props) {
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
