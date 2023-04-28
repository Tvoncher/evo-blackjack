import { MeshTask, TaskType } from "react-babylonjs";

//creating asset task for meshes. Use it whenever you want to download something big
export const assetsTask: MeshTask[] = [
  {
    taskType: TaskType.Mesh,
    rootUrl: `models/`,
    sceneFilename: "card.glb",
    name: "card",
  },
  {
    taskType: TaskType.Mesh,
    rootUrl: `models/`,
    sceneFilename: "room.glb",
    name: "room",
  },
  {
    taskType: TaskType.Mesh,
    rootUrl: `models/`,
    sceneFilename: "dealer.glb",
    name: "dealer",
  },
];
