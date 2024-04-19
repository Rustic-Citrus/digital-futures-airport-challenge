export default class Airport {
  constructor() {
    this.vehicles = new Array();
  }

  moveVehicleToAirport(aircraft) {
    this.vehicles.push(aircraft);
  }

  getTotalVehicles() {
    let total = 0;
    this.vehicles.forEach(() => {
      total += 1;
    })
    return total;
  }
}