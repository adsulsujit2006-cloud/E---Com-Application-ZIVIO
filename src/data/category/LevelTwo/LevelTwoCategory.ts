

// Combined export — handy for building a full category tree or a


import { ElectronicsLevelTwo } from "./ElectronicsLevelTwo";
import { KidsLevlTwo } from "./KidsLevelTwo";
import { menLevlTwo } from "./menLevelTwo";
import { womenLevlTwo } from "./WomeanLevelTwo";

// categoryId -> category lookup map in one place.
export const AllLevelTwoCategories = [
  ...ElectronicsLevelTwo,
  ...KidsLevlTwo,
  ...menLevlTwo,
  ...womenLevlTwo,
];
