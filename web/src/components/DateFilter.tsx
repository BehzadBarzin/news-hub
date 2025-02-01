import { useEffect, useState } from "react";

function dateToString(date: Date) {
  return date.toISOString().split("T")[0];
}

interface Props {
  label: string;
  initial: Date | null;
  onSelect: (selected: Date | null) => void;
}

const DateFilter = ({ label, initial, onSelect }: Props) => {
  const [selected, setSelected] = useState<Date | null>(initial);

  useEffect(() => {
    onSelect(selected);
  }, [selected]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const dateString = event.target.value;

    if (dateString) {
      const newDate = new Date(dateString);
      setSelected(newDate);
      onSelect(newDate);
    } else {
      setSelected(null);
      onSelect(null);
    }
  };

  // Convert the selected date to the format YYYY-MM-DD for the input value
  // If selected is null, use an empty string to clear the input
  const formattedDate = selected ? dateToString(selected) : "";

  return (
    <fieldset className="w-full">
      <legend className="fieldset-legend">{label}</legend>
      <input
        type="date"
        value={formattedDate}
        className="input w-full"
        onChange={handleChange}
        max={dateToString(new Date())}
      />
    </fieldset>
  );
};

export default DateFilter;
