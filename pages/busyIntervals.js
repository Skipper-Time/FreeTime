// those three vars are only for testing
var numberOfDays = 7;
var queryStartDate = new Date("2022-06-25T00:00:00Z")
var busySlots = [
    {
     "start": "2022-06-25T11:00:00Z",
     "end": "2022-06-25T12:50:00Z"
    },
    {
     "start": "2022-06-25T16:00:00Z",
     "end": "2022-06-25T17:50:00Z"
    },
    {
     "start": "2022-06-25T15:00:00Z",
     "end": "2022-06-25T16:50:00Z"
    },
    {
     "start": "2022-06-26T15:00:00Z",
     "end": "2022-06-26T16:50:00Z"
    },
    {
     "start": "2022-06-26T14:00:00Z",
     "end": "2022-06-26T15:50:00Z"
    },
    {
     "start": "2022-06-26T20:00:00Z",
     "end": "2022-06-26T22:10:00Z"
    },
    {
     "start": "2022-07-01T15:30:00Z",
     "end": "2022-07-01T18:50:00Z"
    },
    {
     "start": "2022-07-01T08:30:00Z",
     "end": "2022-07-01T09:50:00Z"
    },
    {
     "start": "2022-07-01T15:30:00Z",
     "end": "2022-07-01T21:50:00Z"
    },

   ];

// mergeBusy is a function to be exported to merge busy times
function mergeBusy(numberOfDays, queryStartDate, busySlots) {
  // differenceInDays to calculate days between two dates
  function differenceInDays(date1, date2) {
    // To calculate the time difference of two dates
    var Difference_In_Time = date2.getTime() - date1.getTime();
    // To calculate the no. of days between two dates
    var Difference_In_Days = Math.floor(Difference_In_Time / (1000 * 3600 * 24));
    return Difference_In_Days;
  }

  // merge an array of intervals
  // example: [[1, 3], [2,4]] => [[1, 4]]
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

  var daysOfIntervals = [];
  for (var i = 0; i < numberOfDays; i++) {
    daysOfIntervals.push([]);
  }

  for (let i = 0; i < busySlots.length; i++) {
    let curr = [];
    let currDateStart = new Date(busySlots[i].start);
    let currDateEnd = new Date(busySlots[i].end);

    curr.push(currDateStart, currDateEnd);
    let dayInDays = differenceInDays(queryStartDate, currDateStart);
    daysOfIntervals[dayInDays].push(curr);
  }

  // call merge for everyday's interval, and convert date to string format
  for (var i = 0; i < daysOfIntervals.length; i++) {
    daysOfIntervals[i] = merge(daysOfIntervals[i]);
    for (var interval of daysOfIntervals[i]) {
      interval[0] = {'start' :interval[0].toISOString()};
      interval[1] = {'end':interval[1].toISOString()};
    }

  }

  return daysOfIntervals;
}

// console.log('original', busySlots);
// console.log('after merge', mergeBusy(numberOfDays, queryStartDate, busySlots))
