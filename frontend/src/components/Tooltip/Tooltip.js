import {useState} from 'react'
import "./Tooltip.css";

const Tooltip = (props) => {
  let timeout;
  const [active, setActive] = useState(false);

  const showTip = () => {
    timeout = setTimeout(() => {
      setActive(true);
    }, props.delay || 400);
  };

  const hideTip = () => {
    clearInterval(timeout);
    setActive(false);
  };

  return (
    <div
      className="Tooltip-Wrapper"
      // When to show the tooltip
      onMouseEnter={showTip}
      onMouseLeave={hideTip}
    >
      {/* Wrapping */}
      {props.children}
      {active && (
        <div className={`Tooltip-Tip ${props.direction || "top"}`}>
          {/* Content */}
          {props.content}
        </div>
      )}
    </div>
  );
}
export default Tooltip
//reference
//https://paladini.dev/posts/how-to-make-an-extremely-reusable-tooltip-component-with-react--and-nothing-else/
// content, which will be what's inside the tooltip
// Required, It can be anything JSX, text, images, other components, it's up to you
// direction, which controls where the tooltip will show
// Optional, accepts top, right, bottom, and left. Defaults to top
// delay, how much time, in milliseconds, it takes for the tooltip to show.
// Optional, defaults to 400ms