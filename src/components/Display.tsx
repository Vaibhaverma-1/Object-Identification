import { useContext, useEffect, useRef, useState } from "react";
import { WebcamContext } from "../context/WebcamContext";
import { FaVideoSlash } from "react-icons/fa";
import * as cocoSsd from "@tensorflow-models/coco-ssd";
import "@tensorflow/tfjs";

interface Props {
  darkMode: boolean;
  setPredictions: React.Dispatch<
    React.SetStateAction<{ label: string; score: number }[]>
  >;
}

export default function Display({ darkMode, setPredictions }: Props) {
  const { stream, error } = useContext(WebcamContext);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [model, setModel] = useState<cocoSsd.ObjectDetection | null>(null);

  // Load the COCO-SSD model once
  useEffect(() => {
    cocoSsd.load().then((loadedModel) => {
      console.log("✅ COCO-SSD model loaded");
      setModel(loadedModel);
    });
  }, []);

  // Attach webcam stream to the video element
  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
      videoRef.current.play();
      console.log("🎥 Webcam stream attached");
    }
  }, [stream]);

  // Object detection loop
  useEffect(() => {
    let animationId: number;

    const detectObjects = async () => {
      if (
        model &&
        videoRef.current &&
        videoRef.current.readyState === 4 &&
        canvasRef.current
      ) {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        const predictions = await model.detect(video);

        // Update parent state with predictions for chart display
        setPredictions(
          predictions.map((pred) => ({
            label: pred.class,
            score: pred.score,
          }))
        );

        if (ctx) {
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          ctx.clearRect(0, 0, canvas.width, canvas.height);

          predictions.forEach((prediction) => {
            const [x, y, width, height] = prediction.bbox;
            const label = `${prediction.class} (${(
              prediction.score * 100
            ).toFixed(1)}%)`;

            ctx.strokeStyle = "lime";
            ctx.lineWidth = 3;
            ctx.strokeRect(x, y, width, height);

            ctx.font = "16px Arial";
            ctx.fillStyle = "lime";
            ctx.fillText(label, x, y > 20 ? y - 8 : y + 15);
          });
        }
      }

      animationId = requestAnimationFrame(detectObjects);
    };

    if (model && stream) {
      animationId = requestAnimationFrame(detectObjects);
    }

    return () => cancelAnimationFrame(animationId);
  }, [model, stream]);

  return (
    <div className="text-center p-4 d-flex flex-column align-items-center position-relative">
      <div className="fs-5 fw-semibold mb-3">Webcam View</div>
      {stream && <span className="badge bg-success mb-2">Webcam On</span>}

      <div style={{ position: "relative", width: "90%", maxWidth: "1080px" }}>
        {stream ? (
          <>
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              style={{
                width: "100%",
                borderRadius: "12px",
              }}
            />
            <canvas
              ref={canvasRef}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                pointerEvents: "none",
              }}
            />
          </>
        ) : error ? (
          <>
            <FaVideoSlash
              size="60%"
              className="mb-3"
              color={darkMode ? "#ffffff" : "#000000"}
            />
            <p className="text-danger fw-medium">{error}</p>
          </>
        ) : (
          <>
            <FaVideoSlash
              size="60%"
              className="mb-3"
              color={darkMode ? "#ffffff" : "#000000"}
            />
            <p>Waiting for webcam...</p>
          </>
        )}
      </div>
    </div>
  );
}
