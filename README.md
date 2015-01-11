**HomeSensorAPI**

A simple RESTful API for accepting readings from any hardware sensor (Arduino, RaspberryPi, Beaglebone, etc.) that can send JSON data via the web. Designed for easy deployment on Heroku (but could easily be modified to run anywhere). 

Accepts a JSON payload and stores the data to MongoDB for retrieval later.

Example POST payload for a temperature reading in a child's nursery room:

```
{
  room: "nursery", 
  value: 20.6
  sensor: "temperature"
}
```
