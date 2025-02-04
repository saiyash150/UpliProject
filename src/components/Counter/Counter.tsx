import { useState, useEffect } from "react";
import "./Counter.css";
import { useSpring, animated, config } from "react-spring";

const Counter = () => {
  const [count, setCount] = useState(() => {
    return Number(localStorage.getItem("counterValue")) || 0;
  });

  useEffect(() => {
    localStorage.setItem("counterValue", count.toString());
  }, [count]);

  // Smooth background transition
  const bgAnimation = useSpring({
    backgroundColor: `rgba(0, 150, 255, ${Math.min(count * 0.1, 1)})`,
    config: config.molasses, // Slower, smooth transition
  });

  // Number scale animation
  const numberAnimation = useSpring({
    from: { scale: 1 },
    to: { scale: 1.2 },
    reset: true,
    reverse: true,
    config: {
      tension: 300,
      friction: 10,
      mass: 1,
    },
  });

  // Button hover animation
  const buttonAnimation = useSpring({
    from: { transform: "scale(1)" },
    to: async (next) => {
      await next({ transform: "scale(1.1)" });
      await next({ transform: "scale(1)" });
    },
    config: {
      tension: 200,
      friction: 12,
      mass: 1,
    },
  });

  // Liquid-like container animation
  const containerAnimation = useSpring({
    from: { borderRadius: "30px" },
    to: async (next) => {
      await next({ borderRadius: "40px" });
      await next({ borderRadius: "30px" });
    },
    config: {
      tension: 120,
      friction: 14,
      mass: 1,
    },
    loop: true,
  });

  return (
    <animated.div 
      className="counter-container" 
      style={{ ...bgAnimation, ...containerAnimation }}
    >
      <div className="counter">
        <animated.p style={numberAnimation} className="count-text">{count}</animated.p>
        <h1 >Counter</h1>
        <div className="count-container">
          <animated.button 
            style={buttonAnimation}
            className="toggle-button"
            onClick={() => setCount(count + 1)}
          >
            +
          </animated.button>
          <animated.button 
            style={buttonAnimation}
            onClick={() => setCount(0)}
          >
            Reset
          </animated.button>
          <animated.button 
            style={buttonAnimation}
            onClick={() => setCount(count - 1)}
          >
            -
          </animated.button>
        </div>
      </div>
    </animated.div>
  );
};

export default Counter;
