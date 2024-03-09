export class CustomDate {
  constructor() { }
  public dateToday: any = this.getDateToday()

  getDateToday() {
    const year = new Date().getFullYear()
    const date = new Date().getDate()
    let month = new Date().getMonth() + 1;
    let value = ""
    if (month < 10) {
      value = year + "-0" + month + "-" + date
    }
    else {
      value = year + "-" + month + "-" + date
    }
    return value
  }
  getWeekBackDate() {
    var date = new Date();
    var last = new Date(date.getTime() - (7 * 24 * 60 * 60 * 1000));
    return last
  }
  getLastMonthDate() {
    var date = new Date();
    var last = new Date(date.getTime() - (30 * 24 * 60 * 60 * 1000));
    return last
  }
  getLastYearDate() {
    var date = new Date();
    var last = new Date(date.getTime() - (365 * 24 * 60 * 60 * 1000));
    return last
  }
  getThisYear(){
    return new Date().getFullYear() + "-01" + "-01"
  }
  getThisMonth(){
    const year = new Date().getFullYear()
    let month = new Date().getMonth() + 1;
    let value = ""
    if (month < 10) {
      value = year + "-0" + month + "-01"
    }
    else {
      value = year + "-" + month + "-01"
    }
    return value
  }
  getCurrentMonth(){
    const year = new Date().getFullYear()
    let month = new Date().getMonth() + 1;
    let value = ""
    if (month < 10) {
      value = year + "-0" + month;
    }
    else {
      value = year + "-" + month;
    }
    return value
  }

  getDateTomorrow(){
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dd = String(tomorrow.getDate()).padStart(2, "0");
    const mm = String(tomorrow.getMonth() + 1).padStart(2, "0");
    const yyyy = tomorrow.getFullYear();
    const tomorrowDate = `${yyyy}-${mm}-${dd}`;
    return tomorrowDate;
  }

}
