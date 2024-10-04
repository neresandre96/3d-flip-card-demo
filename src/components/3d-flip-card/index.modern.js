import React, { useState, useRef, useEffect, useCallback, Component } from 'react';

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
  var _useState = useState(false),
    isHovered = _useState[0],
    setIsHovered = _useState[1];
  var _useState2 = useState(0),
    rotation = _useState2[0],
    setRotation = _useState2[1];
  var _useState3 = useState(false),
    dragging = _useState3[0],
    setDragging = _useState3[1];
  var _useState4 = useState(false),
    isFlipped = _useState4[0],
    setIsFlipped = _useState4[1];
  var _useState5 = useState(false),
    resetRotation = _useState5[0],
    setResetRotation = _useState5[1];
  var dragStartData = useRef({
    dragStartRotation: 0,
    dragStartClientX: 0
  });
  useEffect(function () {
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
  useEffect(function () {
    if (ref.current && !resetRotation) {
      ref.current.style.transform = "rotateY(" + rotation + "deg)";
      if (!dragging && ref.current.style.transition === 'none' && rotation !== 0) {
        ref.current.style.transition = 'transform 0.6s ease';
      }
    }
  }, [rotation]);
  useEffect(function () {
    if (ref.current) {
      if (rotation !== 0 && resetRotation) {
        var closestMultipleOf360 = Math.round(rotation / 360) * 360;
        ref.current.style.transform = "rotateY(" + closestMultipleOf360 + "deg)";
        setTimeout(function () {
          if (ref.current) {
            ref.current.style.transition = 'none';
            ref.current.style.transform = 'rotateY(0deg)';
            setRotation(0);
            setResetRotation(false);
          }
        }, 600);
      }
    }
  });
  useEffect(function () {
    if (ref.current && !resetRotation) {
      setResetRotation(true);
    }
  }, [draggable]);
  var handleFlip = useCallback(function () {
    setRotation(function (prevRotation) {
      var newRotation = prevRotation;
      if (prevRotation === 0) {
        newRotation = 180;
        setIsFlipped(false);
      } else if (prevRotation === 180 && !isFlipped) {
        newRotation = 360;
        setIsFlipped(true);
      } else if (prevRotation === 360) {
        newRotation = 180;
        setIsFlipped(true);
      } else if (prevRotation === 180 && isFlipped) {
        newRotation = 0;
        setIsFlipped(false);
      }
      return newRotation;
    });
  }, [isFlipped]);
  var handlePointerDown = useCallback(function (event) {
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
  var handlePointerMove = useCallback(function (event) {
    var _ref$current2;
    if (dragging && (_ref$current2 = ref.current) !== null && _ref$current2 !== void 0 && _ref$current2.hasPointerCapture(event.pointerId)) {
      var _ref = event instanceof PointerEvent ? event : event.nativeEvent,
        clientX = _ref.clientX;
      var deltaX = clientX - dragStartData.current.dragStartClientX;
      var newRotation = dragStartData.current.dragStartRotation + deltaX * 0.5;
      setRotation(newRotation);
    }
  }, [dragging, ref]);
  var handlePointerUp = useCallback(function (event) {
    if (dragging) {
      var _ref$current3;
      (_ref$current3 = ref.current) === null || _ref$current3 === void 0 ? void 0 : _ref$current3.releasePointerCapture(event.pointerId);
      setDragging(false);
    }
  }, [dragging, ref]);
  var handleClick = useCallback(function () {
    if (!dragging) {
      handleFlip();
    }
  }, [dragging, handleFlip]);
  useEffect(function () {
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
    draggable = _ref$draggable === void 0 ? true : _ref$draggable,
    _ref$hoverToStop = _ref.hoverToStop,
    hoverToStop = _ref$hoverToStop === void 0 ? false : _ref$hoverToStop,
    _ref$clickToFlip = _ref.clickToFlip,
    clickToFlip = _ref$clickToFlip === void 0 ? false : _ref$clickToFlip,
    props = _objectWithoutPropertiesLoose(_ref, _excluded);
  var cardRef = useRef(null);
  var _useCardSpin = useCardSpin(cardRef, rotationSpeed, draggable, hoverToStop, clickToFlip),
    dragging = _useCardSpin.dragging,
    setIsHovered = _useCardSpin.setIsHovered,
    handlePointerDown = _useCardSpin.handlePointerDown,
    handlePointerMove = _useCardSpin.handlePointerMove,
    handlePointerUp = _useCardSpin.handlePointerUp;
  var style = {
    minWidth: width,
    maxWidth: width,
    minHeight: height,
    maxHeight: height,
    cursor: draggable ? dragging ? "grabbing" : "grab" : "pointer",
    userSelect: "none",
    willChange: "transform",
    transition: dragging ? "none" : "transform ease"
  };
  return React.createElement("div", Object.assign({
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
      return React.createElement("h1", null, "Something went wrong. Please try again later.");
    }
    return this.props.children;
  };
  return ErrorBoundary;
}(Component);

var Card3D = function Card3D(_ref) {
  var children = _ref.children,
    height = _ref.height,
    width = _ref.width,
    thickness = _ref.thickness,
    _ref$rotationSpeed = _ref.rotationSpeed,
    rotationSpeed = _ref$rotationSpeed === void 0 ? 0 : _ref$rotationSpeed,
    _ref$hoverToStop = _ref.hoverToStop,
    hoverToStop = _ref$hoverToStop === void 0 ? false : _ref$hoverToStop,
    _ref$mode = _ref.mode,
    mode = _ref$mode === void 0 ? "dragToFlip" : _ref$mode,
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
    left: "-" + Math.floor(halfThickness) + "px",
    backgroundColor: borderStyle.colorLeft
  };
  var rightSideStyle = {
    width: thickness + "px",
    right: "-" + Math.floor(halfThickness) + "px",
    backgroundColor: borderStyle.colorRight
  };
  return React.createElement("div", {
    className: "card-container",
    role: "button",
    tabIndex: 0
  }, React.createElement(ErrorBoundary, null, React.createElement(CardSpin, {
    className: 'card',
    height: height,
    width: width,
    rotationSpeed: effectiveRotationSpeed,
    draggable: mode === "dragToFlip",
    hoverToStop: hoverToStop,
    clickToFlip: mode === "clickToFlip"
  }, React.createElement("div", {
    className: "card-face card-front",
    style: frontStyle
  }, front), React.createElement("div", {
    className: "card-face card-back",
    style: backStyle
  }, back), React.createElement("div", {
    className: "card-side card-side-left",
    style: leftSideStyle
  }), React.createElement("div", {
    className: "card-side card-side-right",
    style: rightSideStyle
  }))));
};
Card3D.displayName = "Card3D";

export default Card3D;
//# sourceMappingURL=index.modern.js.map
