chrome.runtime.onInstalled.addListener(() => {
  chrome.alarms.create("remind_me", { periodInMinutes: 1 });
});
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log(request)
  if (request.type === "addReminder") {
    addReminder(request.reminder.title, request.reminder.date, request.reminder.time);
    sendResponse({ message: "Reminder added" });
  }
});
chrome.alarms.onAlarm.addListener(async (alarm) => {
  console.log(alarm)
  if (alarm.name === "remind_me") {
    let reminderList = await getReminders();
    const now = new Date();
    reminderList.forEach((reminder) => {
      const reminderDate = new Date(reminder.date + " " + reminder.time);
      if (reminderDate <= now) {
        sendNotification(reminder.title, reminder.date, reminder.time);
      }
    });
  }
});

const getReminders = async () => {
  let reminderList = [];
  chrome.storage.local.get(["reminderList"], function (result) {
    reminderList = result.reminderList;
  });
  return reminderList;
};

const addReminder = async (title, date, time) => {
  const reminder = {
    title: title,
    date: date,
    time: time,
  };
  let reminderList = await getReminders();
  reminderList.push(reminder);
  chrome.storage.local.set({ reminderList }, function () {
    console.log("Reminder added");
  });
};
const sendNotification = async (title, date, time) => {
  await chrome.notifications.create(
    {
      type: "basic",
      iconUrl: "daily_task.png",
      title: title,
      message: "It's time to do your daily task!" + date + " " + time,
    },
    function (notificationId) {
      if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError);
      } else {
        console.log("Notification created with ID: " + notificationId);
      }
    }
  );
}