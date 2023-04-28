import { FC } from "react";
import { CHIP_DIAMETER, CHIP_HEIGHT } from "../../../utils/consts";
import { Texture } from "@babylonjs/core";
import { IPlayerSpotChipProps, RoomState } from "../../../types/types";

//creates chip that u can put on playerSpot
const PlayerSpotChip: FC<IPlayerSpotChipProps> = ({
  chip,
  position,
  roomState,
}) => {
  const bumpTexture: Texture = new Texture("textures/chips/bumpTexture.png");

  return (
    <cylinder
      name="playerSpotChip"
      height={CHIP_HEIGHT}
      diameter={CHIP_DIAMETER}
      position={position}
      isPickable={false}
      isVisible={roomState === RoomState.betting}
      disposeInstanceOnUnmount
    >
      <standardMaterial
        name="chip-material"
        diffuseTexture={new Texture(`textures/chips/chip${chip}.png`)}
        bumpTexture={bumpTexture}
      />
    </cylinder>
  );
};

export default PlayerSpotChip;
