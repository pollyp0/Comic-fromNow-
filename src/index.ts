import {Comic} from '../comic';

const form = document.getElementById('form');

form?.addEventListener('submit', async (event) => {
    event.preventDefault();

    // @ts-ignore
    const formData = new FormData(form);
    const email = formData.get('email') as string;

    const comicController = new Comic(email);
    await comicController.setUp();

    const result = document.getElementById('result');
    const img = document.createElement('img');
    img.src = <string>comicController.image?.src;
    img.alt = <string>comicController.image?.alt;


    const title = document.createElement('h1');
    title.textContent = comicController.title;

    const date = document.createElement('p');
    date.textContent = comicController.date.toLocaleDateString();

    const fromNowDate = document.createElement('h3');
    const fromNow = comicController.fromNow();

    fromNowDate.innerText = `${Math.round(fromNow.years)} years ago`;


    result?.appendChild(img);
    result?.appendChild(title);
    result?.appendChild(date);
    result?.appendChild(fromNowDate);
});

