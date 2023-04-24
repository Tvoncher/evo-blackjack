import { Mesh, Texture } from "@babylonjs/core";
import { FC, useCallback } from "react";
import { IChipProps } from "../../../../types/types";
import {
  chipDiameter,
  chipHeight,
  chipHighlighting,
} from "../../../../utils/consts";
import { mainStore } from "../../../../stores/MainStore";
import { observer } from "mobx-react-lite";
import { registerChipActions } from "../../../../utils/utils";

// rendering chip and highlighting it
const Chip: FC<IChipProps> = observer(({ name, position }) => {
  const diffuseTexture: Texture = new Texture(`textures/chip${name}.png`);
  const bumpTexture: Texture = new Texture("textures/bumpTexture.png");

  const selectedChip = mainStore.userStore.user.selectedChip;

  //register actions like onClick,onHover for mesh
  const handleActions = useCallback((chip: Mesh) => {
    registerChipActions(chip);
  }, []);

  return (
    <>
      {/*chip itself */}
      <cylinder
        name={name}
        height={chipHeight}
        diameter={chipDiameter}
        position={position}
        onCreated={handleActions}
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
          height={chipHeight / 2}
          diameter={chipDiameter}
          position={position}
        >
          <standardMaterial
            name="highlighting__material"
            emissiveColor={chipHighlighting}
          />
        </cylinder>
      )}
    </>
  );
});
export default Chip;
