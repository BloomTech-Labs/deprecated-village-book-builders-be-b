const faker = require("faker");
const jsonfile = require("jsonfile");

const file = "./test.json";

let data = jsonfile.readFileSync(file);
data = {};

const NUMOFLIBS = 1;
const NUMOFHEADS = NUMOFLIBS * 3;
let NUMOFSTUDENTS = 0;

//Librarys
data.library = [];
for (let index = 0; index < NUMOFLIBS; index++) {
  //Generate data
  let fakeLib = {
    id: index,
    name: faker.company.companyName(1),
    description: faker.random.words(30),
    library_usage: faker.random.words(30),
    notes: faker.random.words(30),
    image: faker.image.imageUrl(600, 600),
    villageId: index,
  };

  data.library.push(fakeLib);
}
console.log(data.library, "\n\n\n\n\n\n\n\n\n\n\n");

//Villages
data.village = [];
for (let index = 0; index < NUMOFLIBS; index++) {
  //Generate data
  let fakeVillage = {
    id: index,
    name: faker.address.city(),
    GPS_coordinates: faker.address.nearbyGPSCoordinate(),
    village_contact_name: faker.name.findName(),
    village_contact_phone: faker.phone.phoneNumberFormat(),
    notes: faker.random.words(50),
    libraryId: index,
    headmasterId: faker.random.number(NUMOFLIBS),
  };

  data.village.push(fakeVillage);
}
console.log(data.village, "\n\n\n\n\n\n\n\n\n\n\n");

//Schools
data.school = [];
for (let index = 0; index < NUMOFLIBS; index++) {
  //Generate data
  let schoolStudents = faker.random.number(NUMOFHEADS * 6) + NUMOFHEADS * 3;
  NUMOFSTUDENTS += schoolStudents;
  let fakeSchool = {
    id: index,
    name: faker.company.companyName(),
    count_students_currently_enrolled: faker.random.number(schoolStudents),
    count_teachers: faker.random.number(NUMOFHEADS) + 4,
    school_description: faker.random.words(30),
    school_needs: faker.random.words(30),
    school_goals: faker.random.words(30),
    dynamic_questions: [],
    notes: faker.random.words(30),
  };

  for (let x = 0; x < 3; x++) {
    fakeSchool.dynamic_questions.push({
      [`${faker.hacker.phrase()}`]: faker.random.words(20),
    });
  }
  data.school.push(fakeSchool);
}
console.log(
  data.school,
  data.school[0].dynamic_questions,
  "\n\n\n\n\n\n\n\n\n\n\n"
);

//Headmasters
data.headmaster = [];
for (let index = 0; index < NUMOFHEADS; index++) {
  //Generate data
  let fakeHeadmaster = {
    id: index,
    name: faker.name.findName(),
    gender: faker.name.gender(),
    address: faker.address.streetAddress(),
    GPS_coordinates: faker.address.nearbyGPSCoordinate(),
    images_drive_folder_link: faker.internet.url(),
    headmasters_picture: faker.image.imageUrl(),
    education_contact: {
      name: faker.name.findName(),
      phone: faker.phone.phoneNumberFormat(2),
      email: faker.internet.email(),
      jobTitle: faker.name.jobTitle(),
    },
    notes: faker.random.words(50),
  };

  data.headmaster.push(fakeHeadmaster, "\n\n\n\n\n\n\n\n\n\n\n");
}

// //Students
// data.headmaster = [];
// for (let index = 0; index < NUMOFLIBS * 5; index++) {
//   //Generate data
//   let randomVillage = faker.random.number(NUMOFLIBS);
//   let fakeHeadmaster = {
//     id: index,
//     name: faker.name.findName(),
//     gender: faker.name.gender(),
//     address: faker.address.streetAddress(),
//     GPS_coordinates: faker.address.nearbyGPSCoordinate(),
//     images_drive_folder_link: faker.internet.url(),
//     headmasters_picture: faker.image.imageUrl(),
//     education_contact: {
//       name: faker.name.findName(),
//       phone: faker.phone.phoneNumberFormat(2),
//       email: faker.internet.email(),
//       jobTitle: faker.name.jobTitle(),
//     },
//     notes: faker.random.words(50),
//     libraryId: randomVillage,
//     villageId: randomVillage,
//   };

//   data.headmaster.push(fakeHeadmaster, "\n\n\n\n\n\n\n\n\n\n\n");
// }

jsonfile.writeFileSync(file, data);
