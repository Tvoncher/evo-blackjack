import { FC, useCallback, useEffect, useState } from "react";
import "@babylonjs/loaders/glTF/2.0/glTFLoader";
import { Vector3 } from "@babylonjs/core/Maths/math.vector";
import {
  ActionManager,
  Color3,
  ExecuteCodeAction,
  Mesh,
  Texture,
} from "@babylonjs/core";
import { mainStore } from "../../../stores/MainStore";

// creating chip
// TODO : create chipHandler to avoid hardcoding
const Chips: FC = () => {
  const chipTexture1: Texture = new Texture("textures/chip1.png");
  const chipTexture5: Texture = new Texture("textures/chip5.png");
  const chipTexture25: Texture = new Texture("textures/chip25.png");
  const chipTexture100: Texture = new Texture("textures/chip100.png");

  const bumpTexture: Texture = new Texture("textures/bumpTexture.png");

  const [highlighting, setHighlighting] = useState<Vector3 | null>();

  const handleActions = useCallback((chip: Mesh) => {
    chip.actionManager = new ActionManager(chip.getScene());
    chip.actionManager.registerAction(
      new ExecuteCodeAction(ActionManager.OnPickTrigger, function () {
        chip.scaling = new Vector3(1, 1, 1);
        mainStore.userStore.setselectedChip(+chip.name);
        setHighlighting(() => chip.position);
      })
    );

    //setting like onHover / onMouseOver
    chip.actionManager.registerAction(
      new ExecuteCodeAction(ActionManager.OnPointerOverTrigger, function () {
        chip.scaling = new Vector3(1.1, 1.1, 1.1);
      })
    );
    //on mouseOut
    chip.actionManager.registerAction(
      new ExecuteCodeAction(ActionManager.OnPointerOutTrigger, function () {
        chip.scaling = new Vector3(1, 1, 1);
      })
    );
  }, []);

  return (
    <>
      <glowLayer name="glow-layer" intensity={1} />

      <cylinder
        name="1"
        height={0.04}
        diameter={0.2}
        position={new Vector3(0.36, 3.1, 3.95)}
        onCreated={handleActions}
      >
        <standardMaterial
          name="material"
          diffuseTexture={chipTexture1}
          bumpTexture={bumpTexture}
        />
      </cylinder>
      <cylinder
        name="5"
        height={0.04}
        diameter={0.2}
        position={new Vector3(0.12, 3.1, 4)}
        onCreated={handleActions}
      >
        <standardMaterial
          name="material"
          diffuseTexture={chipTexture5}
          bumpTexture={bumpTexture}
        />
      </cylinder>
      <cylinder
        name="25"
        height={0.04}
        diameter={0.2}
        position={new Vector3(-0.12, 3.1, 4)}
        onCreated={handleActions}
      >
        <standardMaterial
          name="material"
          diffuseTexture={chipTexture25}
          bumpTexture={bumpTexture}
        />
      </cylinder>
      <cylinder
        name="100"
        height={0.04}
        diameter={0.2}
        position={new Vector3(-0.36, 3.1, 3.95)}
        onCreated={handleActions}
      >
        <standardMaterial
          name="material"
          diffuseTexture={chipTexture100}
          bumpTexture={bumpTexture}
        />
      </cylinder>

      {highlighting && (
        <cylinder
          name="100"
          height={0.02}
          diameter={0.2}
          position={highlighting}
        >
          <standardMaterial
            name="highlighting-mesh"
            emissiveColor={new Color3(0.7, 0.5, 0)}
          />
        </cylinder>
      )}
    </>
  );
};

export default Chips;
