const { fake } = require("faker");
const faker = require("faker");
const jsonfile = require("jsonfile");

const file = "./db.json";
const LANGUAGES = require("./language.js");
let data = jsonfile.readFileSync(file);
data = {};

const NUMOFLIBS = 10;
const NUMOFMENTOR = NUMOFLIBS * 2;
const NUMOFHEADS = NUMOFLIBS * 2;
const NUMOFTEACHERS = NUMOFLIBS * 2;
let NUMOFMENTEES = 0;
const genders = ["Male", "Female", "Other"];
const apps = ["phone", "email", "mail", "wechat", "duo", "facebook", "twitter"];
const ACCOUNT_STATUSES = ["Active", "Inactive", "Denied"];

const degrees = ["Masters, Bachelor, Associate, Gradute"]
const SUBJECTS = ["English", "Science", "Math", "Reading"];
const LANGUAGE = ["English", "Spanish", "Vietnamese", "Cantonese", "Mandarin", "Tagalog"];
const GRADES = ["Kindergarten", "1st Grade", "2nd Grade", "3rd Grade", "4th Grade", "5th Grade", "6th Grade", "7th Grade", "8th Grade", "9th Grade", "10th Grade", "11th Grade", "12th Grade"]
const COUNTRIES = ["Belize", "Ghana", "Mexico", "Nepal", "Peru"];
const TIME_ZONES = ["Central Standard Time", "Greenwich Mean Time", "Nepal Standard Time", "Peru Standard Time"];

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
    count_teachers: 0,
    school_description: faker.random.words(30),
    school_needs: faker.random.words(30),
    school_goals: faker.random.words(30),
    dynamic_questions: [],
    notes: faker.random.words(30),
    headmasterId: [],
    teacherId: [],
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
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    gender: faker.random.arrayElement(genders),
    address: faker.address.streetAddress(),
    gps_coordinates: faker.address.nearbyGPSCoordinate(),
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

//Teachers-----------------------------------------------------
data.teacher = [];
for (let index = 0; index < NUMOFTEACHERS; index++) {
  //Generate data
  let fakeTeacher = {
    id: index,
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    account_status: faker.random.arrayElement(ACCOUNT_STATUSES),
    subjects: faker.random.arrayElements(SUBJECTS, 2),
    city: faker.address.city(),
    country: faker.address.country(),
    time_zone: faker.address.timeZone(),
    highest_degree: faker.random.arrayElement(degrees),
    classrooms: faker.random.hexaDecimal(),
    phone: faker.phone.phoneNumberFormat(2),
    email: faker.internet.email(),
    first_language: faker.random.arrayElement(LANGUAGE),
    other_language: faker.random.arrayElements(LANGUAGE, 2),
  };
  data.teacher.push(fakeTeacher);
}

// Mentor -----------------------------------------------------
data.mentor = [];
for (let index = 0; index < NUMOFMENTOR; index++) {
  //Generate data
  let fakeMentor = {
    id: index,
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    account_status: faker.random.arrayElement(ACCOUNT_STATUSES),
    subjects: faker.random.arrayElements(SUBJECTS, 2),
    city: faker.address.city(),
    country: faker.address.country(),
    time_zone: faker.address.timeZone(),
    classrooms: faker.random.hexaDecimal(),
    time_slots: faker.date.future(),
    phone: faker.phone.phoneNumberFormat(2),
    email: faker.internet.email(),
    first_language: faker.random.arrayElement(LANGUAGE),
    other_language: faker.random.arrayElements(LANGUAGE, 2),
    mentee: -1,
  };
  data.mentor.push(fakeMentor);
}

//Mentees-----------------------------------------------------
data.mentee = [];
for (let index = 0; index < NUMOFMENTEES; index++) {
  //Generate data
  let fakeMentees = {
    id: index,
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    subjects: faker.random.arrayElements(SUBJECTS, 2),
    grade: faker.random.arrayElement(GRADES),
    dob: faker.date.past(15, "1999-07-09"),
    home_country: faker.address.country(),
    home_time_zone: faker.address.timeZone(),
    phone: faker.phone.phoneNumberFormat(2),
    email: faker.internet.email(),
    first_language: faker.random.arrayElement(LANGUAGE),
    other_fluent_languages: faker.random.arrayElements(LANGUAGE, 2),
    english_proficiency: faker.random.number(13),
    school_level: faker.random.number(13),
    reading_level:  faker.random.number(13),
    math_level: faker.random.number(13),
    academic_description: faker.random.words(50),
    support_needed: faker.random.words(50),
    general_availability: {
      key: 1,
      time_zone: faker.address.timeZone(),
      as_early_as: faker.fake("{{random.number(12)}}:00"),
      as_late_as: faker.fake("{{random.number(23)}}:00"),
      methods: faker.random.arrayElements(apps, 3),
    },
    bio_questions: [
      { qId: 0, question: "My favorite thing to do in my free time is:", answer: faker.hacker.phrase() },
      { qId: 1, question: "When I grow up, I want to be:", answer: faker.hacker.phrase() },
      { qId: 2, question: "Goals & Dreams:", answer: faker.hacker.phrase() },
      { qId: 3, question: "Personal Struggles:", answer: faker.hacker.phrase() },
      { qId: 4, question: "Other Interests:", answer: faker.hacker.phrase() },
    ],
    admin_notes: [
      { qId: 1, question: "Skills Notes:", answer: faker.hacker.phrase() },
      { qId: 2, question: "Family Notes:", answer: faker.hacker.phrase() },
      { qId: 3, question: "Other Notes:", answer: faker.hacker.phrase() },
      { qId: 4, question: "Admin Notes:", answer: faker.hacker.phrase() },
    ],
    parent_1: {
      key: 1, 
      first_name: faker.name.firstName(), 
      last_name: faker.name.lastName(), 
      email: faker.internet.email(), 
      phone: faker.phone.phoneNumberFormat(2) 
    },
    parent_2: {
      key: 2,
      first_name: faker.name.firstName(), 
      last_name: faker.name.lastName(), 
      email: faker.internet.email(), 
      phone: faker.phone.phoneNumberFormat(2) 
    },
    mentee_picture: faker.image.imageUrl(),
    account_status: faker.random.arrayElement(ACCOUNT_STATUSES),
    mentor_assignment: "",
    mentoring_time_slot: null
  };
  data.mentee.push(fakeMentees);
}

//Programs-----------------------------------------------------
data.program = [];
for (let index = 0; index < NUMOFLIBS; index++) {
  //Generate data
  let fakeProg = {
    id: index,
    name: faker.address.city(),
    location: faker.address.nearbyGPSCoordinate(),
  };
  data.program.push(fakeProg);
}

//Relationships-----------------------------------------------------
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

//teachers
for (let index = 0; index < NUMOFLIBS; index++) {
  //teacher
  data.teacher[index].schoolId = index;
  //Schools
  data.school[index].teacherId.push(index);
  data.school[index].count_teachers += 1;
}

//programs
for (let index = 0; index < data.program.length; index++) {
  data.program[index].libraryId = index;
}

// Randomly assign remaining headmasters to relevant objects
for (let index = NUMOFLIBS; index < data.headmaster.length; index++) {
  let randomVillage = faker.random.number(NUMOFLIBS - 1);
  //headmaster
  data.headmaster[index].libraryId = randomVillage;
  //Village - Schools - Librarys
  data.school[randomVillage].headmasterId.push(index);
  data.village[randomVillage].headmasterId.push(index);
  data.library[randomVillage].headmasterId.push(index);
}

// Randomly assign remaining tachers to relevant schools
for (let index = NUMOFLIBS; index < data.teacher.length; index++) {
  let randomVillage = faker.random.number(NUMOFLIBS - 1);
  //teacher
  data.teacher[index].schoolId = randomVillage;
  //Village - Schools - Librarys
  data.school[randomVillage].teacherId.push(index);
  data.school[randomVillage].count_teachers += 1;
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
    role: "mentee",
  },
  {
    id: 9,
    email: "varun@vbb.com",
    password: "password",
    role: "mentee",
  },
  {
    id: 10,
    email: faker.internet.email(),
    password: "password",
    role: "mentee",
  },
  {
    id: 11,
    email: "teacher@teacher.com",
    password: "password",
    role: "teacher",
  },
  {
    id: 12,
    email: "program@program.com",
    password: "password",
    role: "program",
  },
];

data.user = fakeUsers;
jsonfile.writeFileSync(file, data);
