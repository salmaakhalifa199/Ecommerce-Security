function datePassed(dateString) {
  console.log(dateString);
  const [month, year] = dateString.split('/');

  const currentDate = new Date();
  const currentYear = Number(currentDate.getFullYear().toString().slice(2));;
  const currentMonth = currentDate.getMonth() + 1;
  // console.log("current month", currentMonth);
  if (Number(year) < currentYear || (Number(year) === currentYear && Number(month) < currentMonth)) {
    return true;
  } else {
    return false;
  }
}

module.exports = datePassed;