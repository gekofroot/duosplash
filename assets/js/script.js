
// variables
let menu = document.getElementById('menu')
let menuDivA = document.getElementById('menu-div-a')
let menuDivB = document.getElementById('menu-div-b')
let menuDivC = document.getElementById('menu-div-c')
let menuPanel = document.getElementById('menu-panel')
let highScoreDisplay = document.getElementById('high-score-display')
let mainArea = document.getElementById('main-area')
let mainAreaInputA = document.getElementById('main-area-input-a')
let mainAreaInputB = document.getElementById('main-area-input-b')
let mainAreaInputC = document.getElementById('main-area-input-c')
let mainAreaInputD = document.getElementById('main-area-input-d')
let mainAreaWell = document.getElementById('main-area-well')
let wellShader = document.getElementById('well-shader')
let rotator = document.getElementById('rotator')
let pointsDisplay = document.getElementById('points-display')

let rotationDegree = 0
let rotationDegreeB = 0
let rotatorPrime = 0
let flowSpeed = 200
let wellFlowInterval = ''
let baseColors = [
  '#ff0000', '#ff8000', '#ffff00', 
  '#80ff00', '#00ff00', '#00ff88', 
  '#00ffff', '#0080ff', '#0000ff', 
  '#8000ff', '#ff00ff', '#ff0080'
]
let mainAreaInputs = [
  mainAreaInputA, mainAreaInputB,
  mainAreaInputC, mainAreaInputD
]
let points = 0
let highScore = 0



// stored values
let storedPoints = localStorage.getItem('stored-points')
if (storedPoints) {
  points = Number(storedPoints)
  pointsDisplay.style.innerHTML = `${points}`
}

let storedHighScore = localStorage.getItem('stored-high-score')
if (storedHighScore) {
  highScore = Number(storedHighScore)
  highScoreDisplay.style.innerHTML = `${highScore}`
}

let storedFlowSpeed = localStorage.getItem('stored-flow-speed')
if (storedFlowSpeed) {
  flowSpeed = Number(storedFlowSpeed)
}


// generate integer
function randomBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function fillAreaInputs(colorArray) {
  let randomMax = baseColors.length - 1
  let selectedColors = []

  // generate selection values
  areaInputValueMid = baseColors[randomBetween(0, randomMax)]
  selectedColors.push(areaInputValueMid)
  areaInputValueA = baseColors[randomBetween(0, randomMax)]
  if (selectedColors.includes(areaInputValueA)) {
    while (selectedColors.includes(areaInputValueA)) {
      areaInputValueA = baseColors[randomBetween(0, randomMax)]
    }
  }
  selectedColors.push(areaInputValueA)
  areaInputValueB = baseColors[randomBetween(0, randomMax)]
  if (selectedColors.includes(areaInputValueB)) {
    while (selectedColors.includes(areaInputValueB)) {
      areaInputValueB = baseColors[randomBetween(0, randomMax)]
    }
  }
  selectedColors.push(areaInputValueB)
  areaInputValueC = baseColors[randomBetween(0, randomMax)]
  if (selectedColors.includes(areaInputValueC)) {
    while (selectedColors.includes(areaInputValueC)) {
      areaInputValueC = baseColors[randomBetween(0, randomMax)]
    }
  }
  selectedColors.push(areaInputValueC)
  areaInputValueD = baseColors[randomBetween(0, randomMax)]
  if (selectedColors.includes(areaInputValueD)) {
    while (selectedColors.includes(areaInputValueD)) {
      areaInputValueD = baseColors[randomBetween(0, randomMax)]
    }
  }
  selectedColors.push(areaInputValueD)

  // apply selection values
  mainAreaInputA.style.background = `${selectedColors[1]}`
  mainAreaInputA.style.border = `.2em outset ${selectedColors[1]}`
  mainAreaInputA.style.boxShadow = `-.1em -.1em .5em ${selectedColors[1]}, inset -.1em -.1em 1em var(--acnt-f)`
  mainAreaInputB.style.background = `${selectedColors[2]}`
  mainAreaInputB.style.border = `.2em outset ${selectedColors[2]}`
  mainAreaInputB.style.boxShadow = `-.1em -.1em .5em ${selectedColors[2]}, inset -.1em -.1em 1em var(--acnt-f)`
  mainAreaInputC.style.background = `${selectedColors[3]}`
  mainAreaInputC.style.border = `.2em outset ${selectedColors[3]}`
  mainAreaInputC.style.boxShadow = `-.1em -.1em .5em ${selectedColors[3]}, inset -.1em -.1em 1em var(--acnt-f)`
  mainAreaInputD.style.background = `${selectedColors[4]}`
  mainAreaInputD.style.border = `.2em outset ${selectedColors[4]}`
  mainAreaInputD.style.boxShadow = `-.1em -.1em .5em ${selectedColors[4]}, inset -.1em -.1em 1em var(--acnt-f)`
}

// fill rotator match color
function fillRotator(colorArray) {
  let randomMax = baseColors.length - 1

  // generate rotator value
  rotatorInputValue = baseColors[randomBetween(0, randomMax)]

  // apply rotator value
  rotator.style.background = `${rotatorInputValue}`
  rotator.style.border = `.4em outset ${rotatorInputValue}`
  rotator.style.boxShadow = `-.1em -.1em .5em ${rotatorInputValue}, inset -.1em -.1em 1em var(--acnt-f)`
}

rotator.addEventListener('click', () => {

  if (rotatorPrime === 0) {

    // prime rotator
    wellShader.style.height = '0'
    fillRotator()
    rotatorPrime = 1
  } else if (rotatorPrime === 1) {
    
    // rotator primed
    // fill rotator & area inputs
    clearInterval(wellFlowInterval)
    wellShader.style.opacity = '100'
    areaWellFlow(flowSpeed)
    flowSpeed -= 1
    localStorage.setItem('stored-flow-speed', flowSpeed)
    fillAreaInputs()

    // rotate main field
    let rotateBy = 90
    rotationDegree = rotationDegree += rotateBy
    mainArea.style.transform = `rotate(${rotationDegree}deg)`

    rotationDegreeB = rotationDegreeB += rotateBy
    mainAreaWell.style.transform = `rotate(-${rotationDegreeB}deg)`
  }
})

let menuToggle = 0
menu.addEventListener('click', () => {
  if (menuToggle === 0) {

    // menu anim
    menuDivA.style.opacity = 0
    menuDivA.style.width = 0
    menuDivC.style.opacity = 0
    menuDivC.style.width = 0
    setTimeout(() => {
      menuDivA.style.display = 'none'
      menuDivC.style.display = 'none'
      menuDivB.style.height = '60%'
      menuDivB.style.border = '2px solid var(--bd)'
    }, 200)

    // display menu panel
    menuPanel.style.display = 'grid'
    let count = 0
    menuPanelInterval = setInterval(() => {
      if (count > 100) {
	clearInterval(menuPanelInterval)
      } else {
	menuPanel.style.opacity = 100
	menuPanel.style.height = `${count}%`
	count += 1
      }
    }, 2)
    setTimeout(() => {
      for (let x of menuPanel.children) {
	x.style.opacity = 100
      }
    }, 700)
    menuToggle = 1
  } else if (menuToggle === 1) {

    // menu anim
    menuDivB.style.opacity = '0'
    menuDivB.style.width = '50%'
    menuDivB.style.height = '.2em'
    setTimeout(() => {
      menuDivA.style.display = 'flex'
      menuDivC.style.display = 'flex'
    }, 100)
    setTimeout(() => {
      menuDivA.style.opacity = 100
      menuDivA.style.width = '30%'
      menuDivC.style.opacity = 100
      menuDivC.style.width = '30%'
      menuDivB.style.opacity = 100
      menuDivB.style.width = '60%'
      menuDivB.style.border = '2px solid var(--acnt-c)'
    }, 200)
    menuToggle = 0

    // fade menu panel
    let count = 100
    menuPanelIntervalB = setInterval(() => {
      if (count < 0) {
	menuPanel.style.opacity = 0
	setTimeout(() => {
	  menuPanel.style.display = 'none'
	}, 300) 
	clearInterval(menuPanelIntervalB)
      } else {
	menuPanel.style.height = `${count}%`
	count -= 2
      }
    }, 2)
  }
})

// main area engaged
mainArea.addEventListener('click', () => {
  let eventTarget = event.target
  if (eventTarget.id != 'rotator') {
    if (eventTarget.style.background === rotator.style.background) {

      // match anim
      eventTarget.style.border = '.2em outset var(--valid-selection)'
      eventTarget.style.boxShadow = `-.1em -.1em .5em var(--valid-selection), inset -.1em -.1em 1em var(--valid-selection)`
      setTimeout(() => {
	eventTarget.style.border = '.2em outset var(--acnt-e)'
	eventTarget.style.boxShadow = `-.1em -.1em .5em var(--acnt-f), inset -.1em -.1em 1em var(--acnt-f)`
      }, 1000)
      // raise well
      clearInterval(wellFlowInterval)
      wellShader.style.height = '100%'
      setTimeout(() => {

	// splash anim
	

	// initialize main area inputs
        for (let x = 0; x < mainAreaInputs.length; x++) {
	  mainAreaInputs[x].style.background = `var(--acnt-d)`
	  mainAreaInputs[x].style.border = `.2em outset var(--acnt-e)`
	  mainAreaInputs[x].style.boxShadow = `-.1em -.1em .5em var(--acnt-f), inset -.1em -.1em 1em var(--acnt-f)`
	}
	rotator.style.background = `var(--acnt-d)`
        rotator.style.border = `.2em outset var(--acnt-e)`
	rotator.style.boxShadow = `-.1em -.1em .5em var(--acnt-f), inset -.1em -.1em 1em var(--acnt-f)`
	wellShader.style.opacity = '0'
	rotatorPrime = 0
      }, 100)

      // point increment
      points += 1
      if (points > highScore) {
	highScore = points
	highScoreDisplay.innerHTML = `${highScore}`
	localStorage.setItem('stored-high-score', highScore)
      }
      pointsDisplay.innerHTML = `${points}`
      localStorage.setItem('stored-points', points)
      flowSpeed += 1
      localStorage.setItem('stored-flow-speed', flowSpeed)
    } else {

      // mismatch anim
      eventTarget.style.border = '.2em outset var(--invalid-selection)'
      eventTarget.style.boxShadow = `-.1em -.1em .5em var(--invalid-selection), inset -.1em -.1em 1em var(--invalid-selection)`
      setTimeout(() => {
	eventTarget.style.border = '.2em outset var(--acnt-e)'
	eventTarget.style.boxShadow = `-.1em -.1em .5em var(--acnt-f), inset -.1em -.1em 1em var(--acnt-f)`
      }, 1000)
      
      //initialize variables
      points = 0
      pointsDisplay.innerHTML = `${points}`
      localStorage.setItem('stored-points', points)
      flowSpeed = 200
      localStorage.setItem('stored-flow-speed', flowSpeed)

      for (let x = 0; x < mainAreaInputs.length; x++) {
	mainAreaInputs[x].style.background = `var(--acnt-d)`
	mainAreaInputs[x].style.border = `.2em outset var(--acnt-e)`
	mainAreaInputs[x].style.boxShadow = `-.1em -.1em .5em var(--acnt-f), inset -.1em -.1em 1em var(--acnt-f)`
      }
    }
  }
})

// raise well
function areaWellFlow(flowSpeedValue) {
  let count = 0
  wellFlowInterval = setInterval(() => {
    if (count > 100) {

      // well spill
      mainArea.style.border = '2px solid var(--invalid-selection)'
      mainArea.style.boxShadow = 'var(--invalid-selection) 0 0 1em .2em'
      setTimeout(() => {
	mainArea.style.border = '2px solid var(--acnt-c)'
	mainArea.style.boxShadow = 'var(--acnt-c) 0 0 1em .2em'
	clearInterval(wellFlowInterval)
      }, 2000)
      
      //initialize variables
      points = 0
      pointsDisplay.innerHTML = `${points}`
      localStorage.setItem('stored-points', points)
      flowSpeed = 200
      localStorage.setItem('stored-flow-speed', flowSpeed)


      for (let x = 0; x < mainAreaInputs.length; x++) {
	mainAreaInputs[x].style.background = `var(--acnt-d)`
	mainAreaInputs[x].style.border = `.2em outset var(--acnt-e)`
	mainAreaInputs[x].style.boxShadow = `-.1em -.1em .5em var(--acnt-f), inset -.1em -.1em 1em var(--acnt-f)`
      }
    } else {
      wellShader.style.height = `${count}%`
      count += 1
    }
  }, flowSpeedValue)
}

