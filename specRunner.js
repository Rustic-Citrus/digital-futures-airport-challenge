import airportTests from "./spec/airport.test.js";

airportTests.forEach((test, i) => {
  console.log(`=== TEST #${i + 1} ===`);
  test();
});