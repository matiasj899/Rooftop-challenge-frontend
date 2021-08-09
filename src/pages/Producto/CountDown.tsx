import React, { useEffect, useState } from "react";
const CountDown = (props: any) => {
  const [day, setDay] = useState("0");
  const [hour, setHour] = useState("0");
  const [minute, setMinutes] = useState("0");
  const [second, setSeconds] = useState("0");

  function secondsToHms(d: number) {
    d = Number(d);
    const days = Math.floor(d / 86400);
    const hours = Math.floor((d - days * 86400) / 3600);
    const minutes = Math.floor((d % 3600) / 60);
    const seconds = Math.floor((d % 3600) % 60);

    const daysDisplay = days > 0 ? days.toString() : "0";

    const hoursDisplay = hours > 0 ? hours.toString() : "0";
    const minutesDisplay = minutes > 0 ? minutes.toString() : "0";
    const secondsDisplay = seconds > 0 ? seconds.toString() : "0";

    return { daysDisplay, hoursDisplay, minutesDisplay, secondsDisplay };
  }
  useEffect(() => {
    const seconds = secondsToHms(props.second);

    setDay(seconds.daysDisplay);
    setHour(seconds.hoursDisplay);
    setMinutes(seconds.minutesDisplay);
    setSeconds(seconds.secondsDisplay);
  }, [props.second]);

  return (
    <h4 className="countdown">
      Esta oferta finaliza en <span>{day}D </span>
      <span>{hour}H </span>
      <span>{minute}M </span>
      <span>{second}S </span>{" "}
    </h4>
  );
};
export default CountDown;
