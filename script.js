// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBNuPX74xnSJWb6788zA66I25ssqpbgc6Q",
  authDomain: "attendance-system-parents.firebaseapp.com",
  projectId: "attendance-system-parents",
  storageBucket: "attendance-system-parents.appspot.com",
  messagingSenderId: "154472242217",
  appId: "1:154472242217:web:d97254d119622d1e98d038"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
let database = firebase.database();
// Get a non-default Storage bucket
const vapidKey = "BKcXfrQDYfJxeZyD6pjSJkc-KmpIk4cxCaxK6AtExyXkxY3qi3WYojNp29OVJquYLSA4uQos87MCquTJP548by0";
const messaging = firebase.messaging();

messaging.getToken({ vapidKey: vapidKey }).then((currentToken) => {
  if (currentToken) {
    console.log("current token for client: ", currentToken);
    // sendTokenToServer(currentToken);
    // updateUIForPushEnabled(currentToken);
  } else {
    // Show permission request UI
    console.log(
      "No registration token available. Request permission to generate one."
    );
    // updateUIForPushPermissionRequired();
    // setTokenSentToServer(false);
  }
});



if ("Notification" in window) {
  // Request permission for notifications
  Notification.requestPermission()
    .then((permission) => {
      if (permission === "granted") {
        console.log("Notification permission granted");
      } else if (permission === "denied") {
        console.log("Notification permission denied");
      } else if (permission === "default") {
        console.log("Notification permission dismissed");
      }
    })
    .catch((error) => {
      console.error("Error requesting notification permission:", error);
    });
} else {
  console.log("Notification API not supported");
}




let reg_adm = document.getElementById('reg_adm');
let reg_name = document.getElementById('reg_name');
let reg_class = document.getElementById('reg_class');
let reg_submit = document.getElementById('reg_submit');
let reg_image = document.getElementById('reg_image'); // input type file

let dashboard = document.getElementById('dashboard');
let dash_name = document.getElementById('dash_name');
let dash_class = document.getElementById('dash_class');
let dash_attendance = document.getElementById('dash_attendance');

let check_adm = document.getElementById('check_adm');
let check_class = document.getElementById('check_class');
let check_submit = document.getElementById('check_submit');

let view_name = document.getElementById('view_name');
let view_class = document.getElementById('view_class');
let view_attendance = document.getElementById('view_attendance');



function writeUserData(adm, classs, namee) {
  firebase.database().ref('Students/' + adm).set({
    class: classs,
    id: adm,
    last_attendance_time: "2024-03-22 13:58:43",
    name: namee,
    standing: "A",
    starting_year: 2024,
    total_attendance: 0,
    year: 1
  })



  alert("Data saved successfully");
}

function readUserData(adm){
  var storageRef = firebase.database().ref('Students/' + adm);

  storageRef.on('value', (snapshot) => {
    const dt = snapshot.val();
    console.log(dt);
  })

}



function checkUserData(adm, classs){
  var storageRef = firebase.database().ref('Students/' + adm);

  storageRef.on('value', (snapshot) => {
    const dt = snapshot.val();
    if(dt.class == classs){
      console.log("Student exists in the class");
    }
    else{
      console.log("Student does not exist in the class");
    }
  })


  alert("Data checked successfully");

}


reg_submit.addEventListener('click', (e) => {
  e.preventDefault();
  if(!reg_adm.value || !reg_class.value || !reg_name.value){
    alert("Please fill all the fields");
    return;
  }
  
  writeUserData(reg_adm.value, reg_class.value, reg_name.value);



  // Save data to local storage
  let studentData = {
    adm: reg_adm.value,
    classs: reg_class.value,
    namee: reg_name.value
  };
  let students = JSON.parse(localStorage.getItem('students')) || [];
  students.push(studentData);
  localStorage.setItem('students', JSON.stringify(students));

  alert("Data saved successfully");
  reg_adm.value = "";
  reg_class.value = "";
  reg_name.value = "";
})

function checkLocalStorageAndUpdateDashboard() {
  let students = JSON.parse(localStorage.getItem('students')) || [];
  let dashboardContainer = document.getElementById('dashboard');

  // Clear existing dashboards
  dashboardContainer.innerHTML = '';

  students.forEach((studentData) => {
    let dashboardDiv = document.createElement('div');
    dashboardDiv.classList.add('dashboard-item');

    let image = document.createElement('img');
    image.src = './assets/jaypal_sir.jfif';
    dashboardDiv.appendChild(image);

    let name = document.createElement('p');
    name.id = 'dash_name';
    name.classList.add('dash_name', 'tooltip');
    name.textContent = studentData.namee;
    let nameTooltip = document.createElement('span');
    nameTooltip.classList.add('tooltiptext');
    nameTooltip.textContent = 'Name';
    name.appendChild(nameTooltip);
    dashboardDiv.appendChild(name);

    let className = document.createElement('p');
    className.id = 'dash_class';
    className.classList.add('dash_class', 'tooltip');
    className.textContent = studentData.classs;
    let classTooltip = document.createElement('span');
    classTooltip.classList.add('tooltiptext');
    classTooltip.textContent = 'Class';
    className.appendChild(classTooltip);
    dashboardDiv.appendChild(className);

    let attendance = document.createElement('p');
    attendance.id = 'dash_attendance';
    attendance.classList.add('dash_attendance', 'tooltip');
    attendance.textContent = '0';
    let attendanceTooltip = document.createElement('span');
    attendanceTooltip.classList.add('tooltiptext');
    attendanceTooltip.textContent = 'Attendance';
    attendance.appendChild(attendanceTooltip);
    dashboardDiv.appendChild(attendance);

    dashboardContainer.appendChild(dashboardDiv);
  });
}

setTimeout(() => {
  checkLocalStorageAndUpdateDashboard();
}, 1000);


check_submit.addEventListener('click', (e) => {
  e.preventDefault();
  if (!check_adm.value || !check_class.value) {
    alert("Please fill all the fields");
    return;
  }
  checkUserData(check_adm.value, check_class.value);
  checkLocalStorageAndUpdateDashboard();
})





check_submit.addEventListener('click', (e) => {
  e.preventDefault();
  if(!check_adm.value || !check_class.value){
    alert("Please fill all the fields");
    return;
  }
  checkUserData(check_adm.value, check_class.value);
})