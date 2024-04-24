import Airport from "./Airport.js";
import { generateRandomAircraft } from "../utils/helperFuncs.js";

console.log("=== Start of demo ===");
console.log();
console.log("Welcome to Moorpath Airport.");

// Create a Date object to simulate time passing.
const date = new Date();
date.setHours(6);

const monthString = date.getMonth() >= 9 ? `${date.getMonth() + 1}` : `0${date.getMonth() + 1}`;

console.log(`The date is ${date.getDate()}/${monthString}/${date.getFullYear()}.`);

// 16 aircraft are generated with random flight numbers and airlines.
const randomAircraft = generateRandomAircraft(16);

// Half of the aircraft are airborne, the other half are grounded.
const groundedAircraft = randomAircraft.splice(0, 8);
const airborneAircraft = randomAircraft;

// A demo airport is initialised and the grounded aircraft are moved to the airport.
const demoAirport = new Airport();
groundedAircraft.forEach(aircraft => {
  demoAirport.moveAircraftToAirport(aircraft);
});

airborneAircraft.forEach((aircraft, i) => {
  console.log();
  console.log(`At ${date.getHours()}:00: `);
  const airborneAircraftFlightNumber = aircraft.getFlightNumber();
  aircraft.enterAirspace(demoAirport);
  
  // Make a probability roll to determine the random conditions.
  const roll = Math.floor(Math.random() * 100);

  // 25% of the time, the weather improves if it was stormy.
  if (roll >= 20 && roll < 45) {
    if (demoAirport.weather === "stormy") {
      demoAirport.weatherIsFine();
      console.log("The clouds cleared and the weather improved.");
      console.log();
    }
    
  // 20% of the time the weather turns stormy.
  } else if (roll < 20 && roll > 0) {
    demoAirport.weatherIsStormy();
    console.log("Heavy rain set in and the conditions became stormy.");
    console.log();
  }

  //  Moorpath Airport tries to clear the aircraft for landing.
  console.log(`Flight ${airborneAircraftFlightNumber} requested clearance to land at Moorpath Airport.`);
  demoAirport.clearAircraftForLanding(aircraft);

  // The console reports whether the aircraft was cleared or not.
  // The aircraft then tries to land at Moorpath Airport.
  if (aircraft.checkLandingClearance()) {
    console.log(`Flight ${airborneAircraftFlightNumber} was cleared to land at Moorpath.`);
    aircraft.land(demoAirport);
    console.log(`Flight ${airborneAircraftFlightNumber} landed at Moorpath Airport.`);
  } else {
    console.log(`Flight ${airborneAircraftFlightNumber} was not cleared for landing.`);
    console.log(`Flight ${airborneAircraftFlightNumber} was rerouted to a nearby airport.`);
  }
  
  console.log();

  if (roll > 50) {
  // Increment and show the time.
  date.setHours(date.getHours() + 1);
  console.log();
  console.log(`At ${date.getHours()}:00: `);

    const otherAircraft = demoAirport.grounded[i];
    const groundedAircraftFlightNumber = demoAirport.grounded[i].getFlightNumber();

    //  Moorpath Airport tries to clear the aircraft for take off.
    console.log(`Flight ${groundedAircraftFlightNumber} requested clearance to take off from Moorpath Airport.`);
    demoAirport.clearAircraftForTakeOff(otherAircraft);

    // The console reports whether the aircraft was cleared or not.
    // The aircraft then tries to land at Moorpath Airport.
    if (otherAircraft.checkTakeOffClearance()) {
      console.log(`Flight ${groundedAircraftFlightNumber} was cleared to take off from Moorpath.`);
      otherAircraft.takeOff(demoAirport);
      console.log(`Flight ${groundedAircraftFlightNumber} took off from Moorpath Airport.`);
    } else {
      console.log(`Flight ${groundedAircraftFlightNumber} was not cleared for take off.`);
      console.log(`Flight ${groundedAircraftFlightNumber} remained grounded.`);
    }
  }

  // Increment the time.
  date.setHours(date.getHours() + 1);
});

console.log();
console.log(`The day finished at: ${date.getHours()}:00`);
console.log();
console.log("=== End of demo ===");