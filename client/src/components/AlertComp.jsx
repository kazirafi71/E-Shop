import React from "react";

const AlertComp = ({text,alert_info}) => {
  return (
    <div>
      <div className={`alert  ${alert_info}`} role="alert">
       {text}
      </div>
    </div>
  );
};

export default AlertComp;
