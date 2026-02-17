import MinutaActions from "./MinutaActions";
import { formatMinutaText } from "./formatMinutaText";

interface MinutaDisplayProps {
  minuta: string;
}

export default function MinutaDisplay({ minuta }: MinutaDisplayProps) {
  return (
    <div className="mt-6 p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
      <MinutaActions minuta={minuta} />
      
      <div>
        {formatMinutaText(minuta)}
      </div>
    </div>
  );
}