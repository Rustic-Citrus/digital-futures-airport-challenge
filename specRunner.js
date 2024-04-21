import airportTests from "./spec/airport.test.js";
import aircraftTests from "./spec/aircraft.test.js";

console.log("=== AIRPORT CLASS TESTS ===");

airportTests.forEach((test, i) => {
  console.log(`=== TEST #${i + 1} ===`);
  test();
});

console.log("=== AIRCRAFT CLASS TESTS ===")

aircraftTests.forEach((test, i) => {
  console.log(`=== TEST #${i + 1} ===`);
  test();
});

console.log("=== ALL TESTS COMPLETE ===");