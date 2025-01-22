import React, { useState, useEffect } from 'react';
import styles from './IOSClock.module.scss';

const IOSClock: React.FC = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const hours = time.getHours().toString().padStart(2, '0');
  const minutes = time.getMinutes().toString().padStart(2, '0');

  return (
    <div className={styles.clockContainer}>
      <div className={styles.clockWrapper}>
        <span className={styles.digit} data-value={hours}>
          {hours}
        </span>
        <span className={styles.separator}>:</span>
        <span className={styles.digit} data-value={minutes}>
          {minutes}
        </span>
      </div>
    </div>
  );
};

export default IOSClock;
