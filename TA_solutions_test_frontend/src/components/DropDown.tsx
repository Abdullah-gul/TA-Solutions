import React from "react";

interface DropDownProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  exclude?: string;
}

const DropDown: React.FC<DropDownProps> = ({ options, value, onChange, exclude }) => {
  const filteredOptions = options.filter((option) => option !== exclude);

  return (
    <select className="form-control" value={value} onChange={(e) => onChange(e.target.value)}>
      {filteredOptions.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default React.memo(DropDown);
