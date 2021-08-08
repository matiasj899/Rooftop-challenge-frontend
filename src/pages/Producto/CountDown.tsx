import React, { useEffect, useState } from "react";
const CountDown = (props: any) => {
  const [hour, setHour] = useState("0");
  const [minute, setMinutes] = useState("0");
  const [second, setSeconds] = useState("0");
  const [fullTime, setFullTime] = useState("0");
  function secondsToHms(d: number) {
    d = Number(d);
    const hours = Math.floor(d / 3600);
    const minutes = Math.floor((d % 3600) / 60);
    const seconds = Math.floor((d % 3600) % 60);

    const hoursDisplay = hours > 0 ? hours + (hours == 1 ? "" : "") : "0";
    const minutesDisplay = minutes > 0 ? minutes + (minutes == 1 ? "" : "") : "0";
    const secondsDisplay = seconds > 0 ? seconds + (seconds == 1 ? "" : "") : "0";

    return { hoursDisplay, minutesDisplay, secondsDisplay };
  }
  useEffect(() => {
    const seconds = secondsToHms(props.second);
    setHour(seconds.hoursDisplay);
    setMinutes(seconds.minutesDisplay);
    setSeconds(seconds.secondsDisplay);
  }, [props.second]);

  return (
    <h4 className='countdown'>
      Esta oferta finaliza en <span>{hour}</span>:<span>{minute}</span>:
      <span>{second}</span>{" "}
    </h4>
  );
};
export default CountDown;
