import { useState, useEffect } from "react";

function useClock(enabled = true) {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    if (!enabled) return;
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, [enabled]);

  return now;
}

export default useClock;
