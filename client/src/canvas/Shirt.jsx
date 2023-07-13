import React from "react";
import { easing } from "maath";
import { useGLTF, Decal, useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useSnapshot } from "valtio";

import state from "../store";
const Shirt = () => {
  // accesing the state
  const snap = useSnapshot(state);

  //   accessing the 3d model
  const { nodes, materials } = useGLTF("./shirt_baked.glb");

  // accessing the textures
  const logoTexture = useTexture(snap.logoDecal);
  const fullTexture = useTexture(snap.fullDecal);

  useFrame((state, delta) =>
    easing.dampC(materials.lambert1.color, snap.color, 0.25, delta)
  );

  const stateString = JSON.stringify(snap);

  return (
    <group key={stateString}>
      <mesh
        castShadow
        geometry={nodes.T_Shirt_male.geometry}
        material={materials.lambert1}
        material-roughness={1}
        dispose={null}
      >
        {snap.isFullTexture && (
          <Decal
            map={fullTexture}
            position={[0, 0, 0]}
            rotation={[0, 0, 0]}
            scale={1}
          />
        )}
        {snap.isLogoTexture && (
          <Decal
            map={logoTexture}
            position={[0, 0.04, 0.15]}
            rotation={[0, 0, 0]}
            scale={0.25}
            // map-anisotropy={16}
            depthTest={false}
            depthWrite={true}
          />
        )}
      </mesh>
    </group>
  );
};

export default Shirt;
