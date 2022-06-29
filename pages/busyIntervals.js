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


function merge(intervals) {
if (!intervals.length) {
  return intervals;
}
intervals.sort((a, b) => a.start.localeCompare(b.start));
var prev = intervals[0];
var res = [prev];
for (var interval of intervals) {
  if (interval.start <= prev.end) {
    // prev.end = Math.max(prev.end, interval.end);
    if (interval.end > prev.end) {
      prev.end = interval.end;
    }
  } else {
    res.push(interval);
    prev = interval;
  }
}
return res;
}

console.log('original', busySlots);
console.log('after merge', merge(busySlots));
