import { Vector3 } from "@babylonjs/core/Maths/math.vector";
import { AbstractMesh } from "@babylonjs/core/Meshes/abstractMesh";
import { FC, useCallback } from "react";
import { ICardProps } from "../../../types/types";
import { cardScaling } from "../../../utils/consts";
import { getCardMaterial } from "../../../utils/Cards";

//creating card model from base mesh
const Card: FC<ICardProps> = ({
  card,
  offset,
  position,
  rank,
  rotation,
  suit,
}) => {
  const assignTexture = useCallback((card: AbstractMesh) => {
    getCardMaterial(card, suit, rank);
  }, []);

  /* can't create instanced mesh from my glb*/
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
      scaling={cardScaling}
      onCreated={assignTexture}
      disposeInstanceOnUnmount
    />
  );
};

export default Card;
