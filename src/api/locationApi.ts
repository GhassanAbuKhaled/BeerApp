import axios from 'axios';

const baseURL = 'https://api.openweathermap.org/data/2.5';
const apiKey = process.env.VUE_APP_OPEN_WEATHER_API_KEY


const locationApi = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const fetchLocationDetails = async (latitude: number, longitude: number) => {
    try {
        console.log(apiKey);
        const response = await locationApi.get(`${baseURL}/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching location data:', error);
        throw error;
    }
};

export default locationApi;
// const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
