export default class Airport {
  constructor() {
    this.grounded = new Array();
    this.capacity = 10;
    this.airspace = new Array();
    this.weather = "";
  }

  moveAircraftToAirport(aircraft) {
    aircraft.status = "grounded";
    this.grounded.push(aircraft);
  }

  getTotalGrounded() {
    let total = 0;
    this.grounded.forEach(() => {
      total += 1;
    })
    return total;
  }

  getFlightNumbers() {
    const flightNumbers = new Array();

    this.grounded.forEach(vehicle => {
      flightNumbers.push(vehicle.getFlightNumber());
    })

    return flightNumbers;
  }

  getCapacity() {
    return this.capacity;
  }

  setCapacity(newCapacity) {
    if (newCapacity >= 0 && newCapacity > this.capacity && newCapacity < 50) this.capacity = newCapacity;
  }

  getAircraftInAirspace() {
    return this.airspace;
  }

  getGrounded() {
    return this.grounded;
  }

  clearAircraftForLanding(aircraftToClear) {
    if (this.capacity > this.grounded.length && aircraftToClear.getStatus() === "airborne" && this.weather != "stormy") {
      aircraftToClear.hasLandingClearance = true;
    } else if (this.capacity <= this.grounded.length) {
      console.error("ERROR: Insufficient space at airport.");
    } else if (aircraftToClear.getStatus() != "airborne") {
      console.error(`ERROR: ${aircraftToClear.getFlightNumber()} is not airborne.`);
    } else if (this.weather === "stormy") {
      console.error("ERROR: Current weather conditions prevent a safe landing.");
    }
  }

  clearAircraftForTakeOff(aircraftToClear) {
    if (aircraftToClear.getStatus() === "grounded" && this.weather != "stormy") {
      aircraftToClear.hasTakeOffClearance = true;
    } else if (aircraftToClear.getStatus() != "grounded") {
      console.error(`ERROR: ${aircraftToClear.getFlightNumber()} is not grounded.`)
    } else if (this.weather === "stormy") {
      console.error("ERROR: Current weather conditions prevent a safe take-off.")
    }
  }

  checkWeather() {
    if (this.weather === "stormy") {
      for (const vehicle of this.grounded) {
        if (vehicle.hasTakeOffClearance) this.revokeTakeOffClearance(vehicle);
      }
      for (const vehicle of this.airspace) {
        if (vehicle.hasLandingClearance) this.revokeLandingClearance(vehicle);
      }
    }
  }

  weatherIsStormy() {
    this.weather = "stormy";
  }

  weatherIsFine() {
    this.weather = "fine";
  }

  revokeTakeOffClearance(designatedAircraft) {
    designatedAircraft.hasTakeOffClearance = false;
  }

  revokeLandingClearance(designatedAircraft) {
    designatedAircraft.hasLandingClearance = false;
  }
}