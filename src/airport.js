export default class Airport {
  constructor() {
    this.grounded = new Array();
    this.capacity = 10;
    this.airspace = new Array();
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
    if (this.capacity > this.grounded.length && aircraftToClear.getStatus() === "airborne") {
      aircraftToClear.hasLandingClearance = true;
    } else if (this.capacity <= this.grounded.length) {
      console.error("ERROR: Insufficient space at airport.");
    } else if (aircraftToClear.getStatus() != "airborne") {
      console.error(`ERROR: ${aircraftToClear.getFlightNumber()} is not airborne.`)
    }
  }

  clearAircraftForTakeOff(aircraftToClear) {
    if (aircraftToClear.getStatus() === "grounded") {
      aircraftToClear.hasTakeOffClearance = true;
    } else {
      console.error(`ERROR: ${aircraftToClear.getFlightNumber()} is not grounded.`)
    }
  }
}