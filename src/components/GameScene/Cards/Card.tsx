import { Texture } from "@babylonjs/core/Materials/Textures/texture";
import { StandardMaterial } from "@babylonjs/core/Materials/standardMaterial";
import { Vector3 } from "@babylonjs/core/Maths/math.vector";
import { AbstractMesh } from "@babylonjs/core/Meshes/abstractMesh";
import { Mesh } from "@babylonjs/core/Meshes/mesh";
import { FC, useCallback, useEffect } from "react";
import { Suit } from "../../../types/types";
import { mainStore } from "../../../stores/MainStore";

//creating card model from base mesh

interface CardProps {
  card: Mesh;
  value: number;
  offset: number;
  rank: string | number;
  suit: Suit | string;
  position: Vector3;
  rotation: Vector3;
}

const Card: FC<CardProps> = ({
  card,
  value,
  offset,
  position,
  rank,
  rotation,
  suit,
}) => {
  //TODO:export logic
  const spritesheetWidth = 13;
  const spritesheetHeight = 4;

  const cardMaterial: StandardMaterial = new StandardMaterial("cardMaterial");
  const cardFrontTexture: Texture = new Texture(
    "textures/cardsSpritesheet.jpg"
  );

  //dividing 1 by number of sprites to achieve size of 1 sprite
  const spriteWidth = 1 / spritesheetWidth;
  const spriteHeight = 1 / spritesheetHeight;
  cardFrontTexture.uScale = spriteWidth;
  cardFrontTexture.vScale = spriteHeight;

  let suitNum: number = 0;

  switch (suit) {
    case Suit.spades:
      suitNum = 0;

      break;
    case Suit.hearts:
      suitNum = 1;

      break;
    case Suit.diamonds:
      suitNum = 2;

      break;
    case Suit.clubs:
      suitNum = 3;

      break;
    default:
      console.log("something wrong with card suit");
  }

  let cardRowPos = value;
  if (rank === "J") {
    cardRowPos = 11;
  }
  if (rank === "Q") {
    cardRowPos = 12;
  }
  if (rank === "K") {
    cardRowPos = 13;
  }

  cardFrontTexture.uOffset = cardRowPos * spriteWidth - spriteWidth;
  cardFrontTexture.vOffset = suitNum * spriteHeight;
  const cardBumpTexture: Texture = new Texture("textures/cardBump.png");

  cardMaterial.diffuseTexture = cardFrontTexture;
  cardMaterial.bumpTexture = cardBumpTexture;

  const assignTexture = useCallback((card: AbstractMesh) => {
    if (card) {
      card.getChildMeshes()[0].material = cardMaterial;
    }
  }, []);

  /* not sure why i can't create instancedMesh from mesh
  Believe that I'm just not really good at blender */
  return (
    <mesh
      name="card1"
      fromInstance={card.clone()}
      position={
        new Vector3(
          position._x - offset,
          position._y + offset / 10,
          position._z + offset
        )
      }
      rotation={rotation}
      scaling={new Vector3(0.25, 0.25, 0.25)}
      onCreated={assignTexture}
      disposeInstanceOnUnmount
    />
  );
};

export default Card;
