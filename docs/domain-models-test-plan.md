# Domain Models and Test Plan

**Author**: Harry Stuart Curtis

**Date Added**: 2024-04-19

**Last Updated**: 2024-04-19

## List of Contents

1. [Total Aircraft](#check-the-total-number-of-aircraft-at-the-airport)

## Check Total Number of Aircraft at the Airport

### Story

As a **member of the airport operations staff**, I want to be able to see the occupancy of the various hangars and spaces of the airport, so that I can coordinate incoming and outgoing aircraft to the appropriate spaces.

### Domain Model

| Object | Property | Message | Output |
| --- | --- | --- | --- |
| Airport | vehicles @Array[@Aircraft] | getVehicles() | @Array[@Aircraft] |
|  |  | getTotalVehicles() | @Number |
|  |  | moveVehicleToAirport(@Aircraft) |  |
| Aircraft | flightNumber @String | getFlightNumber() | @String |
|  | airline @String | getAirline() | @String |

### Test Cases

* [X] The user can move an aircraft to the airport.
* [X] The user can retrieve the total number of aircraft that are in the airport.

## Override Default Capacity

### Stories

As a **member of the maintenance team**, I want to be able to override the default capacity of each of the spaces of the airport, so that I can allocate more aircraft to an area when there is a high demand for airport space.

As a **hacker/disgruntled employee**, I want to be able to decrease the default capacity of a space below its current occupancy, so that I can give the impression that the space is full when it is not.

As a **hacker/disgruntled employee**, I want to be able to increase the default capacity of an airport space well above its normal capacity, so that there is an increased risk of accidents.

### Domain Model

| Object | Property | Message | Output |
| --- | --- | --- | --- |
| Airport | vehicles @Array[@Aircraft] | getVehicles() | @Array[@Aircraft] |
|  |  | getTotalVehicles() | @Number |
|  |  | moveVehicleToAirport(@Aircraft) |  |
|  | capacity @Number | getCapacity() | @Number  |
|  | | setCapacity(@Number) |  |
| Aircraft | flightNumber @String | getFlightNumber() | @String |
|  | airline @String | getAirline() | @String |

### Test Cases

* [X] The user can change the capacity of the airport.
* [X] The user cannot change the capacity of the airport below 0.
* [X] The user cannot change the capacity of the airport below the number of aircraft currently at the airport.
* [X] The user cannot change the capacity of the airport above 50.
