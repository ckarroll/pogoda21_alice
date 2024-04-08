import axios from "axios"
import * as cheerio from "cheerio"
const { Alice } = require('yandex-dialogs-sdk')
const alice = new Alice();

async function get_weather(){
  const url = "https://pogoda21.ru/"
  const response = await axios.get(url)
  const selector = cheerio.load(response.data)
  return selector('span:contains("ощущениям") > span').text()
}

alice.command('', async ctx => {
  return {
    text: 'Температура по ощущениям ' + await get_weather(),
    end_session: true
  }
});

module.exports.handler = async req => {
  // Из запроса извлекаются свойства request, session и version.

  // Обработчики пойдут наверх искать подходящую команду
  // И составлять ответ на её основе.
  return await alice.handleRequest(req);
};