import { useState, useEffect } from 'react';

type Props = {
  liveId: string;
};

const LiveChat = ({ liveId }: Props) => {
  const [iframeSrc, setIframeSrc] = useState('');

  useEffect(() => {
    const currentUrl = window.location.hostname;
    setIframeSrc(
      `https://www.youtube.com/live_chat?v=${liveId}&embed_domain=${currentUrl}&theme=dark`
    );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <iframe src={iframeSrc} />
    </div>
  );
};

export default LiveChat;
