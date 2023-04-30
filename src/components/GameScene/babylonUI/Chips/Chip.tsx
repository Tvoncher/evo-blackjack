import { Mesh, Texture } from "@babylonjs/core";
import { FC, useCallback } from "react";
import { IChipProps } from "../../../../types/types";
import { observer } from "mobx-react-lite";
import { registerChipActions } from "../../../../utils/utils";
import { useMainStore } from "../../../../hooks/useMainStore";
import {
  CHIP_DIAMETER,
  CHIP_HEIGHT,
  CHIP_HIGHLIGHTING_COLOR,
} from "../../../../utils/consts";

// rendering chip and highlighting it
const Chip: FC<IChipProps> = observer(({ name, position }) => {
  const diffuseTexture: Texture = new Texture(`textures/chips/chip${name}.png`);
  const bumpTexture: Texture = new Texture("textures/chips/bumpTexture.png");

  const { selectedChip } = useMainStore().userStore;

  //register actions like onClick,onHover for mesh
  const handleActions = useCallback((chip: Mesh) => {
    registerChipActions(chip);
  }, []);

  return (
    <>
      {/*chip itself */}
      <cylinder
        name={name}
        height={CHIP_HEIGHT}
        diameter={CHIP_DIAMETER}
        position={position}
        onCreated={handleActions}
        disposeInstanceOnUnmount
      >
        <standardMaterial
          name={`chip${name}__material`}
          diffuseTexture={diffuseTexture}
          bumpTexture={bumpTexture}
        />
      </cylinder>

      {/*highlighting selected chip */}
      {selectedChip === +name && (
        <cylinder
          name="highlighting__mesh"
          height={CHIP_HEIGHT / 2}
          diameter={CHIP_DIAMETER}
          position={position}
          disposeInstanceOnUnmount
        >
          <standardMaterial
            name="highlighting__material"
            emissiveColor={CHIP_HIGHLIGHTING_COLOR}
          />
        </cylinder>
      )}
    </>
  );
});
export default Chip;
