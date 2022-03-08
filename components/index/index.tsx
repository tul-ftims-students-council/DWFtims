import { useState } from 'react';
import RegisterConfirmation from '../register-confirmation/register-confirmation';
import Layout from '../layout/layout';
import Hero from './hero';
import Form from '../utils/form';

import ConfContainer from '@components/conference/conf-container';

import { PageState, ConfDataContext, UserData } from '@lib/hooks/use-conf-data';

type Props = {
  defaultUserData: UserData;
  sharePage?: boolean;
  defaultPageState?: PageState;
};

export default function Conf({
  defaultUserData,
  sharePage,
  defaultPageState = 'registration'
}: Props) {
  const [userData, setUserData] = useState<UserData>(defaultUserData);
  const [pageState, setPageState] = useState<PageState>(defaultPageState);

  return (
    <ConfDataContext.Provider
      value={{
        userData,
        setUserData,
        setPageState
      }}
    >
      <Layout>
        <ConfContainer>
          {pageState === 'registration' && !sharePage ? (
            <>
              <Hero />
              <Form />
            </>
          ) : (
            <RegisterConfirmation sharePage={sharePage} />
          )}
        </ConfContainer>
      </Layout>
    </ConfDataContext.Provider>
  );
}
