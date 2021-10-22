import React from "react";

const styles = {
  info: "text-black bg-info",
  danger: "text-white bg-danger",
  success: "text-black bg-success",
};

export default function Alerts({ alert }) {
  return (
    <div
      className="toast show position-fixed bottom-0 start-50 translate-middle-x mx-auto mb-5"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
      style={{ zIndex: "2000" }}
    >
      <div className={`d-flex fw-bolder ${styles[alert.type]}`}>
        <div className="toast-body mx-auto py-1">{alert.message}</div>
      </div>
    </div>
  );
}
