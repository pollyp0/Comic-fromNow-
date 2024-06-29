// @ts-ignore
import moment from "moment";

const API = "https://fwd.innopolis.university/api"

interface DefaultComic {
    id : number;
    email: string;
    image: Image | null;
    date : Date;
    title: string | null;
}

type ComicData = {
    alt: string
    day: number
    img: string
    link: string
    month: string
    news: string
    num: number
    safe_title: string
    title: string
    transcript: string
    year: number
};


class Image {
    src: string;
    alt: string;

    constructor(src: string, alt: string) {
        this.src = src;
        this.alt = alt;
    }
}

class FromNow {
    years : number;
    days : number;
    hours : number;
    minutes : number;
    seconds : number;

    constructor(milliseconds : number) {
        this.seconds = milliseconds / 1000;
        this.minutes = this.seconds / 60;
        this.hours = this.minutes / 60;
        this.days = this.hours / 24;
        this.years = this.days / 365;
    }
}


export class Comic implements DefaultComic{
    email: string;
    id: number = NaN;
    title: string | null = null;
    date: Date = new Date();
    image: Image | null = null;


    constructor(email: string) {
        this.email = email;

    }

    async setUp() {
        await this.searchId();
        await this.getComicData();
    }

    private async searchId() {
        const response = await fetch(`${API}/hw2?email=${this.email}`)

        this.id = await response.json();
    }

    private async getComicData() {
        const comicResponse = await fetch(`${API}/comic?id=${this.id}`);
        const comicData: ComicData = await comicResponse.json();

        this.title = comicData.title.split("<")[0];
        this.image = new Image(comicData.img, comicData.alt);

        this.date = new Date(comicData.day);
        console.log(moment() - moment(this.date))
    }

    fromNow() : FromNow {
        return new FromNow(moment() - moment(this.date));
    }

}