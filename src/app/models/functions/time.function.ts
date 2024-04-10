export class TimeFunctions {
  calculateTotalHours(workLogs) {
    const totalHoursPerDay = {};
    workLogs.forEach((workLog) => {
      const startTime = workLog.startTime;
      const endTime = workLog.endTime;
      const startParts = startTime.split(":");
      const endParts = endTime.split(":");
      const startMinutes = parseInt(startParts[0]) * 60 + parseInt(startParts[1]);
      const endMinutes = parseInt(endParts[0]) * 60 + parseInt(endParts[1]);
      const durationMinutes = endMinutes - startMinutes;
      const durationHours = durationMinutes / 60;
      const logDate = new Date(workLog.date).toDateString();
      if (totalHoursPerDay[logDate]) {
        totalHoursPerDay[logDate] += durationHours;
      } else {
        totalHoursPerDay[logDate] = durationHours;
      }
    });
    let output = "";
    for (const date in totalHoursPerDay) {
      const totalHours = totalHoursPerDay[date].toFixed(2); // Limit to two decimal places
      output += `${date}: ${totalHours} hours\n`;
    }
    return output;
  }
}

