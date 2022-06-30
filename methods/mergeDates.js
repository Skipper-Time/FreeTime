// Arguments: startDate in string format, example: "2022-06-25T00:00:00Z"
// Arguments: busySlots is an array of objects, they can be in multiple days
// but have to be in 7 days, example:
// [
//  {
//   "start": "2022-06-25T11:00:00Z",
//   "end": "2022-06-25T12:50:00Z"
//   },
//   {
//   "start": "2022-07-01T15:30:00Z",
//   "end": "2022-07-01T19:50:00Z"
//   }
// ]
const getFreeTime = (busySlots) => {
  // busySlots will be the data we get from google API, which will show the busy
  // and free time, below is a sample data for test now and will be replaced with
  // response.calendar.busy from google API;
  var numberOfDays = 7;
  let today = new Date();
  today.setHours(0, 0, 0, 0);
  let startDate = today.toISOString();
  startDate = new Date(startDate);

  // differenceInDays to calculate days between two dates
  function differenceInDays(date1, date2) {
    // To calculate the time difference of two dates
    var Difference_In_Time = date2.getTime() - date1.getTime();
    // To calculate the no. of days between two dates
    var Difference_In_Days = Math.floor(Difference_In_Time / (1000 * 3600 * 24));
    return Difference_In_Days;
  }

  var daysOfIntervals = [];
  for (var i = 0; i < numberOfDays; i++) {
    daysOfIntervals.push([]);
  }

  for (let i = 0; i < busySlots.length; i++) {
    let curr = [];
    let currDateStart = new Date(busySlots[i].start);
    let currDateEnd = new Date(busySlots[i].end);

    curr.push(currDateStart, currDateEnd);

    let dayInDays = differenceInDays(startDate, currDateStart);

    daysOfIntervals[dayInDays].push(curr);

  }

  // function merge will merge all intervals into a result which is an array of time slots
  // with no repeat time in between
  function merge(intervals) {
    if (!intervals.length) {
      return intervals;
    }
    intervals.sort((a, b) => a[0] - b[0]);
    var prev = intervals[0];
    var res = [prev];
    for (var interval of intervals) {
      if (interval[0] <= prev[1]) {
        prev[1] = new Date(Math.max(prev[1], interval[1]));
      } else {
        res.push(interval);
        prev = interval;
      }
    }
    return res;
  }

  // console.log('original', daysOfIntervals)
  for (var i = 0; i < daysOfIntervals.length; i++) {
    // console.log(daysOfIntervals[i]);
    // var busyIntervals = merge(intervals);
    daysOfIntervals[i] = merge(daysOfIntervals[i]);
    // console.log('test', daysOfIntervals[i])
    // daysOfIntervals[i] = {'date':merge(daysOfIntervals[i])};
    for (var interval of daysOfIntervals[i]) {
    // console.log('interval', interval)

      interval[0] = interval[0].toISOString();
      interval[1] = interval[1].toISOString();
    }

  }

  function reverseDayIntervals(intervalArr) {
    // loop through the array
    // // create initial start of 8:00 AM
    // var initialStart = queryStartDate;
    // var endOfDay = startTime + hours;
    // // new Date(input)
    // var interval = [];
    if (!intervalArr.length) {
      return [];
    }

    let currentDate = new Date(intervalArr[0][0])
    let startTime = currentDate.setHours(8, 0, 0, 0);
    startTime = new Date(startTime).toISOString();
    let endTime = currentDate.setHours(22, 0, 0, 0)
    endTime = new Date(endTime).toISOString();

    var prev = startTime;
    var result = [];
    for(var i = 0; i < intervalArr.length; i++) {
      var interval = {}; // time slot for every free time
      interval.start = prev; // busy end time = free start time
      var currInterval = intervalArr[i];
      interval.end = currInterval[0]; // busy start time = free end time
      result.push(interval);
      prev = currInterval[1]; // update the prev
    }

    // prev = last busy end time;
    if (prev !== endTime) {
      result.push({start: prev, end: endTime});
    }

    return result;

  }

  let final = [];
  for (var i = 0; i < daysOfIntervals.length; i++) {
    daysOfIntervals[i] = reverseDayIntervals(daysOfIntervals[i]);

    // if the there is no freeTime in the array, push whole day as a free day
    if (!daysOfIntervals[i].length) {
      let oneDayInNumber = 24 * 3600 * 1000;
      let currentDate = new Date(startDate.valueOf() + oneDayInNumber * i);
      let startTime = currentDate.setHours(8, 0, 0, 0);
      startTime = new Date(startTime).toISOString();
      let endTime = currentDate.setHours(22, 0, 0, 0)
      endTime = new Date(endTime).toISOString();

      daysOfIntervals[i].push({start: startTime, end: endTime})
    }

    final = [...final, ...daysOfIntervals[i]];
  }

  return final;
}

// data for test only
// var busySlots = [
//   {
//   "start": "2022-06-25T11:00:00Z",
//   "end": "2022-06-25T12:50:00Z"
//   },
//   {
//   "start": "2022-06-25T16:00:00Z",
//   "end": "2022-06-25T17:50:00Z"
//   },
//   {
//   "start": "2022-06-25T15:00:00Z",
//   "end": "2022-06-25T16:50:00Z"
//   },
//   {
//   "start": "2022-06-26T15:00:00Z",
//   "end": "2022-06-26T16:50:00Z"
//   },
//   {
//   "start": "2022-06-26T14:00:00Z",
//   "end": "2022-06-26T15:50:00Z"
//   },
//   {
//   "start": "2022-06-26T17:00:00Z",
//   "end": "2022-06-26T18:10:00Z"
//   },
//   {
//   "start": "2022-07-01T15:30:00Z",
//   "end": "2022-07-01T18:50:00Z"
//   },
//   {
//   "start": "2022-07-01T08:30:00Z",
//   "end": "2022-07-01T09:50:00Z"
//   },
//   {
//   "start": "2022-07-01T15:30:00Z",
//   "end": "2022-07-01T19:50:00Z"
//   },

// ];

// var startDate = "2022-06-25T00:00:00Z"


module.exports = getFreeTime;