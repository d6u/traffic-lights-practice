import React from "react";
import Light from "./Light";

class LightsOne extends React.Component {
  state = {
    lightOnIndex: -1,
    isAutoOn: false,
  };

  intervalID = null;

  render() {
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
              lightOn={this.state.lightOnIndex === index}
              onClick={(turnLightOn) =>
                this.setState({
                  lightOnIndex: turnLightOn ? index : -1,
                  isAutoOn: false,
                })
              }
            />
          ))}
        </div>
        <button
          className="LightsOne-autoButton"
          onClick={() =>
            this.setState((state) => ({ isAutoOn: !state.isAutoOn }))
          }
        >
          Auto
        </button>
      </div>
    );
  }

  componentDidUpdate(prevProps, prevState) {
    // We cannot use "static getDerivedStateFromProps(props, state)" to
    // implement this logic because we need to call this.setState in
    // setInterval, but getDerivedStateFromProps is static.
    if (this.state.isAutoOn !== prevState.isAutoOn) {
      if (this.state.isAutoOn) {
        this.intervalID = setInterval(
          () =>
            this.setState((state) => ({
              lightOnIndex: (state.lightOnIndex + 1) % 3,
            })),
          1000
        );
      } else {
        clearInterval(this.intervalID);
        this.intervalID = null;
      }
    }
  }
}

export default LightsOne;
