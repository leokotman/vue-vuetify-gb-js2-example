const DEFAULT_URL = 'http://localhost/Api/v2';

export class HolidaysService {
  constructor(url = DEFAULT_URL) {
    this.url = url;
  }
  
  async allHolidaysByCountry(countryCode = 'RU', year = new Date().getFullYear()) {
    const result = await fetch(`${this.url}/PublicHolidays/${year}/${countryCode}`);
    return await result.json();
  }

  async isTodayHoliday(countryCode = 'RU') {
    const result = await fetch(`${this.url}/IsTodayPublicHoliday/${countryCode}`);
    return result.status === 200;
  }

  // async nextHolidaysByCountry(countryCode = 'RU') {}
}
