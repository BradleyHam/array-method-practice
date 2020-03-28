const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');

let data = [];

let generateRandumNumber = () => {
  return Math.floor(Math.random() * 1000000);
}

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2
})

let showUser = () => {
  let dataHTML = data.map(({ name, wealth }) => {
    let wealthFormatted = formatter.format(wealth);

    return `<div class='person'><p>${name}</p><p>${wealthFormatted}</p></div>`
  }
  ).join('')
  main.innerHTML = `<h2><strong>Person</strong> Wealth</h2>` + dataHTML
  console.log(data)
}

let addUser = () => {
  let getUser = async () => {
    let data = await fetch("https://randomuser.me/api");
    let person = await data.json();
    return person
  }
  getUser().then(({ results: [{ name: { title, first, last } }] }) => {
    let user =
      {
        name: `${title} ${first} ${last}`,
        wealth: `${generateRandumNumber()}`
      }
    data.push(user);
    showUser()
  })
}

let doubleMoney = () => {
  data = data.map(user => {
    return {
      ...user, wealth: user.wealth * 2
    }
  })
  showUser()
}

let showMillionaires = () => {
  data = data.filter(user =>
    +user.wealth > 1000000
  )
  showUser()
}
let sortByRichest = () => {
  data.sort((a, b) =>
    b.wealth - a.wealth
  )
  showUser()
}


addUserBtn.addEventListener('click', () => {
  addUser()
})
doubleBtn.addEventListener('click', () => {
  doubleMoney()
})
showMillionairesBtn.addEventListener('click', () => {
  showMillionaires()
})
sortBtn.addEventListener('click', () => {
  sortByRichest()
})