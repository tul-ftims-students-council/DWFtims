import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { SkipNavContent } from '@reach/skip-nav';

import Page from '@components/layout/page';
import ConfContent from '@components/index';

import { META_DESCRIPTION } from '@lib/constants';
import { Talk } from '@lib/types';
import { getallTalks } from '@lib/cms-api';

type Props = {
  allTalks: Talk[];
};

export default function Conf({ allTalks }: Props) {
  const { query } = useRouter();
  const meta = {
    title: 'Dzień wydziału FTIMS',
    description: META_DESCRIPTION
  };
  const ticketNumber = query.ticketNumber?.toString();
  const defaultUserData = {
    id: query.id?.toString(),
    ticketNumber: ticketNumber ? parseInt(ticketNumber, 10) : undefined,
    name: query.name?.toString(),
    username: query.username?.toString()
  };

  return (
    <Page meta={meta} fullViewport>
      <SkipNavContent />
      <ConfContent
        defaultUserData={defaultUserData}
        allTalks={allTalks}
        defaultPageState={query.ticketNumber ? 'ticket' : 'registration'}
      />
    </Page>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const allTalks = await getallTalks();

  return {
    props: {
      allTalks
    },
    revalidate: 60
  };
};
