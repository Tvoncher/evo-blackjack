import { Vector3 } from "@babylonjs/core/Maths/math.vector";
import { AbstractMesh } from "@babylonjs/core/Meshes/abstractMesh";
import { FC, useCallback } from "react";
import { ICardProps } from "../../../types/types";
import { CARD_SCALING } from "../../../utils/consts";
import { getCardMaterial } from "../../../utils/cards";

//creating card model from base mesh
const Card: FC<ICardProps> = ({
  card,
  offset,
  position,
  rank,
  rotation,
  suit,
}) => {
  const assignTexture = useCallback(
    (card: AbstractMesh) => {
      getCardMaterial(card, suit, rank);
    },
    [rank, suit]
  );

  // can't create instanced mesh from my glb
  return (
    <mesh
      name="card"
      fromInstance={card.clone()}
      position={
        new Vector3(
          position._x - offset,
          position._y + offset / 6,
          position._z + offset
        )
      }
      rotation={rotation}
      scaling={CARD_SCALING}
      onCreated={assignTexture}
      isPickable={false}
      disposeInstanceOnUnmount
    />
  );
};

export default Card;
