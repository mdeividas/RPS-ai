import React from "react";
import * as tf from "@tensorflow/tfjs";
import Camera from "./Camera";

const HEIGHT =  224;
const WIDTH =  224;

let camera: Camera;
let model: tf.LayersModel;

export const RPS = () => {
    const [loading, setLoading] = React.useState(true);
    const videoRef = React.useRef<HTMLVideoElement>(null);

    const handleWebCamera = async () => {
        camera = new Camera(videoRef.current!, WIDTH, HEIGHT);

        await camera.setup();
    };

    const onClickPredict = () => {
        const image = camera.capture();

        const prediction = model.predict(image);

        (prediction as tf.Tensor<tf.Rank>)
            .softmax()
            .array()
            .then((array) => {
                // Since the output shape is [1, 3]
                const probabilities = (array as number[][])[0];

                const predictedClass = probabilities.indexOf(
                    Math.max(...probabilities),
                );

                // predictedClass is a index for next
                // the categories ["paper", "rock", "scissors"]
                alert(`Predicted class is: ${predictedClass}`);
            });
    }

    React.useEffect(() => {
        (async () => {
            try {
                // Load the model
                model = await tf.loadLayersModel("/models/rps/model.json");

                // Initia web camera
                await handleWebCamera();

                setLoading(false)
            } catch (e) {
                console.error(e)
            }
        })();
    }, []);

    return (
        <div>
            {loading && (
                <span>loading...</span>
            )}
            <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                width={window.innerWidth}
                height={window.innerHeight}
            />
            <button onClick={onClickPredict}>Predict</button>
        </div>
    );
};

