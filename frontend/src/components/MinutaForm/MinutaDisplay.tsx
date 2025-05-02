import { useRef } from "react";
import MinutaActions from "./MinutaActions";
import { formatMinutaText } from "./formatMinutaText";
import { MinutaDisplayFormat } from "../../types";

interface MinutaDisplayProps {
  minuta: MinutaDisplayFormat;
}

export default function MinutaDisplay({ minuta }: MinutaDisplayProps) {
  const minutaRef = useRef<HTMLDivElement>(null);

  return (
    <div className="mt-6 p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
      <MinutaActions minuta={minuta} minutaRef={minutaRef} />
      
      <div ref={minutaRef}>
        {formatMinutaText(minuta)}
      </div>
    </div>
  );
}