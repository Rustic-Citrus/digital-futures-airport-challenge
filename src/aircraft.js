export default class Aircraft {
  constructor(flightNumber) {
    this.flightNumber = flightNumber;
    this.status = "unknown";
    this.hasLandingClearance = false;
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
    this.status = "airborne";
    for (let i = 0; i < designatedAirport.grounded; i++) {
      if (designatedAirport.grounded[i].getFlightNumber() === this.getFlightNumber()) designatedAirport.moveFromGroundedToAirspace(grounded[i]);
    }
  }

  checkLandingClearance() {
    return this.hasLandingClearance;
  }
}