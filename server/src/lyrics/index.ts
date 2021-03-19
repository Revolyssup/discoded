const nodefetch = require('node-fetch');
const   cheerio = require('cheerio');

async function scrape(song:string) {
    const modifiedSong = song.replace(' ', '+');
    try {
        const url = await nodefetch(`https://www.google.com/search?q=${modifiedSong}+lyrics&oq=${modifiedSong}+lyrics&aqs=chrome..69i57.40676j0j1&sourceid=chrome&ie=UTF-8`, {
            "headers": {
              "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
              "accept-language": "en-IN,en;q=0.9",
              "cache-control": "max-age=0",
              "sec-ch-ua": "\"Google Chrome\";v=\"89\", \"Chromium\";v=\"89\", \";Not A Brand\";v=\"99\"",
              "sec-ch-ua-mobile": "?0",
              "sec-fetch-dest": "document",
              "sec-fetch-mode": "navigate",
              "sec-fetch-site": "same-origin",
              "sec-fetch-user": "?1",
              "upgrade-insecure-requests": "1",
            },
            "referrerPolicy": "strict-origin-when-cross-origin",
            "body": null,
            "method": "GET",
            "mode": "cors"
          });
        
         return await url.text()
    } catch (error) {
        console.error(error)
    }
}

export async function getLyrics(song:string) {
    try {
        const html = await scrape(song);
        return cheerio.load(html)('.BNeawe.tAd8D.AP7Wnd').text();
    } catch (error) {
        console.error(error)
    }
}
