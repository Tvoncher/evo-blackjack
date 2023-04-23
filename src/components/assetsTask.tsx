import { MeshTask, TaskType } from "react-babylonjs";

//creating asset tasks for meshes

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
