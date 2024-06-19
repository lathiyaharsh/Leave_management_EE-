export const getDaysInMonth = (year, month) => {
  return new Date(year, month + 1, 0).getDate();
};

export const leaveTypes = {
  Approved: 'bg-green-500',
  Pending: 'bg-yellow-500',
  Rejected: 'bg-red-500',
};

export const prepareLeaveData = (searchResults) => {
  const processedLeaveData = {};

  searchResults.forEach((leave) => {
    const current = new Date(leave.startDate);
    const end = new Date(leave.endDate);

    while (current <= end) {
      const dateKey = current.toISOString().split('T')[0];
      if (!processedLeaveData[dateKey]) {
        processedLeaveData[dateKey] = [];
      }
      processedLeaveData[dateKey].push(leave);
      current.setDate(current.getDate() + 1);
    }
  });

  return processedLeaveData;
};
