import "./style.scss";
import React from "react";

export const Item = React.forwardRef(
  ({ children, label, focusable = true, ...props }, ref) => (
    <div
      ref={ref}
      className="item"
      tabIndex={focusable ? 0 : -1}
      onKeyPress={(evt) => {
        console.info(evt);
        if (evt.which === 13) {
          evt.target.click();
          evt.preventDefault();
          evt.stopPropagation();
        }
      }}
      {...props}
    >
      {label ? <div className="header">{label}</div> : null}
      {children}
    </div>
  )
);

export function ExpandableInput({
  label,
  value,
  type = "text",
  onChange,
  ...props
}) {
  const [expanded, setExpanded] = React.useState(null);
  const inputRef = React.useRef(null);
  const itemRef = React.useRef(null);
  React.useEffect(() => {
    if (expanded && inputRef.current) {
      inputRef.current.focus();
    } else if (expanded === false && itemRef.current) {
      itemRef.current.focus();
    }
  }, [expanded]);

  return (
    <Item
      onClick={() => {
        setExpanded(true);
      }}
      label={label}
      ref={itemRef}
    >
      {expanded ? (
        <input
          type={type === "password" ? "text" : type}
          value={value}
          ref={inputRef}
          onChange={onChange}
          onKeyDown={(evt) => {
            if (evt.which === 13 || evt.which == 461) {
              setExpanded(false);
              evt.preventDefault();
              evt.stopPropagation();
            }
          }}
          onBlur={() => setExpanded(false)}
          {...props}
        />
      ) : (
        <div className="inner">
          {type === "password" ? value.replace(/./g, "•") : value}
        </div>
      )}
    </Item>
  );
}

export const SwitchItem = React.forwardRef(
  ({ label, checked, ...props }, ref) => (
    <Item ref={ref} {...props}>
      <div className="header">
        <div className={["switch", checked ? "active" : null].join(" ")}>
          <div className="inner"></div>
        </div>
        {label}
      </div>
    </Item>
  )
);
