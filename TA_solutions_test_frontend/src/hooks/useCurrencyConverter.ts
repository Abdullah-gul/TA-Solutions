import { useState, useEffect, useRef } from "react";
import axios from "axios";

export const useCurrencyConverter = () => {
  const [currencies, setCurrencies] = useState<string[]>([]);
  const [from, setFrom] = useState<string>("USD");
  const [to, setTo] = useState<string>("EUR");
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<any[]>(() => {
    return JSON.parse(localStorage.getItem("history") || "[]");
  });

  const amountRef = useRef<number>(1);
const list : any  = process.env.REACT_APP_API_KEY_list
const convert : any  = process.env.REACT_APP_API_KEY_convert
  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const res = await axios.get(list);
        setCurrencies(Object.keys(res.data.data));
      } catch (error) {
        console.error("Error fetching currencies:", error);
      }
    };
    fetchCurrencies();
  }, []);

  const handleConvert = async () => {
    setLoading(true);
    try {
      const res = await axios.get(convert, {
        params: { from, to, amount: amountRef.current },
      });
      setResult(res.data.convertedAmount);
      const record = {
        from,
        to,
        amount: amountRef.current,
        result: res.data.convertedAmount,
        date: new Date(),
      };
      const updatedHistory = [record, ...history];
      setHistory(updatedHistory);
      localStorage.setItem("history", JSON.stringify(updatedHistory));
    } catch (error) {
      console.error("Conversion failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return {
    currencies,
    from,
    setFrom,
    to,
    setTo,
    result,
    loading,
    history,
    amountRef,
    handleConvert,
  };
};
