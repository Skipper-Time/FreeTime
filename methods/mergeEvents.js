const mergeFreeEvents = (intervals) => {
  if (!intervals.length) {
    return intervals;
  }
  intervals.sort((a, b) => a.start.dateTime.localeCompare(b.start.dateTime));
  var prev = intervals[0];
  var res = [prev];
  for (var interval of intervals) {
    if (interval.start.dateTime <= prev.end.dateTime) {
      // prev.end = Math.max(prev.end, interval.end);
      if (interval.end.dateTime > prev.end.dateTime) {
        prev.end.dateTime = interval.end.dateTime;
      }
    } else {
      res.push(interval);
      prev = interval;
    }
  }
  return res;
}

module.exports = mergeFreeEvents;