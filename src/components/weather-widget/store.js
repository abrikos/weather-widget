import axios from "axios";

class Store {
    cities = [];
    error = '';

    constructor() {
        this.init();
    }

    async init() {
        try {
            this.cities = JSON.parse(localStorage.cities).filter(c => !!c.name)
        } catch (e) {
            console.log(e)
        }
        if (!this.cities.length) {
            console.log('load default city')
            this.cities = [];
            const d1 = await this.getMyCity();
            await this.addCity(d1.city)
        }
    }

    async get(url) {
        try {
            const res = await axios.get(url);
            return res.data;
        } catch (error) {
            console.log(error)
        }

    }

    async getWeather(city) {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=b8475c6ee4917ca1020cbca524988ee6`
        return this.get(url)
    }

    async getMyCity() {
        const url = 'https://extreme-ip-lookup.com/json/';
        return this.get(url)
    }

    async addCity(city) {
        const weather = await this.getWeather(city);
        if (!weather) {
            return {error: 'Wrong city: ' + city}
        }
        this.cities.push(weather)
        this.saveStorage(weather)
        return {ok: 200}
    }

    async deleteCity(city) {
        this.cities.splice(this.cities.map(c => c.name).indexOf(city.name), 1)
        console.log('del', this.cities)
        this.saveStorage()
    }

    async deleteAll() {
        this.cities.splice(0)
        this.saveStorage()
    }

    saveStorage() {
        localStorage.cities = JSON.stringify(this.cities)
    }
}

export default new Store()