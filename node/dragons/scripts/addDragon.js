const prompt = require('prompt')
const fs = require('fs')

const DRAGON_DATA_SOURCE = './data/dragons.json'

const dragons = JSON.parse(fs.readFileSync(DRAGON_DATA_SOURCE, 'utf8'))

prompt.start();

prompt.get(['name', 'age', 'height', 'canFly(Y/N)'], function (err, result) {
  if (err) { return onErr(err); }
  const newDragon = {
    name: result.name,
    age: result.age * 1,
    height: result.height * 1,
    canFly: result['canFly(Y/N)'] == "y" || result['canFly(Y/N)'] == "Y"
  }
  dragons.push(newDragon);
  fs.writeFileSync(DRAGON_DATA_SOURCE, JSON.stringify(dragons, null, 2), 'utf8');

  console.log("Added new dragon: ");
  console.log(JSON.stringify(newDragon, null, 2));
});

function onErr(err) {
  console.log(err);
  return 1;
}
