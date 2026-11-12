import { useState, useEffect } from "react";

function useFetch(url) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);

    fetch(url, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error("Không tải được dữ liệu (" + res.status + ")");
        return res.json();
      })
      .then((json) => {
        setData(json);
        setError(null);
        setLoading(false);
      })
      .catch((err) => {
        if (err.name === "AbortError") return;
        setError(err.message);
        setLoading(false);
      });

    return () => controller.abort();
  }, [url]);

  const addItem = async (item) => {
    setLoading(true);
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item),
      });
      if (!res.ok) throw new Error("Không thêm được khoản chi (" + res.status + ")");
      const created = await res.json();
      setData((cu) => [...cu, created]);
      setError(null);
      setLoading(false);
      return true;
    } catch (err) {
      setError(err.message);
      setLoading(false);
      return false;
    }
  };

  const removeItem = async (id) => {
    setLoading(true);
    try {
      const res = await fetch(url + "/" + id, { method: "DELETE" });
      if (!res.ok) throw new Error("Không xóa được khoản chi (" + res.status + ")");
      setData((cu) => cu.filter((x) => x.id !== id));
      setError(null);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return { data, loading, error, addItem, removeItem };
}

export default useFetch;
