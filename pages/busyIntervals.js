// busySlots will be the data we get from google API, which will show the busy
// and free time, below is a sample data for test now and will be replaced with
// response.calendar.busy from google API;
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

// differenceInDays to calculate days between two dates
function differenceInDays(date1, date2) {
  // To calculate the time difference of two dates
  var Difference_In_Time = date2.getTime() - date1.getTime();
  // To calculate the no. of days between two dates
  var Difference_In_Days = Math.floor(Difference_In_Time / (1000 * 3600 * 24));
  return Difference_In_Days;
}

// intervals is an array of time slots in the format of numbers,
// and is basically the 'algorithmible' version of busySlots.
// example: intervals = [[11, 13], [15, 17], [15.5, 19]] based on the test data above
// below is how we can define an empty intervals and put busySlots data in it with
// the accuracy of 30 minutes.
// var daysOfIntervals = new Array(numberOfDays).fill([]);
var daysOfIntervals = [];
for (var i = 0; i < numberOfDays; i++) {
  daysOfIntervals.push([]);
}
// console.log(daysOfIntervals);

for (let i = 0; i < busySlots.length; i++) {
  let curr = [];
  let currDateStart = new Date(busySlots[i].start);
  let currDateEnd = new Date(busySlots[i].end);
  // console.log(busySlots[i]);
  // console.log("test", currDate);
  let currStartHour = currDateStart.getHours();
  let currEndHour = currDateEnd.getHours();
  let currStartMinute = currDateStart.getMinutes();
  let currEndMinute = currDateEnd.getMinutes();

  if (currStartMinute > 30) {
    currStartHour += 1;
  } else if (currStartMinute > 0) {
    currStartHour += 0.5;
  }
  if (currEndMinute > 30) {
    currEndHour += 1;
  } else if (currEndMinute > 0) {
    currEndHour += 0.5;
  }

  curr.push(currStartHour, currEndHour);

  let dayInDays = differenceInDays(queryStartDate, currDateStart);
  // console.log(dayInDays)
  // console.log(daysOfIntervals)

  // daysOfIntervals[dayInDays].push(1);
  daysOfIntervals[dayInDays].push(curr);
  // console.log(daysOfIntervals)

}

// function merge will merge all intervals into a result which is an array of time slots
// with no repeat time in between, so the result we want to get from the sample data will
// be [[11, 13], [15, 19]]
function merge(intervals) {
  if (!intervals.length) {
    return intervals;
  }
  intervals.sort((a, b) => a[0] - b[0]);
  var prev = intervals[0];
  var res = [prev];
  for (var interval of intervals) {
    if (interval[0] <= prev[1]) {
      prev[1] = Math.max(prev[1], interval[1]);
    } else {
      res.push(interval);
      prev = interval;
    }
  }
  return res;
}

console.log('original', daysOfIntervals)
for (var i = 0; i < daysOfIntervals.length; i++) {
  // console.log(daysOfIntervals[i]);
  // var busyIntervals = merge(intervals);
  daysOfIntervals[i] = merge(daysOfIntervals[i]);
  // daysOfIntervals[i] = {'date':merge(daysOfIntervals[i])};

}
console.log('after merge', daysOfIntervals);
// [[[8, 10],[12, 13]], [[8, 10],[],[]], [[][][]]...]
// console.log(daysOfIntervals);
// now it depends on how we want to display this data in the front end,
// because showing busy time or free time is logic same.
