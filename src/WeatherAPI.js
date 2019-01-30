/**
 * An implementation of a query app for an actual API using the OpenWeatherMap weather API.
 * More information of the API can be found at https://openweathermap.org/api
 *
 * @author architkithania
 * @version 1.0.0
 */
import request from 'request';

/**
 * Returns a JSON object represeting a particular city that can be used as a 'Plug and Play'
 * solution for undertaking the GET and POST protocal for the OpenWeatherMap API
 *
 * @param {string} city
 */
export function createWeatherOptions(city) {
  return {
    url: 'http://api.openweathermap.org/data/2.5/weather',
    qs: {
      q: city, // City
      appid: 'c717ae1544c1d0702c38e428b0c7075e' // Authentication
    }
  };
}

/**
 * A simple POST protocal that takes a city options JSON as its parameter and simply returns
 * a JSON response from the OpenWeatherMap API. Use of this function encapsulates the request
 * module, making the user only deal with POST protocal.
 * Note: Funtion returns a Promise which is considered fullfilled if a proper API query could
 *       be made.
 *
 * Returns and Prints 'ERROR 404: Page Not Found' in case of mismatched query strings.
 *
 * @param {JSON Object} options
 */
export function postWeatherJson(options) {
  return new Promise((resolve, reject) => {
    request.post(options, (err, res, body) => {
      if (err) {
        reject(new Error().message(err));
      }
      else {
        if (res.statusCode == 404) {
          console.log('ERROR 404: Page Not Found');
        } else {
          resolve(body);
        }
      }
    });
  });
}

/**
 * A simple GET protocal that takes a city options JSON as its parameter and simply returns
 * a JSON response from the OpenWeatherMap API. Use of this function encapsulates the request
 * module, making the user only deal with GET protocal.
 * Note: Funtion returns a Promise which is considered fullfilled if a proper API query could
 *       be made.
 * 
 * Returns and Prints 'ERROR 404: Page Not Found' in case of mismatched query strings.
 *
 * @param {JSON Object} options
 */
export function getWeatherJson(options) {
  return new Promise((resolve, reject) => {
    request.get(options, (err, res, body) => {
      if (err) {
        reject(new Error().message(err));
      }
      else {
        if (res.statusCode == 404) {
          resolve(404);
        } else {
          resolve(body);
        }
      }
    });
  });
}

export const homeCity = createWeatherOptions()