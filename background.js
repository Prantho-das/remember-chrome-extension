chrome.runtime.onInstalled.addListener(() => {
  console.log("onInstalled...");
  chrome.alarms.create("remind_me", { periodInMinutes: 1 });
});

chrome.alarms.onAlarm.addListener(async (alarm) => {
  console.log("wwwww...");

  await chrome.notifications.create(
    {
      type: "basic",
      iconUrl: "daily_task.png",
      title: "notification title",
      message: "notification message",
      silent: false,
    },
    function (notificationId) {
      if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError);
      } else {
        console.log("Notification created with ID: " + notificationId);
      }
    }
  );
  console.log("ooooooo...");
});
