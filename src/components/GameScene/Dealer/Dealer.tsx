import { FC, useEffect } from "react";
import { Vector3 } from "@babylonjs/core/Maths/math.vector";
import { mainStore } from "../../../stores/MainStore";
import { NEON_COLOR } from "../../../utils/consts";
import { useDealerAnimations } from "../../../hooks/useDealerAnimations";
import { observer } from "mobx-react-lite";
import { useGreetingAnimation } from "../../../hooks/useGreetingAnimation";

//showing dealer animations and table (only because of my poor modelling skills)
const Dealer: FC = observer(() => {
  useGreetingAnimation();
  useDealerAnimations();

  // hiding loading screen when mounted (=== loaded)
  useEffect(() => {
    mainStore.roomStore.setIsLoaded();
  }, []);

  return (
    <>
      {/*just a glowing part of table */}
      <box
        name="glowing__mesh"
        width={1.7}
        height={0.005}
        depth={0.005}
        position={new Vector3(0, 1.05, 0.2)}
      >
        <standardMaterial name="glowing__material" emissiveColor={NEON_COLOR} />
      </box>
      <pointLight
        name="floor__light"
        position={new Vector3(0, 0.8, 1)}
        diffuse={NEON_COLOR}
      />
    </>
  );
});

export default Dealer;
