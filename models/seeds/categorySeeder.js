const Category = require('../category')
const db = require('../../config/mongoose')

const categoryList = [
  {
    name: '生活',
    icon: '<i class="fas fa-home"></i>'
  },
  {
    name: '交通',
    icon: '<i class="fas fa-shuttle-van"></i>'
  },
  {
    name: '娛樂',
    icon: '<i class="fas fa-grin-beam"></i>'
  },
  {
    name: '飲食',
    icon: '<i class="fas fa-utensils"></i>'
  },
  {
    name: '其他',
    icon: '<i class="fas fa-pen"></i>'
  }
]

db.once('open', () => {
  console.log('mongodb connected!')
  categoryList.forEach(category => Category.create(category))
  console.log('done')
})