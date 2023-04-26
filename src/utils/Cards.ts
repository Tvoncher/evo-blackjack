import { StandardMaterial } from "@babylonjs/core/Materials/standardMaterial";
import { AbstractMesh } from "@babylonjs/core/Meshes/abstractMesh";
import { CARD_SPRITE_HEIGHT, CARD_SPRITE_WIDTH } from "./consts";
import { Texture } from "@babylonjs/core/Materials/Textures/texture";
import { Suit } from "../types/types";

export const getCardMaterial = (
  card: AbstractMesh,
  suit: string,
  rank: number | string
) => {
  const cardMaterial: StandardMaterial = new StandardMaterial("card__material");
  const cardFrontTexture: Texture = new Texture(
    "textures/cardsSpritesheet.jpg"
  );

  cardFrontTexture.uScale = CARD_SPRITE_WIDTH;
  cardFrontTexture.vScale = CARD_SPRITE_HEIGHT;

  //we need it to access proper sprites row
  let suitRow: number = 0;
  switch (suit) {
    case Suit.spades:
      suitRow = 0;

      break;
    case Suit.hearts:
      suitRow = 1;

      break;
    case Suit.diamonds:
      suitRow = 2;

      break;
    case Suit.clubs:
      suitRow = 3;

      break;
    default:
      console.log(`something wrong with suit: ${suit}`);
  }

  // now accessing proper column
  let cardColPos: number = 0;
  switch (rank) {
    case "J":
      cardColPos = 11;

      break;
    case "Q":
      cardColPos = 12;

      break;
    case "K":
      cardColPos = 13;

      break;
    case "A":
      cardColPos = 1;

      break;
    default:
      cardColPos = +rank;
  }

  cardFrontTexture.uOffset = cardColPos * CARD_SPRITE_WIDTH - CARD_SPRITE_WIDTH;
  cardFrontTexture.vOffset = suitRow * CARD_SPRITE_HEIGHT;

  const cardBumpTexture: Texture = new Texture("textures/cardBump.png");

  cardMaterial.diffuseTexture = cardFrontTexture;
  cardMaterial.bumpTexture = cardBumpTexture;

  if (card) {
    card.getChildMeshes()[0].material = cardMaterial;
  }
};
