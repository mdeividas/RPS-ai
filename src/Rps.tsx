import React from "react";
import * as tf from "@tensorflow/tfjs";
import Camera from "./Camera";

const HEIGHT =  244;
const WIDTH =  244;

let camera: Camera;
let model: tf.LayersModel;

export const RPS = () => {
    const [loading, setLoading] = React.useState(true);
    const videoRef = React.useRef<HTMLVideoElement>(null);

    if (loading) {
        return (
            <div>
                <span>loading...</span>
            </div>
        )
    }

    return (
        <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            width={window.innerWidth}
            height={window.innerHeight}
        />
    );
};

