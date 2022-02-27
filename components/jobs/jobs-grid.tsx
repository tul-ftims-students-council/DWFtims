import CompanyJobs from './company-jobs';
import styles from './jobs-grid.module.css';

import { Job } from '@lib/types';

type Props = {
  jobs: Job[];
};

export default function JobsGrid({ jobs }: Props) {
  const companies = jobs.reduce((allCompanies: any, job) => {
    allCompanies[job.companyName] = [...(allCompanies[job.companyName] || []), job];
    return allCompanies;
  }, {});

  return (
    <>
      {Object.keys(companies).map((companyName: string) => (
        <div key={companyName} className={styles.companyRow}>
          <div className={styles.rowHeader}>
            <h2 className={styles.companyName}>{companyName}</h2>
          </div>
          <CompanyJobs jobs={companies[companyName]} />
        </div>
      ))}
    </>
  );
}
