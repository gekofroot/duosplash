
// variables
let menu = document.getElementById('menu')
let menuDivA = document.getElementById('menu-div-a')
let menuDivB = document.getElementById('menu-div-b')
let menuDivC = document.getElementById('menu-div-c')
let menuPanel = document.getElementById('menu-panel')
let displayPanel = document.getElementById('display-panel')
let pointsDisplay = document.getElementById('points-display')
let highScoreDisplay = document.getElementById('high-score-display')
let mainArea = document.getElementById('main-area')
let mainAreaDivs = document.getElementsByClassName('main-area-div')
let mainAreaWell = document.getElementById('main-area-well')
let wellShader = document.getElementById('well-shader')
let ceilShader = document.getElementById('ceil-shader')
let playDiv = document.getElementById('play-div')
let play = document.getElementById('play')
let playIcon = document.getElementById('play-icon')

let points = 0
let highScore = 0
let rotationDegree = 0
let rotationDegreeB = 157.5
let wellFlowInterval = ''
let flowSpeed = 300
let rotatorPrime = 0
let pairAreaCount = 4
let rotationDegValue = 45
let baseColors = [
  '#ff0000', '#ffaa00', 
  '#ffff00', '#00ff00', 
  '#0000ff', '#ff00ff', 
  '#ff66ff', '#ffbbff'
]


playDiv.addEventListener('click', () => {

  // fade play div
  mainAreaWell.style.background = 'var(--main-area-well-inactive)'
  playIcon.style.border = 'unset'
  playIcon.style.background = 'radial-gradient(var(--acnt-d), var(--acnt-e))'
  playIcon.style.borderRadius = '50%'
  playIcon.style.width = '100%'
  playIcon.style.height = '100%'
  play.style.transform = 'rotate(90deg)'
  play.style.border = '.2em solid var(--clr)'
  play.style.boxShadow = 'var(--clr) 0 0 5em .2em'
  play.style.background = 'radial-gradient(var(--clr), var(--clr))'
  playDiv.style.transition = '1s'
  playDiv.style.transform = 'rotate(360deg)'
  playDiv.style.border = '.2em solid var(--clr)'
  playDiv.style.boxShadow = 'inset -2.5em -1.em 2em var(--clr)'
  rotator.style.transform = 'rotate(-360deg)'
  setTimeout(() => {
    playDiv.style.opacity = '0'
    setTimeout(() => {
      playDiv.style.display = 'none'
    }, 1000)
  }, 1000)
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
    }, 50)
  }, 1500)
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
    }, 50)
  }, 2000)
  setTimeout(() => {
    for (let x = 0; x < areaInputsI.length; x++) {
      areaInputsI[x].style.transform = 'rotate(0)'
    }
    for (let x = 0; x < areaInputsII.length; x++) {
      areaInputsII[x].style.transform = 'rotate(0)'
    }
    rotator.style.opacity = '100'
    rotator.style.transform = 'rotate(0)'
  }, 2500)
})

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
for (let x = 0; x < inputPairAreasA.length; x++) {
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
for (let x = 0; x < inputPairAreasB.length; x++) {
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
  let randomMax = baseColors.length - 1
  let selectedColors = []

  // generate area input I values
  for (let x = 0; x < areaInputsI.length; x++) {

    // generate area gradient
    // edge
    let gradientValueA = baseColors[randomBetween(0, randomMax)]

    // center
    let gradientValueB = baseColors[randomBetween(0, randomMax)]
    areaInputValue = `radial-gradient(${gradientValueB}, ${gradientValueA})`
    areaInputsI[x].style.background = `${areaInputValue}`
    areaInputsI[x].style.border = `.2em outset ${gradientValueA}`
    areaInputsI[x].style.boxShadow = `-.1em -.1em .5em ${gradientValueA}, inset -.1em -.1em 1em var(--acnt-f)`
  }

  // generate area input II values
  for (let x = 0; x < areaInputsII.length; x++) {

    // generate area gradient
    // edge
    let gradientValueA = baseColors[randomBetween(0, randomMax)]

    // center
    let gradientValueB = baseColors[randomBetween(0, randomMax)]
    areaInputValue = `radial-gradient(${gradientValueB}, ${gradientValueA})`
    areaInputsII[x].style.background = `${areaInputValue}`
    areaInputsII[x].style.border = `.2em outset ${gradientValueA}`
    areaInputsII[x].style.boxShadow = `-.1em -.1em .5em ${gradientValueA}, inset -.1em -.1em 1em var(--acnt-f)`
  }
}

// fill rotator match color
function fillRotator(colorArray) {
  let randomMax = baseColors.length - 1

  // generate rotator value
  let gradientValueA = baseColors[randomBetween(0, randomMax)]
  let gradientValueB = baseColors[randomBetween(0, randomMax)]
  rotatorInputValue = `radial-gradient(${gradientValueB}, ${gradientValueA})`

  // apply rotator value
  rotator.style.background = `${rotatorInputValue}`
  rotator.style.border = `.4em outset ${gradientValueA}`
  rotator.style.boxShadow = `-.1em -.1em .5em ${gradientValueA}, inset -.1em -.1em 1em var(--acnt-f)`
}

rotator.addEventListener('click', () => {
  if (rotatorPrime === 0) {

    // prime rotator
    displayPanel.style.animationPlayState = 'running'
    mainAreaWell.style.background = 'var(--main-area-well-active)'
    fillRotator()
    wellShader.style.height = '0'
    rotatorPrime = 1
    ceilShader.style.display = 'flex'

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
    let rotateBy = 45

    // input pairs I
    //rotationDegree -= rotateBy
    for (let x = inputPairAreasA.length - 1; x >= 0; x--) {
      inputPairAreasA[x].style.transform = `rotate(${rotationDegree}deg)`
      rotationDegree -= rotateBy
    }

    // input pairs II
    for (let x = 0; x < inputPairAreasB.length; x++) {
      inputPairAreasB[x].style.transform = `rotate(${rotationDegreeB}deg)`
      rotationDegreeB += rotateBy
    }
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
    for (let x of menuPanel.children) {
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
  points += pointIncrementValue

  // set highscore
  if (points > highScore) {
    highScore = points
    highScoreDisplay.innerHTML = `${highScore}`
    localStorage.setItem('stored-high-score', highScore)
  }
  pointsDisplay.innerHTML = `${points}`
  localStorage.setItem('stored-points', points)

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

    if (eventTargetGradientValues[0] === rotatorGradientValues[0] && eventTargetGradientValues[1] === rotatorGradientValues[1]) {
      
      // value match
      selectionValueMatch(eventTarget, 3)
    } else if (eventTargetGradientValues[0] != rotatorGradientValues[0] && eventTargetGradientValues[1] === rotatorGradientValues[1]) {
      
      // value match partial edge
      selectionValueMatch(eventTarget, 1)
    } else if (eventTargetGradientValues[0] === rotatorGradientValues[0] && eventTargetGradientValues[1] != rotatorGradientValues[1]) {
      
      // value match partial center
      selectionValueMatch(eventTarget, 2)
    } else if (eventTargetGradientValues[0] != rotatorGradientValues[0] && eventTargetGradientValues[1] != rotatorGradientValues[1]) {

      // mismatch anim
      // initialize play div
      playIcon.style.borderTop = '2em solid var(--clr)'
      playIcon.style.borderBottom = '2em solid var(--clr)'
      playIcon.style.borderLeft = '3.5em solid var(--acnt-f)'
      playIcon.style.background = 'radial-gradient(var(--clr), var(--clr))'
      playIcon.style.borderRadius = '0'
      playIcon.style.width = '0'
      playIcon.style.height = '0'
      play.style.transform = 'rotate(0)'
      playDiv.style.transform = 'rotate(0)'
      playDiv.style.display = 'flex'
      
      displayPanel.style.animationPlayState = 'paused'
      ceilShader.style.display = 'flex'
      clearInterval(wellFlowInterval)
      setTimeout(() => {
	wellShader.style.opacity = `0`
      }, 1500)

      setTimeout(() => {

	// display play div
	play.style.border = '.2em solid var(--acnt-f)'
	play.style.boxShadow = 'var(--acnt-c) 0 0 5em .2em'
	play.style.background = 'radial-gradient(var(--acnt-d), var(--acnt-f))'
	playDiv.style.border = '.2em inset var(--acnt-c)'
	playDiv.style.boxShadow = 'inset -2.5em -1.5em 2em var(--acnt-f)'
	playDiv.style.opacity = '100'
      }, 3000)

      setTimeout(() => {
	wellShader.style.height = `0`
	wellShader.style.opacity = `100`
	mainAreaWell.style.background = 'radial-gradient(var(--acnt-d), var(--acnt-f))'
	rotatorPrime = 0
      }, 5000)

      eventTarget.style.background = '#ff0000'
      eventTarget.style.border = '.2em outset var(--invalid-selection)'
      eventTarget.style.boxShadow = `-.1em -.1em .5em var(--invalid-selection), inset -.1em -.1em 1em var(--invalid-selection)`
      setTimeout(() => {

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

	//initialize variables
	points = 0
	pointsDisplay.innerHTML = `${points}`
	localStorage.setItem('stored-points', points)
	flowSpeed = 200
	localStorage.setItem('stored-flow-speed', flowSpeed)

	// fade ceil shader
	ceilShader.style.display = 'none'
      }, 3000)
    } 
  }
})

// raise well
function areaWellFlow(flowSpeedValue) {
  let count = 0
  wellFlowInterval = setInterval(() => {
    if (count > 100) {

      // well spill
      //initialize variables
      displayPanel.style.animationPlayState = 'paused'
      points = 0
      pointsDisplay.innerHTML = `${points}`
      localStorage.setItem('stored-points', points)
      flowSpeed = 200
      localStorage.setItem('stored-flow-speed', flowSpeed)

      mainArea.style.border = '.4px outset var(--invalid-selection)'
      mainArea.style.boxShadow = 'var(--invalid-selection) 0 0 1em .2em'
      
      ceilShader.style.display = 'flex'
      setTimeout(() => {

	// initialize play div
	playIcon.style.borderTop = '2em solid var(--clr)'
	playIcon.style.borderBottom = '2em solid var(--clr)'
	playIcon.style.borderLeft = '3.5em solid var(--acnt-f)'
	playIcon.style.background = 'radial-gradient(var(--clr), var(--clr))'
	playIcon.style.borderRadius = '0'
	playIcon.style.width = '0'
	playIcon.style.height = '0'
	play.style.transform = 'rotate(0)'
	playDiv.style.transform = 'rotate(0)'
	playDiv.style.display = 'flex'



	wellShader.style.opacity = `0`
      }, 1500)

      setTimeout(() => {

	// display play div
	play.style.border = '.2em solid var(--acnt-f)'
	play.style.boxShadow = 'var(--acnt-c) 0 0 5em .2em'
	play.style.background = 'radial-gradient(var(--acnt-d), var(--acnt-f))'
	playDiv.style.border = '.2em inset var(--acnt-c)'
	playDiv.style.boxShadow = 'inset -2.5em -1.5em 2em var(--acnt-f)'
	playDiv.style.opacity = '100'
      }, 3000)

      setTimeout(() => {
	wellShader.style.height = `0`
	wellShader.style.opacity = `100`
	mainAreaWell.style.background = 'var(--main-area-well-inactive)'
	rotatorPrime = 0
      }, 5000)

      setTimeout(() => {

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
	mainArea.style.border = '.4em outset var(--acnt-e)'
	mainArea.style.boxShadow = 'var(--acnt-c) 0 0 1em .2em'
	clearInterval(wellFlowInterval)
      }, 2000)
    } else {
      wellShader.style.height = `${count}%`
      count += 1
    }
  }, flowSpeedValue)
}

