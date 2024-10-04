import "./control-panel.css";

const ControlPanel = ({ setHeight, height, setWidth, width, setThickness, thickness, setRotationSpeed, rotationSpeed, setHoverToStop, hoverToStop, mode, setMode }) => {
  return (
      <div className="control-panel">
        <div>
          <h1>Control Panel</h1>
          <div className="control-box">
            <div
              className="control-item"
              title="Adjust the height of the card."
            >
              <label>Height: </label>
              <input
                type="range"
                min="100"
                max="450"
                value={parseInt(height)}
                onChange={(e) => setHeight(`${e.target.value}px`)}
              />
              <span>{height}</span>
            </div>

            <div className="control-item" title="Adjust the width of the card.">
              <label>Width: </label>
              <input
                type="range"
                min="100"
                max="600"
                value={parseInt(width)}
                onChange={(e) => setWidth(`${e.target.value}px`)}
              />
              <span>{width}</span>
            </div>

            <div
              className="control-item"
              title="Adjust the thickness of the card."
            >
              <label>Thickness: </label>
              <input
                type="range"
                min="1"
                max="20"
                value={thickness}
                onChange={(e) => setThickness(parseInt(e.target.value))}
              />
              <span>{thickness}px</span>
            </div>

            <div
              className="control-item"
              title="Toggle between drag and click interaction modes."
            >
              <label>Interaction Mode: </label>
              <div className="switch">
                <input
                  type="checkbox"
                  checked={mode === "dragToFlip"}
                  onChange={(e) =>
                    setMode(e.target.checked ? "dragToFlip" : "clickToFlip")
                  }
                  id="mode-switch"
                />
                <label htmlFor="mode-switch" className="switch-label">
                  {mode === "dragToFlip" ? "drag" : "click"}
                </label>
              </div>
            </div>

            {mode === "dragToFlip" && (
              <>
                <div
                  className="control-item"
                  title="Set the rotation speed in degrees per second."
                >
                  <label>Rotation Speed: </label>
                  <input
                    type="range"
                    min="0"
                    max="2"
                    step="0.1"
                    value={rotationSpeed}
                    onChange={(e) =>
                      setRotationSpeed(parseFloat(e.target.value))
                    }
                  />
                  <span>{rotationSpeed}°/s</span>
                </div>

                <div
                  className="control-item"
                  title="Enable stops rotation when hovered."
                >
                  <label>Hover to Stop: </label>
                  <input
                    type="checkbox"
                    className="checkbox-input"
                    checked={hoverToStop}
                    onChange={() => setHoverToStop(!hoverToStop)}
                  />
                </div>
              </>
            )}
          </div>
        </div>

        <div>
          <div className="control-box">
            <h5>Mode operation:</h5>
            {mode === "clickToFlip" ? (
              <p className="mode-explanation click-explanation">
                The card flips when <strong>clicked</strong>. This mode{" "}
                <strong style={{ color: "red" }}>can't</strong> be animated.
              </p>
            ) : (
              <p className="mode-explanation drag-explanation">
                <strong>Mouse drag</strong> controls rotation. This mode{" "}
                <strong style={{ color: "green" }}>can</strong> be animated.
              </p>
            )}
          </div>
        </div>
      </div>
  );
};

export default ControlPanel;
