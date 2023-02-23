import classNames from "classnames";

function Light(props) {
  return (
    <div
      className={classNames("LightsOne-light", `LightsOne-${props.color}`, {
        "LightsOne-light-off": !props.lightOn,
      })}
      onClick={() => props.onClick(!props.lightOn)}
    ></div>
  );
}

export default Light;
