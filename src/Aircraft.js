export default class Aircraft {
  constructor(flightNumber) {
    this.flightNumber = flightNumber;
    this.status = "unknown";
    this.hasLandingClearance = false;
    this.hasTakeOffClearance = false;
  }

  getFlightNumber() {
    return this.flightNumber;
  }

  enterAirspace(airportWithAirspace) {
    this.status = "airborne";
    airportWithAirspace.airspace.push(this);
  }

  getStatus() {
    return this.status;
  }

  land(designatedAirport) {
    this.status = "grounded";
    this.checkLandingClearance() ? designatedAirport.moveAircraftToAirport(this) : console.error(`ERROR: ${this.getFlightNumber()} does not have clearance to land.`);
  }

  takeOff(designatedAirport) {
    if (this.checkTakeOffClearance() && this.status === "grounded") {
      for (let i = 0; i < designatedAirport.grounded.length; i++) {
        if (designatedAirport.grounded[i].getFlightNumber() === this.getFlightNumber()) {
          designatedAirport.grounded.splice(i, 1);
          break;
        }
      }
      this.status = "airborne";
      this.enterAirspace(designatedAirport);
    }
  }

  checkLandingClearance() {
    return this.hasLandingClearance;
  }

  checkTakeOffClearance() {
    return this.hasTakeOffClearance;
  }
}