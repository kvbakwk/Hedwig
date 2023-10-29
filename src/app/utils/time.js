export default function timeAgo(time) {
  switch (typeof time) {
    case "number":
      break;
    case "string":
      time = +new Date(time);
      break;
    case "object":
      if (time.constructor === Date) time = time.getTime();
      break;
    default:
      time = +new Date();
  }

  const time_formats = [
    [60, "sekund", 1], // 60
    [120, "minutę temu", "za minutę"], // 60*2
    [3600, "minut", 60], // 60*60, 60
    [7200, "godzinę temu", "za godzinę"], // 60*60*2
    [86400, "godzin", 3600], // 60*60*24, 60*60
    [172800, "wczoraj", "jutro"], // 60*60*24*2
    [604800, "dni", 86400], // 60*60*24*7, 60*60*24
    [1209600, "tydzień temu", "za tydzień"], // 60*60*24*7*4*2
    [2419200, "tygodni", 604800], // 60*60*24*7*4, 60*60*24*7
    [4838400, "miesiąc temu", "za miesiąc"], // 60*60*24*7*4*2
    [29030400, "miesięcy", 2419200], // 60*60*24*7*4*12, 60*60*24*7*4
    [58060800, "rok temu", "za rok"], // 60*60*24*7*4*12*2
    [2903040000, "lat", 29030400], // 60*60*24*7*4*12*100, 60*60*24*7*4*12
    [5806080000, "wiek temu", "za wiek"], // 60*60*24*7*4*12*100*2
    [58060800000, "wieków", 2903040000], // 60*60*24*7*4*12*100*20, 60*60*24*7*4*12*100
  ];

  let seconds = (+new Date() - time) / 1000,
    token = "temu",
    list_choice = 1,
    i = 0,
    format;

  if (seconds == 0) return "teraz";
  if (seconds < 0) {
    seconds = Math.abs(seconds);
    token = "od teraz";
    list_choice = 2;
  }

  while ((format = time_formats[i++]))
    if (seconds < format[0]) {
      if (typeof format[2] == "string") return format[list_choice];
      else
        return Math.floor(seconds / format[2]) + " " + format[1] + " " + token;
    }
    
  return time;
}
