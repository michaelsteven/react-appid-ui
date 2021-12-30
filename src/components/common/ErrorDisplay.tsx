import React, { useState, useEffect } from "react";

type ErrorDisplayProps = {
  error?: unknown;
};

export default function ErrorDisplay({ error }: ErrorDisplayProps) {
  const [show, setShow] = useState(error != null);

  useEffect(() => {
    if (error) {
      setShow(true);
      setTimeout(() => setShow(false), 4000);
    } else {
      setShow(false);
    }
  }, [error]);

  return <div className={show ? "errorShow" : "errorHide"}>{error ? String(error) : ""}</div>;
}
