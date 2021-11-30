import Space from './Space';
import { useState, useEffect } from 'react';

// Socket
import { connectWithAgentSocket } from './utils/socketConnection';
import { connectWithEgm } from './utils/webSocketConnection';

// Redux
import { useSelector } from 'react-redux';

// Hooks
import useHttp from './hook/useHttp';

// APis
import { spin } from './utils/api';

import styles from './App.module.css';

const App = () => {
  const [isMale, setIsMale] = useState(true);
  const [isAutoGame, setIsAutoGame] = useState(false);

  // Redux
  const { egmStatus, agentStatus } = useSelector(
    state => state.connectionStatus
  );

  const { cashPoint, promotion } = useSelector(state => state.egmData);

  // Http
  const { sendRequest, error } = useHttp(spin);

  useEffect(() => {
    connectWithAgentSocket();
    connectWithEgm();
  }, []);

  useEffect(() => {
    let autoGameLoop;

    if (isAutoGame) {
      autoGameLoop = setInterval(() => {
        sendRequest();
      }, 3000);
    }

    if (!isAutoGame) {
      clearInterval(autoGameLoop);
    }

    if (error && isAutoGame) {
      clearInterval(autoGameLoop);
      setIsAutoGame(false);
      alert(error);
    }

    return () => {
      clearInterval(autoGameLoop);
    };
  }, [isAutoGame, sendRequest, error]);

  return (
    <main className={styles.main}>
      <section
        className={`${styles.container} ${
          isMale ? styles.male : styles.female
        }`}
      >
        <div className={styles.conStatusBox}>
          <div style={{ marginBottom: '.5em' }}>
            <Space>
              <span
                className={`${styles.dot} ${
                  egmStatus === 'success'
                    ? styles.success
                    : egmStatus === 'error'
                    ? styles.error
                    : styles.secondary
                }`}
              />
              <span>
                {egmStatus === 'closed'
                  ? '程式等待中'
                  : egmStatus === 'success'
                  ? '程式正常'
                  : egmStatus === 'error'
                  ? '程式錯誤'
                  : '程式等待中'}
              </span>
            </Space>
          </div>

          <div>
            <Space>
              <span
                className={`${styles.dot} ${
                  agentStatus === 'success'
                    ? styles.success
                    : agentStatus === 'error'
                    ? styles.error
                    : styles.secondary
                }`}
              />
              <span>
                {agentStatus === 'closed'
                  ? '連線中'
                  : agentStatus === 'success'
                  ? '連線正常'
                  : agentStatus === 'error'
                  ? '連線錯誤'
                  : '連線中'}
              </span>
            </Space>
          </div>
        </div>

        <div className={styles.contentBox}>
          <div className={styles.name}>王小明</div>
          <div className={styles.bonus}>bonus</div>

          <div className={styles.campaign}>
            {promotion ? promotion : promotion === 0 ? 0 : 'Loading...'}
          </div>

          <div className={styles.cash}>
            {cashPoint ? cashPoint : cashPoint === 0 ? 0 : 'Loading...'}
          </div>
        </div>

        <div className={styles.actionBox}>
          <div
            onClick={() => {
              alert('take win');
            }}
            className={styles.takeWin}
          />
          <div
            onClick={() => {
              setIsAutoGame(pre => !pre);
              sendRequest();
              // closeEgmConnect();
            }}
            className={`${styles.autoGame} ${
              isAutoGame ? styles.startAutoGame : styles.stopAutoGame
            }`}
          />
        </div>

        <div className={styles.marqueeBox}>
          <div>
            <p style={{ marginRight: '5em' }}>眾家遊戲 🔥 火熱上線</p>

            <p style={{ marginRight: '5em' }}>更多遊戲 🔥 等你來玩</p>

            <p style={{ marginRight: '5em' }}>押的越多 🔥 送得越多</p>

            <p>12/1 ~ 12/31 歡慶開幕大放送.</p>
          </div>
        </div>
      </section>

      <button
        style={{ position: 'fixed', bottom: 0, left: 0, display: 'none' }}
        onClick={() => setIsMale(pre => !pre)}
      >
        toggle
      </button>
    </main>
  );
};

export default App;
