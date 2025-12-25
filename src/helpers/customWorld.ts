import { IWorldOptions, setWorldConstructor, World } from "@cucumber/cucumber";

export class CustomWorld extends World {
  originalRowCount: number = 0;

  constructor(options: IWorldOptions) {
    super(options);
    // You can initialize other scenario-specific variables here
  }
}

// Tell Cucumber to use this World for every scenario
setWorldConstructor(CustomWorld);