import Link from 'next/link';
import Image from 'next/image';
import GithubIcon from '@components/icons/icon-github';
import { Speaker } from '@lib/types';
import styles from './speaker-section.module.css';

const LinkedInIcon = () => (
  <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M27.2727 0H2.72727C1.22045 0 0 1.22045 0 2.72727V27.2727C0 28.7795 1.22045 30 2.72727 30H27.2727C28.7795 30 30 28.7795 30 27.2727V2.72727C30 1.22045 28.7795 0 27.2727 0ZM9.48273 24.5455H5.46V11.6018H9.48273V24.5455ZM7.43046 9.75136C6.13364 9.75136 5.085 8.7 5.085 7.40591C5.085 6.11182 6.135 5.06182 7.43046 5.06182C8.72318 5.06182 9.77455 6.11318 9.77455 7.40591C9.77455 8.7 8.72318 9.75136 7.43046 9.75136ZM24.5509 24.5455H20.5309V18.2509C20.5309 16.7495 20.5036 14.8186 18.4405 14.8186C16.3473 14.8186 16.0255 16.4536 16.0255 18.1418V24.5455H12.0055V11.6018H15.8645V13.3705H15.9191C16.4564 12.3532 17.7682 11.28 19.725 11.28C23.7982 11.28 24.5509 13.9609 24.5509 17.4464V24.5455V24.5455Z"
      fill="#8a8f98"
    />
  </svg>
);

type Props = {
  speaker: Speaker;
};

export default function SpeakerSection({ speaker }: Props) {
  return (
    <>
      <Link href="/speakers">
        <a className={styles.backlink}>
          <svg
            viewBox="0 0 24 24"
            width="24"
            height="24"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            shapeRendering="geometricPrecision"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
          Powrót do prelegentów
        </a>
      </Link>
      <div key={speaker.name} className={styles.container}>
        <div style={{ minWidth: '300px' }}>
          <Image
            alt={speaker.name}
            title={speaker.name}
            src={speaker.image.url}
            className={styles.image}
            objectFit="cover"
            loading="lazy"
            height={500}
            width={400}
          />
        </div>
        <div className={styles['speaker-details']}>
          <div>
            <h1 className={styles.name}>{speaker.name}</h1>
            <p className={styles.title}>
              {`${speaker.title} @ `}
              <span className={styles.company}>{speaker.company}</span>
            </p>
            <h2 className={styles['bio-header']}>Bio</h2>
            <p className={styles.bio}>{speaker.bio}</p>
            {(typeof speaker.linkedin === 'string' || typeof speaker.github === 'string') && (
              <h3 className={styles['socials-header']}>Social Media</h3>
            )}
            {typeof speaker.linkedin === 'string' && (
              <a
                className={styles['linkedin-link']}
                aria-label="linkedin"
                href={speaker.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                <LinkedInIcon />
              </a>
            )}
            {typeof speaker.github === 'string' && (
              <a
                aria-label="GitHub"
                className={styles.githubIcon}
                href={speaker.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                <GithubIcon size={30} />
              </a>
            )}
          </div>
        </div>
      </div>
      {speaker.talk && (
        <div className={styles['talk-details']}>
          <h3 className={styles['socials-header']}>{speaker.talk.title}</h3>
          <p>{speaker.talk.description}</p>
        </div>
      )}
    </>
  );
}
