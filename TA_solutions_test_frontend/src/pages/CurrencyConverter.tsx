import React from "react";
import { useCurrencyConverter } from "../hooks/useCurrencyConverter";
import Dropdown from "../components/DropDown";
import History from "../components/History";

const Converter: React.FC = () => {
  const {
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
  } = useCurrencyConverter();

  return (
    <div className="container mt-5">
      <div className="card shadow">
        <div className="card-body">
       
          <div className="row mb-3">
            <div className="col-md-6">
              <Dropdown
                options={currencies}
                value={from}
                onChange={setFrom}
                exclude={to}
                
              />
            </div>
            <div className="col-md-6">
              <Dropdown
                options={currencies}
                value={to}
                onChange={setTo}
                exclude={from}
                
              />
            </div>
          </div>
          <div className="input-group mb-4">
            <input
              type="number"
              className="form-control"
              defaultValue={amountRef.current}
              onChange={(e) => (amountRef.current = Number(e.target.value))}
              placeholder="Enter Amount"
            />
            <button className="btn btn-primary" onClick={handleConvert}>
              Convert
            </button>
          </div>
          {loading ? (
            <div className="text-center">
              <div className="spinner-border text-primary" role="status"></div>
              <p>Loading...</p>
            </div>
          ) : (
            result && (
              <div className="alert alert-success text-center">
                {`${amountRef.current} ${from} = ${result} ${to}`}
              </div>
            )
          )}
          <hr />
          <h3 className="mt-4">Conversion History</h3>
          {history.length > 0 ? (
            <History history={history} />
          ) : (
            <p className="text-muted">No history available</p>
          )}
        </div>
      </div>
    </div>
  );
};
export default Converter;
