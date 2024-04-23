import airportTestSuite from "./spec/airport.test.js";
import aircraftTestSuite from "./spec/aircraft.test.js";

console.log("=== AIRPORT CLASS TESTS ===");

airportTestSuite.runTests();

console.log("=== AIRCRAFT CLASS TESTS ===")

aircraftTestSuite.runTests();

console.log("=== ALL TESTS COMPLETE ===");