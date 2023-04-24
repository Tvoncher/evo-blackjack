import { FC } from "react";
import { chipDiameter, chipHeight } from "../../../utils/consts";
import { Texture } from "@babylonjs/core";
import { IPlayerSpotChipProps, RoomState } from "../../../types/types";
import { mainStore } from "../../../stores/MainStore";

const PlayerSpotChip: FC<IPlayerSpotChipProps> = ({ chip, position }) => {
  const roomState = mainStore.roomStore.roomState;
  const bumpTexture: Texture = new Texture("textures/bumpTexture.png");

  return (
    <cylinder
      name="playerSpotChip"
      height={chipHeight}
      diameter={chipDiameter}
      position={position}
      isPickable={false}
      isVisible={roomState === RoomState.betting}
      disposeInstanceOnUnmount
    >
      <standardMaterial
        name="chip-material"
        diffuseTexture={new Texture(`textures/chip${chip}.png`)}
        bumpTexture={bumpTexture}
      />
    </cylinder>
  );
};

export default PlayerSpotChip;
