import { Texture } from "@babylonjs/core/Materials/Textures/texture";
import { Color3 } from "@babylonjs/core/Maths/math";
import { FC } from "react";
import { IPlayerSpotMaterialProps } from "../../../types/types";

const PlayerSpotMaterial: FC<IPlayerSpotMaterialProps> = ({
  playerSpotChipsLength,
}) => {
  const playerSpotTexture: Texture = new Texture(
    "textures/playerSpot/playerSpot.png"
  );
  playerSpotTexture.hasAlpha = true; // need it to use as alpha (makes mesh geometry invisible)

  return (
    <standardMaterial
      name="playerSpot-material"
      diffuseTexture={playerSpotTexture}
      alpha={0.4}
      useAlphaFromDiffuseTexture
      emissiveColor={
        playerSpotChipsLength > 0 ? new Color3(0.1, 0.1, 0.1) : Color3.White()
      }
    />
  );
};

export default PlayerSpotMaterial;
