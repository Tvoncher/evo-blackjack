import { Task, TaskType } from "react-babylonjs";

//creating download task for card mesh

export const assetManager: Task[] = [
  {
    taskType: TaskType.Mesh,
    rootUrl: `models/`,
    sceneFilename: "card.glb",
    name: "card",
  },
];
