const btnchiaFarmVisit = document.getElementById("chiaFarmerVisit");
const btnchiaPaddyVisit = document.getElementById("chiaPaddyVisit");
const btnriceFieldActivity = document.getElementById("riceFieldActivity");
const btnriceFieldInspection = document.getElementById("riceFieldInspection");
const btneggInternalAudit = document.getElementById("eggfarmerIntAudit");
const btneggFarmerRecord = document.getElementById("eggFarmerRecord");
const btneggHTOLedger = document.getElementById("eggHTOLedger");
const btneggSummary = document.getElementById("eggChickenFarm");

waitingforChange();

function waitingforChange() {
  if (waitingVariable){
    formsOption();
  }else {
    waitingforChange();
  }
};

function formsOption() {
  console.log(productType);
  if (productType == 'Egg') {
    btnchiaFarmVisit.disabled = true;
    btnchiaFarmVisit.style.display = "none";
    btnchiaPaddyVisit.classList.add('disabled');
    btnchiaPaddyVisit.style.display = "none";
    btnriceFieldActivity.classList.add('disabled');
    btnriceFieldActivity.style.display = "none";
    btnriceFieldInspection.classList.add('disabled');
    btnriceFieldInspection.style.display = "none";
  } else if (productType == 'Chia Seed') {
    console.log("Chia seed if statement");
    btneggInternalAudit.innerHTML = '';
    // btneggInternalAudit.style.visibility = "hidden";
    btneggFarmerRecord.classList.add('disabled');
    btneggFarmerRecord.style.display = "none";
    btneggHTOLedger.classList.add('disabled');
    btneggHTOLedger.style.display = "none";
    btneggSummary.classList.add('disabled');
    btneggSummary.style.display = "none";
    btnriceFieldActivity.classList.add('disabled');
    btnriceFieldActivity.style.display = "none";
    btnriceFieldInspection.classList.add('disabled');
    btnriceFieldInspection.style.display = "none";
  } else if (productType == 'Rice') {
    btneggInternalAudit.classList.add('disabled');
    btneggInternalAudit.style.display = "none";
    btneggFarmerRecord.classList.add('disabled');
    btneggFarmerRecord.style.display = "none";
    btneggHTOLedger.classList.add('disabled');
    btneggHTOLedger.style.display = "none";
    btneggSummary.classList.add('disabled');
    btneggSummary.style.display = "none";
    btnchiaFarmVisit.classList.add('disabled');
    btnchiaFarmVisit.style.display = "none";
    btnchiaPaddyVisit.classList.add('disabled');
    btnchiaPaddyVisit.style.display = "none";
  } else if (productType == 'Coconut') {
    btneggInternalAudit.classList.add('disabled');
    btneggInternalAudit.style.display = "none";
    btneggFarmerRecord.classList.add('disabled');
    btneggFarmerRecord.style.display = "none";
    btneggHTOLedger.classList.add('disabled');
    btneggHTOLedger.style.display = "none";
    btneggSummary.classList.add('disabled');
    btneggSummary.style.display = "none";
    btnchiaFarmVisit.classList.add('disabled');
    btnchiaFarmVisit.style.display = "none";
    btnchiaPaddyVisit.classList.add('disabled');
    btnchiaPaddyVisit.style.display = "none";
    btnriceFieldActivity.classList.add('disabled');
    btnriceFieldActivity.style.display = "none";
    btnriceFieldInspection.classList.add('disabled');
    btnriceFieldInspection.style.display = "none";
  }
};
