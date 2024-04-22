# Domain Models and Test Plan

**Author**: Harry Stuart Curtis

**Date Added**: 2024-04-19

**Last Updated**: 2024-04-22

## List of Contents

- [Domain Models and Test Plan](#domain-models-and-test-plan)
  - [List of Contents](#list-of-contents)
  - [Check Total Number of Aircraft at the Airport](#check-total-number-of-aircraft-at-the-airport)
    - [Story](#story)
    - [Domain Model](#domain-model)
    - [Test Cases](#test-cases)
  - [Override Default Capacity](#override-default-capacity)
    - [Stories](#stories)
    - [Domain Model](#domain-model-1)
    - [Test Cases](#test-cases-1)
  - [Landing an Aircraft at the Airport and Giving Clearance for Landing](#landing-an-aircraft-at-the-airport-and-giving-clearance-for-landing)
    - [Stories](#stories-1)
    - [Domain Model](#domain-model-2)
    - [Test Cases](#test-cases-2)

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

## Landing an Aircraft at the Airport and Giving Clearance for Landing

### Stories

As a **pilot**, I want to be able to enter the airspace of the airport, so that I can request clearance for landing.

As a **pilot**, I want to be able to land the aircraft I am piloting, so that I can allow my passengers to disembark.

As a **pilot**, I only want to be able to land the plane if the conditions are safe, so that I minimise the risk of an accident.

As a **pilot**, I only want to receive accurate information, so that I can make the effective decisions regarding the aircraft I am piloting.

As an **air traffic controller**, I only want to give clearance for landing to aircraft that are in the air, so that I do not send misleading or confusing messages to pilots.

As a **hacker/disgruntled employee**, I want to give clearance for landing to aircraft when the airport is full, so that I can cause an accident.

As an **air traffic controller**, I do not want to clear a plane for landing when the airport is full, so that airport spaces are not over capacity in a way that causes a hazard.

As an **air traffic controller**, I do not want to clear a plane for landing that is grounded at the airport, so that pilots do not receive confusing information.

As a **hacker/disgruntled employee**, I want to clear planes for landing even when they are grounded, so that I can confuse pilots and increase the risk of accidents.

### Domain Model

| Object | Property | Message | Output |
| --- | --- | --- | --- |
| Airport | grounded @Array[@Aircraft] | getGroundedAircraft() | @Array[@Aircraft] |
|  |  | getTotalGrounded() | @Number |
|  |  | moveAircraftToAirport(@Aircraft) |  |
|  | capacity @Number | getCapacity() | @Number  |
|  | | setCapacity(@Number) |  |
|  | airspace @Array[@Aircraft] | getAircraftInAirspace() | @Array[@Aircraft]  |
|  | | clearAircraftForLanding(@Aircraft) |  |
| Aircraft | flightNumber @String | getFlightNumber() | @String |
|  | airline @String | getAirline() | @String |
|  | hasLandingClearance @Boolean | checkLandingClearance() | @Boolean |
|  | status @String | getStatus() | @String |
|  | | land(@Airport) | |
|  | | enterAirspace(@Airport) | |

### Test Cases

* [X] Aircraft can enter the airspace of an airport.
* [X] Airports can check the status of aircraft that are grounded or in their airspace.
* [X] Aircraft can land at an airport.
* [X] Airports can clear aircraft for landing.
* [X] Aircraft can only land if they have clearance for landing.
* [ ] Airports can only clear aircraft for landing if there is at least 1 space at the airport.
* [ ] Airports can only give an aircraft clearance for landing if the aircraft is not grounded.