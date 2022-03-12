import { useCallback, useState } from 'react';
import RegisterConfirmation from '../register-confirmation/register-confirmation';
import Layout from '../layout/layout';
import Hero from './hero';

import RegistrationButton from '@components/registration/registration-button';
import ConfContainer from '@components/conference/conf-container';
import Form from '@components/registration/form';

import { PageState, ConfDataContext, UserData } from '@lib/hooks/use-conf-data';
import { Talk } from '@lib/types';

type Props = {
  defaultUserData: UserData;
  sharePage?: boolean;
  defaultPageState?: PageState;
  allTalks: Talk[];
};

export default function Conf({
  allTalks,
  defaultUserData,
  sharePage,
  defaultPageState = 'registration'
}: Props) {
  const [userData, setUserData] = useState<UserData>(defaultUserData);
  const [pageState, setPageState] = useState<PageState>(defaultPageState);
  const [isRegistrationStarted, setIsRegistrationStarted] = useState(false);

  const handleStartingRegistration = useCallback(() => {
    setIsRegistrationStarted(true);
  }, []);

  return (
    <ConfDataContext.Provider
      value={{
        userData,
        setUserData,
        setPageState
      }}
    >
      <Layout fullWidth={!isRegistrationStarted}>
        <ConfContainer isRegistrationStarted={isRegistrationStarted}>
          {pageState === 'registration' && !sharePage ? (
            <>
              <Hero isRegistrationStarted={isRegistrationStarted} />
              {isRegistrationStarted ? (
                <Form allTalks={allTalks} />
              ) : (
                <RegistrationButton handleStartingRegistration={handleStartingRegistration} />
              )}
            </>
          ) : (
            <RegisterConfirmation sharePage={sharePage} />
          )}
        </ConfContainer>
      </Layout>
    </ConfDataContext.Provider>
  );
}
