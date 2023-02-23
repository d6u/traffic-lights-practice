import React, { useState, useEffect } from "react";
import Light from "./Light";

function LightsTwo(props) {
  const [lightOnIndex, setLightOnIndex] = useState(-1);
  const [isAutoOn, setIsAutoOn] = useState(false);
  const [, setIntervalID] = useState(null);

  useEffect(() => {
    if (isAutoOn) {
      setIntervalID(
        setInterval(
          () => setLightOnIndex((lightOnIndex) => (lightOnIndex + 1) % 3),
          1000
        )
      );
    }

    // The cleanup function runs not only during unmount,
    // but before every re-render with changed dependencies.
    // So we don't need to explicitly clean up the interval when isAutoOn
    // becomes off.
    return function () {
      setIntervalID((intervalID) => {
        clearInterval(intervalID);
        return null;
      });
    };
  }, [isAutoOn]);

  return (
    <div className="LightsOne">
      <div className="LightsOne-lightbox">
        {[
          ["green", 0],
          ["yellow", 1],
          ["red", 2],
        ].map(([color, index]) => (
          <Light
            key={index}
            color={color}
            lightOn={lightOnIndex === index}
            onClick={(turnLightOn) => {
              setLightOnIndex(turnLightOn ? index : -1);
              setIsAutoOn(false);
            }}
          />
        ))}
      </div>
      <button
        className="LightsOne-autoButton"
        onClick={() => setIsAutoOn(!isAutoOn)}
      >
        Auto
      </button>
    </div>
  );
}

export default LightsTwo;
