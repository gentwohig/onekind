// inject extra function into nuxt context
import Swal from 'sweetalert2'
// logic for calculating color, badge according to user points
function colorNLevel(points) {
  const obj = {
    "bronze": { color: '#CD7F32', badge: 'bronze'}, 
    "silver": {color: '#C0C0C0', badge: 'silver' },
    "gold": {color: '#DAA520', badge: 'gold'},
    "platinum": {color: '#E5E4E2', badge: 'platinum'}
  }
  if (points < 200) return {...obj.bronze, points}
  if (points < 300) return {...obj.silver, points}
  if (points < 400) return {...obj.gold, points}
  return {...obj.platinum, points}
}

export default function ({}, inject) {
  inject('Swal', Swal)
  inject('colorNLevel', colorNLevel)
}
