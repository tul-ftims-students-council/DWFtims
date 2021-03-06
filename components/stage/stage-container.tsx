import useSWR from 'swr';
import cn from 'classnames';
import { Stage } from '@lib/types';
import styles from './stage-container.module.css';
import styleUtils from '../utils/utils.module.css';
import LiveChat from '@components/stage/live-chat';

type Props = {
  stage: Stage;
  allStages: Stage[];
};

export default function StageContainer({ stage, allStages }: Props) {
  const response = useSWR('/api/stages', {
    initialData: allStages,
    refreshInterval: 5000
  });

  const updatedStages = response.data || [];
  const updatedStage = updatedStages.find((s: Stage) => s.slug === stage.slug) || stage;

  const streamId = updatedStage.stream.split('/')[4];

  return (
    <div className={styles.container}>
      <div className={styles.streamContainer}>
        <div className={cn(styles.stream, styleUtils.appear, styleUtils['appear-first'])}>
          <iframe
            allow="autoplay; picture-in-picture"
            allowFullScreen
            frameBorder="0"
            src={`${updatedStage.stream}?autoplay=1&mute=1&theme=dark`}
            title={updatedStage.name}
            width="100%"
          />
          <div className={cn(styles.bottom, styleUtils.appear, styleUtils['appear-second'])}>
            <div className={styles.messageContainer}>
              <h2 className={styles.stageName}>{stage.name}</h2>
            </div>
          </div>
        </div>
      </div>
      <LiveChat liveId={streamId} />
    </div>
  );
}
