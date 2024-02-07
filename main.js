let store_every_day_reminder = () => {

  let myDate = document.getElementById('myDate');
  let myTime = document.getElementById('myTime');
  let myTitle = document.getElementById('myTitle');
  // validate the input
  if (myDate.value === "" || myTime.value === "" || myTitle.value === "") {
    alert("All fields are required");
    return;
  }
  let reminder = {
    date: myDate.value,
    time: myTime.value,
    title: myTitle.value
  };
  // store the reminder
  chrome.runtime.sendMessage({ type: "addReminder", reminder }, function (response) {
    console.log(response);
  });
}



