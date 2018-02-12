


const newInspector = document.getElementById("btnInspector");
const newFarmer = document.getElementById("btnFarmer");
const newEmployee = document.getElementById("btnEmployee");



newFarmer.addEventListener('click', function () {
  window.location = 'farmerAccountCreation.html';
});

newInspector.addEventListener('click', function() {
  window.location = 'inspectorAccountCreation.html';
});

newEmployee.addEventListener('click', function () {
  window.location = 'employeeAccountCreation.html';
});
