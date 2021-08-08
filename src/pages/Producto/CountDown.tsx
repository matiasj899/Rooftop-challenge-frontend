import React, { useEffect, useState } from "react";
const CountDown = (props: any) => {
  const [hour, setHour] = useState("0");
  const [minute, setMinutes] = useState("0");
  const [second, setSeconds] = useState("0");
  const [fullTime, setFullTime] = useState("0");
  function secondsToHms(d: number) {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor((d % 3600) / 60);
    var s = Math.floor((d % 3600) % 60);

    var hDisplay = h > 0 ? h + (h == 1 ? "" : "") : "0";
    var mDisplay = m > 0 ? m + (m == 1 ? "" : "") : "0";
    var sDisplay = s > 0 ? s + (s == 1 ? "" : "") : "0";

    return { hDisplay, mDisplay, sDisplay };
  }
  useEffect(() => {
    const seconds = secondsToHms(props.second);
    setHour(seconds.hDisplay);
    setMinutes(seconds.mDisplay);
    setSeconds(seconds.sDisplay);
  }, [props.second]);

  return (
    <p className='countdown'>
      Esta oferta finaliza en <span>{hour}</span>:<span>{minute}</span>:
      <span>{second}</span>{" "}
    </p>
  );
};
export default CountDown;
