import { FaInfoCircle } from "react-icons/fa";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

interface Props {
  predictions: { label: string; score: number }[];
}

export default function Information({ predictions }: Props) {
  const topPredictions = predictions.slice(0, 5); // Top 5 only
  const data = {
    labels: topPredictions.map((p) => p.label),
    datasets: [
      {
        data: topPredictions.map((p) => (p.score * 100).toFixed(2)),
        backgroundColor: [
          "#ff6384",
          "#36a2eb",
          "#cc65fe",
          "#ffce56",
          "#2ecc71",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="text-center p-4 w-100" style={{ maxWidth: "500px" }}>
      <div className="fs-5 mb-2">
        <FaInfoCircle className="me-2" />
        Detected Objects
      </div>
      <Doughnut data={data} />
    </div>
  );
}
