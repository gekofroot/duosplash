
// variables
let menu = document.getElementById('menu')
let menuDivA = document.getElementById('menu-div-a')
let menuDivB = document.getElementById('menu-div-b')
let menuDivC = document.getElementById('menu-div-c')
let menuPanel = document.getElementById('menu-panel')
let menuPanelArea = document.getElementById('menu-panel-area')
let highScoreDisplay = document.getElementById('high-score-display')
let colorschemeSelection = document.getElementById('colorscheme-selection')
let displayPanel = document.getElementById('display-panel')
let pointsDisplay = document.getElementById('points-display')
let fieldShader = document.getElementById('field-shader')
let mainArea = document.getElementById('main-area')
let mainAreaDivs = document.getElementsByClassName('main-area-div')
let mainAreaWell = document.getElementById('main-area-well')
let wellShader = document.getElementById('well-shader')
let wellPlayShader = document.getElementById('well-play-shader')
let ceilShader = document.getElementById('ceil-shader')
let playDiv = document.getElementById('play-div')
let play = document.getElementById('play')
let playIcon = document.getElementById('play-icon')

let pointsBase = 0
let pointsRed = 0
let pointsGreen = 0
let pointsBlue = 0
let pointsGreyscale = 0
let pointsArray = [
  pointsBase, pointsRed,
  pointsGreen, pointsBlue,
  pointsGreyscale
]
let highScoreBase = 0
let highScoreRed = 0
let highScoreGreen = 0
let highScoreBlue = 0
let highScoreGreyscale = 0
let highScoreArray = [
  highScoreBase, highScoreRed, 
  highScoreGreen, highScoreBlue,
  highScoreGreyscale
]
let rotationDegree = 0
let rotationDegreeB = 157.5
let wellFlowInterval = ''
let flowSpeed = 300
let rotatorPrime = 0
let pairAreaCount = 4
let rotationDegValue = 45
let base = [
  '#bb0f0f', '#770f0f',
  '#330f0f', '#0fbb0f', 
  '#0f770f', '#0f330f',
  '#0f0fbb', '#000077',
  '#0f0f33', '#0f0f0f', 

  '#ff0000', '#ffaa00', 
  '#ffff00', '#00ff00', 
  '#0000ff', '#ff00ff', 
  '#ff66ff', '#ffbbff'
]
let red = [
  '#bb0000', '#770000', 
  '#330000', '#ff0f0f', 
  '#ff3f3f', '#ff6f6f', 
  '#ff9f9f', '#ffcfcf', 
  '#ffffff'
]
let green = [
  '#00bb00', '#007700', 
  '#003300', '#0fff0f', 
  '#3fff3f', '#6fff6f', 
  '#9fff9f', '#cfffcf', 
  '#ffffff'
]
let blue = [
  '#0000bb', '#000077', 
  '#000033', '#0f0fff', 
  '#3f3fff', '#6f6fff', 
  '#9f9fff', '#cfcfff', 
  '#ffffff'
]
let greyscale = [
  '#bbbbbb', '#777777', 
  '#333333', '#3f3f3f', 
  '#6f6f6f', '#9f9f9f', 
  '#cfcfcf', '#ffffff' 
]
let schemeSets = [
  'Base', 'Red', 
  'Green', 'Blue',
  'Greyscale'
]
let schemeSetArrays = [
  base, red, 
  green, blue,
  greyscale
]
let currentColorscheme = base
let windowWidth = window.outerWidth
let windowHeight = window.outerHeight


// retrive stored values
let storedColorscheme = localStorage.getItem('stored-colorscheme')
let storedHighScoreBase = localStorage.getItem('stored-high-score-base')
let storedHighScoreRed = localStorage.getItem('stored-high-score-red')
let storedHighScoreGreen = localStorage.getItem('stored-high-score-green')
let storedHighScoreBlue = localStorage.getItem('stored-high-score-blue')
let storedHighScoreGreyscale = localStorage.getItem('stored-high-score-greyscale')
let storedHighScoreArrayKeys = [
  'stored-high-score-base', 'stored-high-score-red', 
  'stored-high-score-green', 'stored-high-score-blue', 
  'stored-high-score-greyscale'
]
let storedHighScoreArray = [
  storedHighScoreBase, storedHighScoreRed,
  storedHighScoreGreen, storedHighScoreBlue,
  storedHighScoreGreyscale
]

// stored high score
for (let x = 0; x < storedHighScoreArray.length; x++) {
  if (storedHighScoreArray[x]) {
    highScoreArray[x] = Number(storedHighScoreArray[x])
    highScoreDisplay.innerHTML = `${highScoreArray[x]}`
  }
}

// stored colorscheme
if (storedColorscheme) {
  colorschemeSelection.value = storedColorscheme
  for (let x = 0; x < schemeSets.length; x++) {
    if (colorschemeSelection.value === schemeSets[x]) {
      currentColorscheme = schemeSetArrays[x]
      highScoreDisplay.innerHTML = `${highScoreArray[x]}`
    }
  }
}

// set colorscheme
colorschemeSelection.addEventListener('change', () => {
  let selectedColorscheme = colorschemeSelection.value
  for (let x = 0; x < schemeSets.length; x++) {
    if (selectedColorscheme === schemeSets[x]) {
      currentColorscheme = schemeSetArrays[x]
      localStorage.setItem('stored-colorscheme', schemeSets[x])
      highScoreDisplay.innerHTML = `${highScoreArray[x]}`
    }
  }
})

playDiv.addEventListener('click', () => {

  // fade play elements
  rotator.style.boxShadow = '-.1em -.1em .5em var(--clr), inset -.1em -.1em 1em var(--clr)'
  ceilShader.style.zIndex = '3'
  playIcon.style.border = 'unset'
  playIcon.style.background = 'radial-gradient(var(--acnt-d), var(--acnt-e))'
  playIcon.style.borderRadius = '50%'
  playIcon.style.width = '100%'
  playIcon.style.height = '100%'
  play.style.transform = 'rotate(90deg)'
  play.style.border = '.2em solid var(--clr)'
  play.style.boxShadow = 'var(--clr) 0 0 5em .2em'
  play.style.background = 'radial-gradient(var(--clr), var(--clr))'
  playDiv.style.transform = 'rotate(360deg)'
  playDiv.style.border = '.2em solid var(--clr)'
  playDiv.style.boxShadow = 'inset -2.5em -1.em 4em var(--clr)'
  setTimeout(() => {
    playDiv.style.opacity = '0'
    setTimeout(() => {
      playDiv.style.display = 'none'
    }, 1000)
  }, 1500)

  // display area inputs I
  setTimeout(() => {
    let count = 0
    let areaInputsIntervalI = setInterval(() => {
      if (count > areaInputsI.length - 1) {
	clearInterval(areaInputsIntervalI)
      } else {
	areaInputsI[count].style.opacity = '100'
	if (count > 0) {
	  areaInputsI[count - 1].style.transform = 'rotate(-360deg)'
	}
	count += 1
      }
    }, 100)
  }, 2000)

  // display area inputs II
  setTimeout(() => {
    let count = 0
    let areaInputsIntervalII = setInterval(() => {
      if (count > areaInputsI.length - 1) {
	clearInterval(areaInputsIntervalII)
      } else {
	areaInputsII[count].style.opacity = '100'
	if (count > 0) {
	  areaInputsII[count - 1].style.transform = 'rotate(-360deg)'
	}
	count += 1
      }
    }, 100)
  }, 3000)
  
  // display rotator
  setTimeout(() => {
    rotator.style.opacity = '100'
    rotator.style.transform = 'rotate(-360deg)'
  }, 3500)

  // area inputs intial rotation
  setTimeout(() => {
    for (let x = 0; x < areaInputsI.length; x++) {
      areaInputsI[x].style.transform = 'rotate(0)'
    }
    for (let x = 0; x < areaInputsII.length; x++) {
      areaInputsII[x].style.transform = 'rotate(0)'
    }
    rotator.style.transform = 'rotate(0)'
  }, 4000)

  // activate rotator
  setTimeout(() => {
    rotator.style.zIndex = '2'
    rotator.style.boxShadow = '-.1em -.1em .5em var(--acnt-f), inset -.1em -.1em 1em var(--acnt-f)'
    ceilShader.style.zIndex = '2'
  }, 5000)
})

function initializeValues() {

  // display ceil shader
  ceilShader.style.zIndex = '3'
  rotator.style.zIndex = '0'
  ceilShader.style.display = 'flex'

  // pause anim
  displayPanel.style.animationPlayState = 'paused'
  fieldShader.style.animationPlayState = 'paused'

  // set highscore
  let indexOfColorscheme = schemeSets.indexOf(colorschemeSelection.value)
  if (pointsArray[indexOfColorscheme] > highScoreArray[indexOfColorscheme]) {
    highScoreArray[indexOfColorscheme] = pointsArray[indexOfColorscheme]
    highScoreDisplay.innerHTML = `${highScoreArray[indexOfColorscheme]}`
    localStorage.setItem(`${storedHighScoreArrayKeys[indexOfColorscheme]}`, Number(highScoreArray[indexOfColorscheme]))
  }

  // clear well flow interval
  clearInterval(wellFlowInterval)

  // scale play icon
  if (windowWidth < 1080) {
    playIcon.style.borderTop = '.9em solid var(--clr)'
    playIcon.style.borderBottom = '.9em solid var(--clr)'
    playIcon.style.borderLeft = '1.4em solid var(--acnt-f)'
  } else if (windowWidth > 1080) {
    playIcon.style.borderTop = '1em solid var(--clr)'
    playIcon.style.borderBottom = '1em solid var(--clr)'
    playIcon.style.borderLeft = '2em solid var(--acnt-f)'
  } else if (windowHeight > 1080) {
    playIcon.style.borderTop = '1em solid var(--clr)'
    playIcon.style.borderBottom = '1em solid var(--clr)'
    playIcon.style.borderLeft = '2em solid var(--acnt-f)'
  }

  // initialize play div elements
  setTimeout(() => {
    playIcon.style.background = 'radial-gradient(var(--clr), var(--clr))'
    playIcon.style.borderRadius = '0'
    playIcon.style.width = '0'
    playIcon.style.height = '0'
    play.style.transform = 'rotate(0)'
    playDiv.style.transform = 'rotate(0)'
    playDiv.style.display = 'flex'
  }, 1500)

  // display play & initialize variables
  setTimeout(() => {
  
    // display play div
    play.style.border = '.2em solid var(--acnt-f)'
    play.style.boxShadow = 'var(--acnt-c) 0 0 5em .2em'
    play.style.background = 'radial-gradient(var(--acnt-d), var(--acnt-f))'
    playDiv.style.border = '.2em inset var(--acnt-c)'
    playDiv.style.boxShadow = 'inset -2.5em -1.5em 4em var(--acnt-f)'
    playDiv.style.opacity = '100'
    
    // initialize variables
    let indexOfColorscheme = schemeSets.indexOf(colorschemeSelection.value)
    pointsArray[indexOfColorscheme] = 0
    pointsDisplay.innerHTML = `${pointsArray[indexOfColorscheme]}`
    localStorage.setItem('stored-points', points)
    flowSpeed = 300
    localStorage.setItem('stored-flow-speed', flowSpeed)

    // initialize main area border & box shadow
    mainArea.style.border = '.4em outset var(--acnt-e)'
    mainArea.style.boxShadow = '-.1em -.1em .5em var(--acnt-f)'
  }, 3000)

  // fade area inputs
  setTimeout(() => {
    for (let x = 0; x < areaInputsI.length; x++) {
      areaInputsI[x].style.opacity = '0'
    }
    for (let x = 0; x < areaInputsII.length; x++) {
      areaInputsII[x].style.opacity = '0'
    }
    rotator.style.opacity = '0'

    // initialize input pair rotation
    for (let x = 0; x < pairAreaCount; x++) {
      inputPairAreasA[x].style.transform = 'rotate(0)'
    }
    for (let x = 0; x < pairAreaCount; x++) {
      inputPairAreasB[x].style.transform = 'rotate(0)'
    }

    // initialize pair rotation degrees
    pairAreaRotationDegI = 0
    pairAreaRotationDegII = 22.5

    // input pairs I
    for (let x = 0; x < pairAreaCount; x++) {
      inputPairAreasA[x].style.transform = `rotate(${pairAreaRotationDegI}deg)`
      pairAreaRotationDegI += rotationDegValue
    }

    // input pairs II
    for (let x = 0; x < pairAreaCount; x++) {
      inputPairAreasB[x].style.transform = `rotate(${pairAreaRotationDegII}deg)`
      pairAreaRotationDegII += rotationDegValue
    }

    // initialize input values
    // display well play shader
    wellPlayShader.style.opacity = '100'

    // initialize rotator
    rotator.style.background = 'var(--acnt-d)'
    rotator.style.border = '.2em outset var(--acnt-e)'
    rotator.style.boxShadow = '-.1em -.1em .5em var(--acnt-f), inset -.1em -.1em 1em var(--acnt-f)'
  
    // initialize inputs
    for (let x = 0; x < areaInputsI.length; x++) {
      areaInputsI[x].style.background = 'var(--acnt-d)'
      areaInputsI[x].style.border = '.2em outset var(--acnt-e)'
      areaInputsI[x].style.boxShadow = '-.1em -.1em .5em var(--acnt-f), inset -.1em -.1em 1em var(--acnt-f)'
    }
    for (let x = 0; x < areaInputsII.length; x++) {
      areaInputsII[x].style.background = 'var(--acnt-d)'
      areaInputsII[x].style.border = '.2em outset var(--acnt-e)'
      areaInputsII[x].style.boxShadow = '-.1em -.1em .5em var(--acnt-f), inset -.1em -.1em 1em var(--acnt-f)'
    }
  }, 4000)

  // initialize well elements
  setTimeout(() => {
    wellShader.style.height = `0`
    wellShader.style.opacity = `100`
    rotatorPrime = 0
    ceilShader.style.zIndex = '2'
  }, 5000)
}

// build pair area elements I
let pairAreaRotationDegI = 0
for (let x = 0; x < pairAreaCount; x++) {
  let pairAreaNode = document.createElement('div')
  pairAreaNode.setAttribute('class', 'input-pair-area-I')
  pairAreaNode.setAttribute('id', `input-pair-area-I-${x}`)
  pairAreaNode.style.transform = `rotate(${pairAreaRotationDegI}deg)`
  mainArea.appendChild(pairAreaNode)
  pairAreaRotationDegI += rotationDegValue
}
let inputPairAreasA = document.getElementsByClassName('input-pair-area-I')

// build pair area input elements
for (let x = 0; x < pairAreaCount; x++) {
  for (let y = 0; y < 2; y++) {
    
    let inputNode = document.createElement('input')
    inputNode.setAttribute('class', 'input-element-I')
    inputNode.setAttribute('id', `input-element-I-${x}${y}`)
    inputNode.setAttribute('type', 'button')
    inputPairAreasA[x].appendChild(inputNode)
  }
}
let areaInputsI = document.getElementsByClassName('input-element-I')

// build pair area elements II
let pairAreaRotationDegII = 22.5
for (let x = 0; x < pairAreaCount; x++) {
  let pairAreaNode = document.createElement('div')
  pairAreaNode.setAttribute('class', 'input-pair-area-II')
  pairAreaNode.setAttribute('id', `input-pair-area-II-${x}`)
  pairAreaNode.style.transform = `rotate(${pairAreaRotationDegII}deg)`
  mainArea.appendChild(pairAreaNode)
  pairAreaRotationDegII += rotationDegValue
}
let inputPairAreasB = document.getElementsByClassName('input-pair-area-II')

// build pair area input elements
for (let x = 0; x < pairAreaCount; x++) {
  for (let y = 0; y < 2; y++) {
    let inputNode = document.createElement('input')
    inputNode.setAttribute('class', 'input-element-II')
    inputNode.setAttribute('id', `input-element-II-${x}${y}`)
    inputNode.setAttribute('type', 'button')
    inputPairAreasB[x].appendChild(inputNode)
  }
}
let areaInputsII = document.getElementsByClassName('input-element-II')

// generate integer
function randomBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function fillAreaInputs(colorArray) {
  let randomMax = currentColorscheme.length - 1
  let selectedColors = []

  // generate area input I values
  for (let x = 0; x < areaInputsI.length; x++) {

    // generate area gradient
    // edge
    let gradientValueA = currentColorscheme[randomBetween(0, randomMax)]

    // center
    let gradientValueB = currentColorscheme[randomBetween(0, randomMax)]
    areaInputValue = `radial-gradient(${gradientValueB}, ${gradientValueA})`
    areaInputsI[x].style.background = `${areaInputValue}`
    areaInputsI[x].style.border = `.2em outset ${gradientValueA}`
    areaInputsI[x].style.boxShadow = `-.1em -.1em .5em ${gradientValueA}, inset -.1em -.1em 1em ${gradientValueB}`
  }

  // generate area input II values
  for (let x = 0; x < areaInputsII.length; x++) {

    // generate area gradient
    // edge
    let gradientValueA = currentColorscheme[randomBetween(0, randomMax)]

    // center
    let gradientValueB = currentColorscheme[randomBetween(0, randomMax)]
    areaInputValue = `radial-gradient(${gradientValueB}, ${gradientValueA})`
    areaInputsII[x].style.background = `${areaInputValue}`
    areaInputsII[x].style.border = `.2em outset ${gradientValueA}`
    areaInputsII[x].style.boxShadow = `-.1em -.1em .5em ${gradientValueA}, inset -.1em -.1em 1em ${gradientValueB})`
  }
}

// fill rotator match color
function fillRotator(colorArray) {
  let randomMax = currentColorscheme.length - 1

  // generate rotator value
  let gradientValueA = currentColorscheme[randomBetween(0, randomMax)]
  let gradientValueB = currentColorscheme[randomBetween(0, randomMax)]
  rotatorInputValue = `radial-gradient(${gradientValueB}, ${gradientValueA})`

  // apply rotator value
  rotator.style.background = `${rotatorInputValue}`
  rotator.style.border = `.4em outset ${gradientValueA}`
  rotator.style.boxShadow = `-.1em -.1em .5em ${gradientValueA}, inset -.1em -.1em 1em ${gradientValueB}`
}

rotator.addEventListener('click', () => {
  if (rotatorPrime === 0) {

    // fade well play shader
    wellPlayShader.style.opacity = '0'

    // prime rotator
    fillRotator()
    wellShader.style.height = '0'
    rotatorPrime = 1

    // run anim
    displayPanel.style.animationPlayState = 'running'
    fieldShader.style.animationPlayState = 'running'
  } else if (rotatorPrime === 1) {
    
    // rotator primed
    // fade ceil shader
    ceilShader.style.display = 'none'

    // fill rotator & area inputs
    clearInterval(wellFlowInterval)
    wellShader.style.opacity = '100'
    areaWellFlow(flowSpeed)
    flowSpeed -= 1
    localStorage.setItem('stored-flow-speed', flowSpeed)
    fillAreaInputs()

    // rotate inputs
    // input pairs I
    for (let x = inputPairAreasA.length - 1; x >= 0; x--) {
      inputPairAreasA[x].style.transform = `rotate(${rotationDegree}deg)`
      rotationDegree -= rotationDegValue
    }

    // input pairs II
    for (let x = 0; x < inputPairAreasB.length; x++) {
      inputPairAreasB[x].style.transform = `rotate(${rotationDegreeB}deg)`
      rotationDegreeB += rotationDegValue
    }
  }
})

let menuToggle = 0
menu.addEventListener('click', () => {
  if (menuToggle === 0) {

    // menu display anim
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
    menuPanel.style.display = 'flex'
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
    
    // display menu items
    setTimeout(() => {
      for (let x of menuPanelArea.children) {
	x.style.opacity = 100
      }
    }, 700)
    menuToggle = 1
  } else if (menuToggle === 1) {

    // menu fade anim
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
    for (let x of menuPanelArea.children) {
      x.style.opacity = 0
    }
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

function selectionValueMatch(eventTargetValue, pointIncrementValue) {

  // raise well
  clearInterval(wellFlowInterval)
  wellShader.style.height = '100%'

  // event match anim
  eventTargetValue.style.border = '.2em outset var(--valid-selection)'
  eventTargetValue.style.boxShadow = `-.1em -.1em .5em var(--valid-selection), inset -.1em -.1em 1em var(--valid-selection)`
  setTimeout(() => {
    
    // initialize event target
    eventTargetValue.style.border = '.2em outset var(--acnt-e)'
    eventTargetValue.style.boxShadow = `-.1em -.1em .5em var(--acnt-f), inset -.1em -.1em 1em var(--acnt-f)`
  }, 3000)

  // rotator match anim
  setTimeout(() => {

    // initialize rotator
    rotator.style.background = `var(--acnt-d)`
    rotator.style.border = `.2em outset var(--acnt-e)`
    rotator.style.boxShadow = `-.1em -.1em .5em var(--acnt-f), inset -.1em -.1em 1em var(--acnt-f)`

    // initialize inputs
    for (let x = 0; x < areaInputsI.length; x++) {
      areaInputsI[x].style.background = 'var(--acnt-d)'
      areaInputsI[x].style.border = '.2em outset var(--acnt-e)'
      areaInputsI[x].style.boxShadow = '-.1em -.1em .5em var(--acnt-f), inset -.1em -.1em 1em var(--acnt-f)'
    }
    for (let x = 0; x < areaInputsII.length; x++) {
      areaInputsII[x].style.background = 'var(--acnt-d)'
      areaInputsII[x].style.border = '.2em outset var(--acnt-e)'
      areaInputsII[x].style.boxShadow = '-.1em -.1em .5em var(--acnt-f), inset -.1em -.1em 1em var(--acnt-f)'
    }
    wellShader.style.opacity = '0'
    rotatorPrime = 0
  }, 100)

  // point increment
  let indexOfColorscheme = schemeSets.indexOf(colorschemeSelection.value)
  pointsArray[indexOfColorscheme] += pointIncrementValue
  pointsDisplay.innerHTML = `${pointsArray[indexOfColorscheme]}`

  // increment flow speed
  flowSpeed += 1
  localStorage.setItem('stored-flow-speed', flowSpeed)
}

// main area engaged
mainArea.addEventListener('click', () => {
  let eventTarget = event.target
  if (eventTarget.className === 'input-element-I' || eventTarget.className === 'input-element-II') {

    // event target gradients
    let eventTargetGradientValues = []
    eventTargetGradientString = eventTarget.style.background.slice(16, -1)
    eventTargetGradientString = eventTargetGradientString.split('), ')
    eventTargetGradientValues.push(eventTargetGradientString[0])
    eventTargetGradientValues.push(eventTargetGradientString[1]) 
    
    // rotator gradients
    let rotatorGradientValues = []
    rotatorGradientString = rotator.style.background.slice(16, -1)
    rotatorGradientString = rotatorGradientString.split('), ')
    rotatorGradientValues.push(rotatorGradientString[0])
    rotatorGradientValues.push(rotatorGradientString[1]) 

    // selection evaluation
    if (eventTargetGradientValues[0] === rotatorGradientValues[0] && eventTargetGradientValues[1] === rotatorGradientValues[1]) {
      
      // selection match
      selectionValueMatch(eventTarget, 5)
    } else if (eventTargetGradientValues[0] != rotatorGradientValues[0] && eventTargetGradientValues[1] === rotatorGradientValues[1]) {
      
      // selection match partial edge
      selectionValueMatch(eventTarget, 1)
    } else if (eventTargetGradientValues[0] === rotatorGradientValues[0] && eventTargetGradientValues[1] != rotatorGradientValues[1]) {
      
      // selection match partial center
      selectionValueMatch(eventTarget, 2)
    } else if (eventTargetGradientValues[0] != rotatorGradientValues[0] && eventTargetGradientValues[1] != rotatorGradientValues[1]) {

      // selection mismatch
      // initialize values
      initializeValues()
      
      // mismatch anim
      eventTarget.style.background = 'radial-gradient(var(--clr), var(--clr))'
      eventTarget.style.border = '.2em outset var(--clr)'
      eventTarget.style.boxShadow = `-.1em -.1em .5em var(--clr), inset -.1em -.1em 1em var(--clr)`
    } 
  }
})

// raise well
function areaWellFlow(flowSpeedValue) {
  let count = 0
  wellFlowInterval = setInterval(() => {
    if (count > 100) {

      // well overflow
      initializeValues()

      // overflow anim
      mainArea.style.border = '.4px outset var(--invalid-selection)'
      mainArea.style.boxShadow = 'var(--invalid-selection) 0 0 1em .2em'
    } else {
      wellShader.style.height = `${count}%`
      count += 1
    }
  }, flowSpeedValue)
}

