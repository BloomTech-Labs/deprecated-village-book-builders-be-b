const faker = require("faker");
const jsonfile = require("jsonfile");

const file = "./db.json";
const LANGUAGES = require("./language.js");
let data = jsonfile.readFileSync(file);
data = {};

const NUMOFLIBS = 30;
const NUMOFHEADS = NUMOFLIBS * 2;
let NUMOFMENTEES = 0;
const genders = ["Male", "Female", "Not Disclosed"];
const apps = [
  "phone",
  "email",
  "whattsapp",
  "wechat",
  "duo",
  "facebook",
  "twitter",
];

//Librarys-----------------------------------------------------
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
    headmasterId: [],
  };

  data.library.push(fakeLib);
}

//Villages-----------------------------------------------------
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
    headmasterId: [],
  };

  data.village.push(fakeVillage);
}

//Schools-----------------------------------------------------
data.school = [];
for (let index = 0; index < NUMOFLIBS; index++) {
  //Generate data
  let schoolmenteess = faker.random.number(NUMOFHEADS * 2);
  NUMOFMENTEES += schoolmenteess;
  let fakeSchool = {
    id: index,
    name: faker.company.companyName(),
    count_menteess_currently_enrolled: faker.random.number(schoolmenteess),
    count_teachers: faker.random.number(NUMOFHEADS) + 4,
    school_description: faker.random.words(30),
    school_needs: faker.random.words(30),
    school_goals: faker.random.words(30),
    dynamic_questions: [],
    notes: faker.random.words(30),
    headmasterId: [],
  };

  for (let x = 0; x < 3; x++) {
    fakeSchool.dynamic_questions.push({
      [`${faker.hacker.phrase()}`]: faker.random.words(20),
    });
  }
  data.school.push(fakeSchool);
}

//Headmasters-----------------------------------------------------
data.headmaster = [];
for (let index = 0; index < NUMOFHEADS; index++) {
  //Generate data
  let fakeHeadmaster = {
    id: index,
    first_Name: faker.name.firstName(),
    last_Name: faker.name.lastName(),
    gender: faker.random.arrayElement(genders),
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
  data.headmaster.push(fakeHeadmaster);
}

//menteess-----------------------------------------------------
data.mentees = [];
for (let index = 0; index < NUMOFMENTEES; index++) {
  //Generate data
  let fakeMentees = {
    id: index,
    first_Name: faker.name.firstName(),
    last_Name: faker.name.lastName(),
    gender: genders[faker.random.number(genders.length - 1)],
    email: faker.internet.email(),
    primary_language: faker.random.arrayElement(LANGUAGES).name,
    dob: faker.date.past(15, "1999-07-09"),
    menteess_picture: faker.image.imageUrl(),
    english_lvl: faker.random.number(10),
    math_lvl: faker.random.number(13),
    reading_lvl: faker.random.number(13),
    school_lvl: faker.random.number(13),
    academic_description: faker.random.words(20),
    support_needed: faker.random.words(35),
    availability: {
      time_zone: faker.address.timeZone(),
      as_early_as: faker.fake("{{random.number(24)}}:00"),
      as_late_as: faker.fake("{{random.number(24)}}:00"),
      methods: faker.random.arrayElements(apps, 3),
    },
    dynamic_questions: [
      { "My favorite thing to do in my free time is": faker.hacker.phrase() },
      { "When I grow up, I want to be": faker.hacker.phrase() },
      { "Goals & Dreams Notes": faker.hacker.phrase() },
      { "Personal Struggles Notes": faker.hacker.phrase() },
      { "Other interests/hobbies": faker.hacker.phrase() },
      { "Skills Notes": faker.hacker.phrase() },
      { "Family Notes": faker.hacker.phrase() },
      { "Other Notes": faker.hacker.phrase() },
      { "Admin Notes": faker.hacker.phrase() },
    ],
  };

  data.mentees.push(fakeMentees);
}

//Releationships-----------------------------------------------------
//-----------------------------------------------------
//-----------------------------------------------------
//-----------------------------------------------------
//Village - Schools - Librarys
for (let index = 0; index < NUMOFLIBS; index++) {
  //library
  data.library[index].villageId = index;
  data.library[index].schoolId = index;
  //school
  data.school[index].villageId = index;
  data.school[index].libraryId = index;
  //village
  data.village[index].schoolId = index;
  data.village[index].libraryId = index;
}

//headmasters
for (let index = 0; index < NUMOFLIBS; index++) {
  //headmaster
  data.headmaster[index].villageId = index;
  data.headmaster[index].schoolId = index;
  data.headmaster[index].libraryId = index;
  //Village - Schools - Librarys
  data.school[index].headmasterId.push(index);
  data.village[index].headmasterId.push(index);
  data.library[index].headmasterId.push(index);
}

for (let index = NUMOFLIBS; index < data.headmaster.length; index++) {
  let randomVillage = faker.random.number(NUMOFLIBS);
  randomVillage -= 1 ? randomVillage != 0 : (randomVillage = randomVillage);
  //headmaster
  data.headmaster[index].libraryId = randomVillage;
  //Village - Schools - Librarys
  data.school[randomVillage].headmasterId.push(index);
  data.village[randomVillage].headmasterId.push(index);
  data.library[randomVillage].headmasterId.push(index);
}

//Users-----------------------------------------------------

const fakeUsers = [
  { id: 0, email: "admin@admin.com", password: "password", role: "admin" },
  { id: 2, email: "bruno@email.com", password: "password", role: "admin" },
  { id: 3, email: faker.internet.email(), password: "password", role: "admin" },
  {
    id: 4,
    email: "headmaster@headmaster.com",
    password: "password",
    role: "headmaster",
  },
  {
    id: 5,
    email: "varun@vbb.com",
    password: "password",
    role: "headmaster",
  },
  {
    id: 6,
    email: "Isadore37@hotmail.com",
    password: "password",
    role: "headmaster",
  },
  {
    id: 7,
    email: faker.internet.email(),
    password: "password",
    role: "headmaster",
  },
  {
    id: 8,
    email: "mentees@mentees.com",
    password: "password",
    role: "mentees",
  },
  {
    id: 9,
    email: "varun@vbb.com",
    password: "password",
    role: "mentees",
  },
  {
    id: 10,
    email: faker.internet.email(),
    password: "password",
    role: "mentees",
  },
];
data.user = fakeUsers;
//Debbuging print statements-----------------------------------------------------
// console.log(data.library, "\n\n\n\n\n\n\n\n\n\n\n");
// console.log(data.village, "\n\n\n\n\n\n\n\n\n\n\n");
// console.log(
//   data.school,
//   data.school[0].dynamic_questions,
//   "\n\n\n\n\n\n\n\n\n\n\n"
// );
// console.log(data.headmaster, "\n\n\n\n\n\n\n\n\n\n\n");
// console.log(data.mentees[0].primary_language, "\n\n\n\n\n\n\n\n\n\n\n");
console.log(data.user);
jsonfile.writeFileSync(file, data);
