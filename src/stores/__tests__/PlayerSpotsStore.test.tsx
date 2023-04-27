import { PlayerSpotsStore } from "../PlayerSpotsStore";

describe("create playerSpotsStore", () => {
  it("should initiate store", () => {
    const store = new PlayerSpotsStore();

    expect(store.playerSpots).toHaveLength(5);
  });
});
