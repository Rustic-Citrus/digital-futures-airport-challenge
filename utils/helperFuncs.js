import Aircraft from "../src/Aircraft.js";
import airlines from "../data/airlines.json" assert { type: "json" };

export function generateRandomAircraft(numOfAircraft) {
  const aircraftArray = new Array();

  for (let i = 0; i < numOfAircraft; i++) {
    const seedOne = Math.floor(Math.random() * airlines.length);
    const seedTwo = Math.floor(Math.random() * 900) + 100 // Random three-digit flight number
    const aircraftId = `${airlines[seedOne].prefix}${seedTwo}`;
    const aircraft = new Aircraft(aircraftId);

    aircraftArray.push(aircraft);
  }

  return aircraftArray;
}