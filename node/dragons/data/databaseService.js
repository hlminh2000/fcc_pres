

const dragons = JSON.parse(fs.readFileSync('./data/dragons.json', 'utf8'))


export default {
  getAllDragons : () => {
    return dragons
  }

}
