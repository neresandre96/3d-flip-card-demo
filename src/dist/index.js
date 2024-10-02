function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);

function _inheritsLoose(t, o) {
  t.prototype = Object.create(o.prototype), t.prototype.constructor = t, _setPrototypeOf(t, o);
}
function _objectWithoutPropertiesLoose(r, e) {
  if (null == r) return {};
  var t = {};
  for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
    if (e.includes(n)) continue;
    t[n] = r[n];
  }
  return t;
}
function _setPrototypeOf(t, e) {
  return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) {
    return t.__proto__ = e, t;
  }, _setPrototypeOf(t, e);
}

var useCardSpin = function useCardSpin(ref, rotationSpeed, draggable, hoverToStop, clickToFlip) {
  if (rotationSpeed === void 0) {
    rotationSpeed = 0;
  }
  if (draggable === void 0) {
    draggable = false;
  }
  if (hoverToStop === void 0) {
    hoverToStop = false;
  }
  if (clickToFlip === void 0) {
    clickToFlip = false;
  }
  var _useState = React.useState(false),
    isHovered = _useState[0],
    setIsHovered = _useState[1];
  var _useState2 = React.useState(0),
    rotation = _useState2[0],
    setRotation = _useState2[1];
  var _useState3 = React.useState(false),
    dragging = _useState3[0],
    setDragging = _useState3[1];
  var _useState4 = React.useState(false),
    isFlipped = _useState4[0],
    setIsFlipped = _useState4[1];
  var dragStartData = React.useRef({
    dragStartRotation: 0,
    dragStartClientX: 0
  });
  React.useEffect(function () {
    var animationFrameId;
    var _animateRotation = function animateRotation() {
      if ((!isHovered || !hoverToStop) && !dragging && rotationSpeed > 0) {
        setRotation(function (prevRotation) {
          return prevRotation + rotationSpeed;
        });
        animationFrameId = requestAnimationFrame(_animateRotation);
      }
    };
    _animateRotation();
    return function () {
      return cancelAnimationFrame(animationFrameId);
    };
  }, [isHovered, dragging, rotationSpeed, hoverToStop]);
  React.useEffect(function () {
    if (ref.current) {
      var flipRotation = isFlipped ? 180 : 0;
      ref.current.style.transform = "rotateY(" + (rotation + flipRotation) + "deg)";
    }
  }, [rotation, isFlipped, ref]);
  var handlePointerDown = React.useCallback(function (event) {
    var _ref$current;
    if (!draggable) return;
    event.preventDefault();
    var clientX = event.clientX;
    dragStartData.current = {
      dragStartRotation: rotation,
      dragStartClientX: clientX
    };
    setDragging(true);
    (_ref$current = ref.current) === null || _ref$current === void 0 ? void 0 : _ref$current.setPointerCapture(event.pointerId);
  }, [rotation, ref, draggable]);
  var handlePointerMove = React.useCallback(function (event) {
    var _ref$current2;
    if (dragging && (_ref$current2 = ref.current) !== null && _ref$current2 !== void 0 && _ref$current2.hasPointerCapture(event.pointerId)) {
      var _ref = event instanceof PointerEvent ? event : event.nativeEvent,
        clientX = _ref.clientX;
      var deltaX = clientX - dragStartData.current.dragStartClientX;
      var newRotation = dragStartData.current.dragStartRotation + deltaX * 0.5;
      setRotation(newRotation);
    }
  }, [dragging, ref]);
  var handlePointerUp = React.useCallback(function (event) {
    if (dragging) {
      var _ref$current3;
      (_ref$current3 = ref.current) === null || _ref$current3 === void 0 ? void 0 : _ref$current3.releasePointerCapture(event.pointerId);
      setDragging(false);
    }
  }, [dragging, ref]);
  var handleClick = React.useCallback(function () {
    if (!dragging) {
      setIsFlipped(function (prev) {
        return !prev;
      });
    }
  }, [dragging]);
  React.useEffect(function () {
    var cardElement = ref.current;
    if (!cardElement) return function () {};
    if (clickToFlip) {
      cardElement.addEventListener("click", handleClick);
    }
    if (draggable) {
      cardElement.addEventListener("pointermove", handlePointerMove);
      cardElement.addEventListener("pointerup", handlePointerUp);
    }
    return function () {
      if (clickToFlip) {
        cardElement.removeEventListener("click", handleClick);
      }
      if (draggable) {
        cardElement.removeEventListener("pointermove", handlePointerMove);
        cardElement.removeEventListener("pointerup", handlePointerUp);
      }
    };
  }, [draggable, handlePointerMove, handlePointerUp, handleClick, clickToFlip, ref]);
  return {
    dragging: dragging,
    setIsHovered: setIsHovered,
    handlePointerDown: handlePointerDown,
    handlePointerMove: handlePointerMove,
    handlePointerUp: handlePointerUp
  };
};

var _excluded = ["className", "children", "height", "width", "rotationSpeed", "draggable", "hoverToStop", "clickToFlip"];
var CardSpin = function CardSpin(_ref) {
  var className = _ref.className,
    children = _ref.children,
    height = _ref.height,
    width = _ref.width,
    _ref$rotationSpeed = _ref.rotationSpeed,
    rotationSpeed = _ref$rotationSpeed === void 0 ? 0 : _ref$rotationSpeed,
    _ref$draggable = _ref.draggable,
    draggable = _ref$draggable === void 0 ? false : _ref$draggable,
    _ref$hoverToStop = _ref.hoverToStop,
    hoverToStop = _ref$hoverToStop === void 0 ? false : _ref$hoverToStop,
    _ref$clickToFlip = _ref.clickToFlip,
    clickToFlip = _ref$clickToFlip === void 0 ? false : _ref$clickToFlip,
    props = _objectWithoutPropertiesLoose(_ref, _excluded);
  var cardRef = React.useRef(null);
  var _useCardSpin = useCardSpin(cardRef, rotationSpeed, draggable, hoverToStop, clickToFlip),
    dragging = _useCardSpin.dragging,
    setIsHovered = _useCardSpin.setIsHovered,
    handlePointerDown = _useCardSpin.handlePointerDown,
    handlePointerMove = _useCardSpin.handlePointerMove,
    handlePointerUp = _useCardSpin.handlePointerUp;
  var style = {
    width: width,
    height: height,
    cursor: draggable ? dragging ? "grabbing" : "grab" : "pointer",
    userSelect: "none",
    willChange: "transform",
    transition: dragging ? "none" : "transform ease"
  };
  return React__default.createElement("div", Object.assign({
    ref: cardRef,
    className: className
  }, props, {
    onMouseEnter: function onMouseEnter() {
      return setIsHovered(true);
    },
    onMouseLeave: function onMouseLeave() {
      return setIsHovered(false);
    },
    onPointerDown: handlePointerDown,
    onPointerMove: handlePointerMove,
    onPointerUp: handlePointerUp,
    onPointerCancel: handlePointerUp,
    style: style
  }), children);
};
CardSpin.displayName = "CardSpin";

var ErrorBoundary = /*#__PURE__*/function (_Component) {
  function ErrorBoundary(props) {
    var _this;
    _this = _Component.call(this, props) || this;
    _this.state = {
      hasError: false
    };
    return _this;
  }
  _inheritsLoose(ErrorBoundary, _Component);
  ErrorBoundary.getDerivedStateFromError = function getDerivedStateFromError() {
    return {
      hasError: true
    };
  };
  var _proto = ErrorBoundary.prototype;
  _proto.componentDidCatch = function componentDidCatch(error, errorInfo) {
    console.error("Error caught in Error Boundary:", error, errorInfo);
  };
  _proto.render = function render() {
    if (this.state.hasError) {
      return React__default.createElement("h1", null, "Something went wrong. Please try again later.");
    }
    return this.props.children;
  };
  return ErrorBoundary;
}(React.Component);

var Card3D = function Card3D(_ref) {
  var children = _ref.children,
    height = _ref.height,
    width = _ref.width,
    thickness = _ref.thickness,
    _ref$rotationSpeed = _ref.rotationSpeed,
    rotationSpeed = _ref$rotationSpeed === void 0 ? 0 : _ref$rotationSpeed,
    _ref$hoverToStop = _ref.hoverToStop,
    hoverToStop = _ref$hoverToStop === void 0 ? false : _ref$hoverToStop,
    mode = _ref.mode,
    leftColor = _ref.leftColor,
    rightColor = _ref.rightColor,
    _ref$borderColor = _ref.borderColor,
    borderColor = _ref$borderColor === void 0 ? "white" : _ref$borderColor;
  if (children.length !== 2) {
    console.warn("Card component expects exactly two children.");
    return null;
  }
  var front = children[0],
    back = children[1];
  var borderStyle = {
    colorLeft: leftColor || borderColor,
    colorRight: rightColor || borderColor
  };
  var halfThickness = thickness / 2;
  var effectiveRotationSpeed = mode === "clickToFlip" ? 0 : rotationSpeed;
  var frontStyle = {
    transform: "rotateY(0deg) translateZ(" + halfThickness + "px)",
    background: "red"
  };
  var backStyle = {
    transform: "rotateY(180deg) translateZ(" + halfThickness + "px)",
    background: "blue"
  };
  var leftSideStyle = {
    width: thickness + "px",
    left: "-" + halfThickness + "px",
    backgroundColor: borderStyle.colorLeft
  };
  var rightSideStyle = {
    width: thickness + "px",
    right: "-" + halfThickness + "px",
    backgroundColor: borderStyle.colorRight
  };
  return React__default.createElement("div", {
    className: "card-container",
    role: "button",
    tabIndex: 0
  }, React__default.createElement(ErrorBoundary, null, React__default.createElement(CardSpin, {
    className: 'card',
    height: height,
    width: width,
    rotationSpeed: effectiveRotationSpeed,
    draggable: mode === "dragToFlip",
    hoverToStop: hoverToStop,
    clickToFlip: mode === "clickToFlip"
  }, React__default.createElement("div", {
    className: "card-face card-front",
    style: frontStyle
  }, front), React__default.createElement("div", {
    className: "card-face card-back",
    style: backStyle
  }, back), React__default.createElement("div", {
    className: "card-side card-side-left",
    style: leftSideStyle
  }), React__default.createElement("div", {
    className: "card-side card-side-right",
    style: rightSideStyle
  }))));
};
Card3D.displayName = "Card3D";

module.exports = Card3D;
//# sourceMappingURL=index.js.map
