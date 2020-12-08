# API Basics

> Please note due to json-server, ALL HTTP verbs are supported at this time. Refer to https://www.notion.so/VBB-Designing-API-Contract-Endpoints-eca9722b1fdb4552915f9f0999ba802a for API specifications/contracts

## Routes

**Base Url**: http://54.158.134.245/api

**Library**(s): /admin/library

> sample response to GET request

```
{
"id": 0,
"name": "Library Name 0",
"description": "This is a test description",
"library_usage": "This tells you about the usage of the library",
"notes": "Notes about the library",
"image": "https://via.placeholder.com/150"
}
```

**Headmaster (all villages)**: /headmaster/village 
*this route is for testing so we can see how many villages are currently in the db*  

> From the api contract, the strategy implemented was based on this pattern _/headmaster/village/:villageId_

```
{
  "id": 0,
  "GPS_coordinates": [
    2131231.233,
    348593845.34234
  ],
  "images_drive_folder_link": "https://drive.google.com/drive",
  "village_contact_name": "Jon Doe",
  "village_contact_phone": 123456789,
  "education_contact": {
    "name": "Ed Contact",
    "phone": 245678546,
    "email": "email@contact.com"
  },
  "notes": "These are notes for this"

}
```  
  
**Headmaster (single village)**: /headmaster/village/:villageID  
*This route gets a village based on specific village ID*