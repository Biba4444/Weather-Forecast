export const personalGeo = async () => {
  if (window.navigator.geolocation) {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        async position => {
          const { latitude, longitude } = position.coords;
          console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);

          const personalUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=a1060c908bea315aba0920d1cd09a732`;

          try {
            const response = await fetch(personalUrl);
            const data = await response.json();

            const { name } = data;
            console.log(`Location name: ${name}`);

            const urlName = `https://api.openweathermap.org/geo/1.0/direct?q=${name}&limit=1&appid=a1060c908bea315aba0920d1cd09a732`;

            console.log(`City Geo URL: ${urlName}`);
            resolve(urlName);
          } catch (error) {
            console.error(`Error fetching weather data: ${error}`);
            reject(error);
          }
        },
        err => {
          console.error(`Geolocation error: ${err.message}`);
          reject(err);
        }
      );
    });
  } else {
    console.error("Geolocation is not supported by this browser.");
    throw new Error("Geolocation is not supported by this browser.");
  }
};
