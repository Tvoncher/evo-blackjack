import { FC } from "react";
import { CHIPS_ARRAY } from "../../../../utils/consts";
import Chip from "./Chip";

// creating chips from array
const ChipsHandler: FC = () => {
  return (
    <>
      <glowLayer name="glow-layer" intensity={1} />

      {CHIPS_ARRAY.map((chip) => (
        <Chip key={chip.name} {...chip} />
      ))}
    </>
  );
};

export default ChipsHandler;
