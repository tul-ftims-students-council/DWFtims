import { useState, useEffect } from 'react';
import { getAllStages } from '@lib/cms-api';
import { Stage } from '@lib/types';
import styles from './live-chat.module.css';

type Props = {
  liveId: String;
};

const getStages = async (setLiveId: (s: any) => void) => {
  const a = await getAllStages();
  setLiveId(a.find((s: Stage) => s.slug === 'a')?.stream);
};

const LiveChat = ({ liveId }: Props) => {
  const [iframeSrc, setIframeSrc] = useState('');

  useEffect(() => {
    const currentUrl = window.location.hostname;
    console.log(currentUrl);
    console.log('id', liveId);
    setIframeSrc(`https://www.youtube.com/live_chat?v=${liveId}&embed_domain=${currentUrl}`);
  }, []);

  return (
    <div>
      <iframe src={iframeSrc} />
    </div>
  );
};

export default LiveChat;
