import React from "react";

interface HistoryProps {
  history: any[];
}

const History: React.FC<HistoryProps> = ({ history }) => {
    return (
        <div
          className="overflow-auto"
          style={{ maxHeight: "300px", border: "1px solid #ddd", borderRadius: "5px" }}
        >
          <ul className="list-group">
            {history.map((record, index) => (
              <li key={index} className="list-group-item">
                <strong>{`${record.amount} ${record.from}`}</strong> to{" "}
                <strong>{`${record.to}`}</strong> = <strong>{record.result}</strong> <br />
                <small className="text-muted">
                  {new Date(record.date).toLocaleString()}
                </small>
              </li>
            ))}
          </ul>
        </div>
      );
    };

export default React.memo(History);
