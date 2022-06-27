// busySlots will be the data we get from google API, which will show the busy
// and free time, below is a sample data for test now and will be replaced with
// response.calendar.busy from google API;
var busySlots = [
  {
   "start": "2022-06-25T11:00:00Z",
   "end": "2022-06-25T12:50:00Z"
  },
  {
   "start": "2022-06-25T15:00:00Z",
   "end": "2022-06-25T16:50:00Z"
  },
  {
   "start": "2022-06-25T15:30:00Z",
   "end": "2022-06-25T18:50:00Z"
  }
 ];

// intervals is an array of time slots in the format of numbers,
// and is basically the 'algorithmible' version of busySlots.
// example: intervals = [[11, 13], [15, 17], [15.5, 19]] based on the test data above
// below is how we can define an empty intervals and put busySlots data in it with
// the accuracy of 30 minutes.
var intervals = [];

for (let i = 0; i < busySlots.length; i++) {
let curr = [];
console.log(busySlots[i]);
let currStartHour = Number(busySlots[i].start.slice(11, 13));
let currEndHour = Number(busySlots[i].end.slice(11, 13));
let currStartMinute = Number(busySlots[i].start.slice(14, 16));
let currEndMinute = Number(busySlots[i].end.slice(14, 16));

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

intervals.push(curr);
}

// function merge will merge all intervals into a busyIntervals which is an array of
// time slots with no repeat time in between, so the result we want to get from the
// sample data will be [[11, 13], [15, 19]]
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

var busyIntervals = merge(intervals);
//console.log(busyIntervals);
// now it depends on how we want to display this data in the front end,
// because showing busy time or free time is logic same.