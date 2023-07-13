import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useSnapshot } from "valtio";
import { easing } from "maath";
import { AccumulativeShadows, RandomizedLight } from "@react-three/drei";
import state from "../store";
const BackDrop = () => {
  const shadow = useRef();

  return (
    <AccumulativeShadows
      ref={shadow}
      rotation={[Math.PI / 2, 0, 0]}
      scae={10}
      alphaTest={0.85}
      temporal
      frames={60}
      position={[0, 0, -0.14]}
    >
      <RandomizedLight
        amount={4}
        radius={9}
        intensity={0.55}
        ambient={0.25}
        position={[5, 5, -10]}
      />
      <RandomizedLight
        amount={4}
        radius={5}
        intensity={0.25}
        ambient={0.55}
        position={[-5, 5, -9]}
      />
    </AccumulativeShadows>
  );
};

export default BackDrop;
