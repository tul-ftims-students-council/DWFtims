import { useState, useCallback } from 'react';
import cn from 'classnames';
import FormError from '@lib/form-error';
import LoadingDots from '../utils/loading-dots';
import styleUtils from '../utils/utils.module.css';
import styles from './form.module.css';
import { register } from '@lib/user-api';
import Captcha, { useCaptcha } from '../utils/captcha';
import { Talk } from '@lib/types';

type FormState = 'default' | 'loading' | 'error';

type Props = {
  sharePage?: boolean;
  allTalks: Talk[];
};

export default function Form({ sharePage, allTalks }: Props) {
  const [indexNumber, setIndexNumber] = useState('');
  const [selectedTalks, setSelectedTalks] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');
  const [focused, setFocused] = useState(false);
  const [formState, setFormState] = useState<FormState>('default');
  const {
    ref: captchaRef,
    execute: executeCaptcha,
    reset: resetCaptcha,
    isEnabled: isCaptchaEnabled
  } = useCaptcha();

  const handleRegister = useCallback(async () => {
    try {
      const res = await register(indexNumber, selectedTalks);

      if (!res.ok) {
        throw new FormError(res);
      }
    } catch (err) {
      let message = 'Ups! coś poszło nie tak.';

      if (err instanceof FormError) {
        const { res } = err;
        const data = res.headers.get('Content-Type')?.includes('application/json')
          ? await res.json()
          : null;

        message = data?.message;
      }

      setErrorMsg(message);
      setFormState('error');
    }
  }, [indexNumber, selectedTalks]);

  const onSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();

      if (formState === 'default') {
        setFormState('loading');

        if (isCaptchaEnabled) {
          return executeCaptcha();
        }

        return handleRegister();
      } else {
        setFormState('default');
      }
    },
    [executeCaptcha, formState, isCaptchaEnabled, handleRegister]
  );

  const onTryAgainClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();

      setFormState('default');
      resetCaptcha();
    },
    [resetCaptcha]
  );

  return formState === 'error' ? (
    <div
      className={cn(styles.form, styleUtils.appear, {
        [styles['share-page']]: sharePage
      })}
    >
      <div className={styles['form-row']}>
        <div className={cn(styles['input-label'], styles.error)}>
          <div className={cn(styles.input, styles['input-text'])}>{errorMsg}</div>
          <button
            type="button"
            className={cn(styles.submit, styles.register, styles.error)}
            onClick={onTryAgainClick}
          >
            Spróbuj ponownie
          </button>
        </div>
      </div>
    </div>
  ) : (
    <form
      className={cn(styles.form, styleUtils.appear, {
        [styles['share-page']]: sharePage
      })}
      onSubmit={onSubmit}
    >
      <div className={styles['form-row']}>
        <label
          htmlFor="email-input-field"
          className={cn(styles['input-label'], {
            [styles.focused]: focused
          })}
        >
          <input
            className={styles.input}
            autoComplete="off"
            type="indexNumber"
            id="index-input-field"
            pattern="[0-9]{6}"
            value={indexNumber}
            onChange={e => setIndexNumber(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder="Wprowadź numer indeksu"
            aria-label="Twój numer indeksu"
            required
          />
        </label>
        <button
          type="submit"
          className={cn(styles.submit, styles[formState])}
          disabled={formState === 'loading'}
        >
          {formState === 'loading' ? <LoadingDots size={4} /> : <>Zapisz mnie!</>}
        </button>
      </div>
      <Captcha ref={captchaRef} onVerify={handleRegister} />
    </form>
  );
}
