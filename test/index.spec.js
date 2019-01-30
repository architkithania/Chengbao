/**
 * A unit testing application that tests the different functions implemented in the WeatherAPI file. It tries to segregate the
 * different functions as much as possible so that the results of the tests can give an accurate representation of the individual
 * functions.
 *
 * Known Issues: Since the WeatherAPI implementation makes use of ES7 Promises, it may not be natively supported on all platforms.
 *               The code can easily be transpiled to ES5 through the use of transpilers such as BabelJS.
 * @author architkithania
 * @version 1.0.0
 * @
 */
import chai from "chai";
import fs from "fs";
import {
  createWeatherOptions,
  getWeatherJson,
  postWeatherJson,
  homeCity
} from "../src/WeatherAPI";

// Initial Setup of ChaiJS
const assert = chai.assert;

describe("Unit Testing API dependencies", () => {
  /**
   * Tests each API differently, for the sake of simplicity, only one API is queried and heavily tested for this application.
   */
  describe("Testing the Weather API", () => {
    /** knownOptions holds the value of a correct, known entity */
    const knownOptions = JSON.parse(fs.readFileSync("test/cases/case_1.json"));

    /**
     * Tests the createWeatherOptions() function. Expects the returned objects to pass type and value assertions.
     * CASE 1: test/cases/case_1.json
     */
    describe("createWeatherOptions()", () => {
      const city = "Hong Kong";
      const option = createWeatherOptions(city);

      /** Expects the 'options' object to be of type object */
      it("should return value of type object", () => {
        assert.isObject(option, true);
      });

      /**
       * Expects the value of returned object of the function to equal a correct known options. Strings are used in order to ignore
       * whitespace misassertions.
       */
      it("should equal case_1.json", () => {
        assert.equal(JSON.stringify(option), JSON.stringify(knownOptions));
      });
    });

    /**
     * Tests the different protocals, namely GET and POST, that could be used to query an API.
     * These series of tests assume that a correct 'options' paraemter has been passed into the function at question.
     */
    describe("Testing API Response", () => {
      /**
       * Tests the GET protocol of the API.
       * CASE 2: test/cases/case_2.json
       */
      describe("Check GET", () => {
        /** Expects the response to be of type object */
        it("should return value of type object", () => {
          let getResponse;
          getWeatherJson(knownOptions)
            .then(result => {
              getResponse = JSON.parse(result);
              return result;
            })
            .then(result => {
              assert.isObject(getResponse, true);
            })
            .catch(error => new Error(error));
        });

        /** Expects the response to equal pre-acquired correct query */
        it("should equal case_2.json", () => {
          let knownGetResponse;
          let getResponse;
          getWeatherJson(knownOptions)
            .then(result => {
              getResponse = JSON.parse(result);
              return result;
            })
            .then(result => {
              knownGetJsonResponse = fs.readFileSync("test/cases/case_2.json");
              return result;
            })
            .then(() => {
              assert.equal(
                JSON.stringify(getResponse),
                JSON.stringify(knownGetResponse)
              );
            })
            .catch(error => new Error(error));
        });
      });
      /**
       * Tests the POST protocol of the API.
       * CASE 3: test/cases/case_3.json
       */
      describe("Check POST", () => {
        /** Expects the response to be of type object */
        it("should return value of type object", () => {
          let getResponse;
          getWeatherJson(knownOptions)
            .then(result => {
              getResponse = JSON.parse(result);
              return result;
            })
            .then(result => {
              assert.isObject(getResponse, true);
            })
            .catch(error => new Error(error));
        });

        /** Expects the response to equal pre-acquired correct query */
        it("should equal case_3.json", () => {
          let knownPostResponse;
          let postResponse;
          postWeatherJson(knownOptions)
            .then(result => {
              postResponse = JSON.parse(result);
              return result;
            })
            .then(result => {
              knownPostResponse = fs.readFileSync("test/cases/case_2.json");
              return result;
            })
            .then(() => {
              assert.strictEqual(
                JSON.stringify(postResponse),
                JSON.stringify(knownPostResponse)
              );
            })
            .catch(error => new Error(error));
        });
      });
    });

    /**
     * Demonstrates the robustness and reliabelty of the application by implementing a HTTP 404 Requests handler.
     * The handler is currently implemented to return a predefined 'Home City' in the case of an invalid request, but the
     * functionality can be easily changed to suit other needs.
     */
    describe("Handling HTTP 404 Requests", () => {
      /** An object containing a fake city, forcing the API to throw a HTTP 404 status */
      const fakeCity = {
        url: "http://api.openweathermap.org/data/2.5/weather",
        qs: {
          appid: "c717ae1544c1d0702c38e428b0c7075e",
          q: "Fake City"
        }
      };

      /**
       * Parses the 'options' and listens for an HTTP Error 404.
       * In the case of an Error 404, recalls the API with a fallback 'options' object
       */
      it("should handle queries resulting in ERROR 404", () => {
        let getResponse;
        getWeatherJson(fakeCity)
          .then(result => {
            if (result === 404) {
              getWeatherJson(homeCity)
                .then(result => {
                  getResponse = JSON.parse(result);
                })
                .catch(error => new Error(error));
            } else {
              getResponse = JSON.parse(result);
              return result;
            }
          })
          .then(result => {
            assert.equal(getResponse.name, homeCity.qs.q);
          })
          .catch(error => new Error(error));
      });
    });
  });
});
