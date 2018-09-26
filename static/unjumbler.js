function findExactWords(searchString, wordsToSearch) {
  searchString = searchString.toLowerCase()
  let searchArray = searchString.split('')
  let matchingWords = []
  let searchLength = searchString.length

  Object.keys(wordsToSearch).forEach((word) => {
    if (searchLength === word.length) {
      let letters = word.split('')

      searchArray.forEach((char) => {
        let found = false
        letters.forEach((letter, index) => {
          if (letter === char && found === false) {
            letters.splice(index, 1)
            found = true
          }
        })
      })

      if (letters.length === 0) {
        matchingWords.push(word)
      }
    }
  })

  return matchingWords
}

function findAllWords(searchString, wordsToSearch) {
  searchString = searchString.toLowerCase()
  let searchArray = searchString.split('')
  let matchingWords = []
  let searchLength = searchString.length

  for (let i = searchLength; i > 2; i--) {
    let matchingLengthWords = []

    Object.keys(wordsToSearch).forEach((word) => {
      if (i === word.length) {
        let letters = word.split('')

        searchArray.forEach((char) => {
          let found = false
          letters.forEach((letter, index) => {
            if (letter === char && found === false) {
              letters.splice(index, 1)
              found = true
            }
          })
        })

        if (letters.length === 0) {
          matchingLengthWords.push(word)
        }
      }
    })

    matchingWords.push(matchingLengthWords)
  }

  return matchingWords
}

function displayWords(matchingWords) {
  document.getElementById('result').innerHTML = ''

  if (typeof matchingWords[0] === 'string') {
    matchingWords.forEach((word) => {
      word = word.toUpperCase()
      document.getElementById('result').innerHTML += '<p>' + word + '</p>'
    })
  }
  else {
    matchingWords.forEach((wordSizeArray) => {
      let wordLength = wordSizeArray[0].length
      document.getElementById('result').innerHTML += '<h3>' + wordLength + ' Letters</h3><p>'

      wordSizeArray.forEach((word, index) => {
        word = word.toUpperCase()

        if (index != wordSizeArray.length - 1) {
          document.getElementById('result').innerHTML += word + ', '
        }
        else {
          document.getElementById('result').innerHTML += word
        }
      })

      document.getElementById('result').innerHTML += '</p>'
    })
  }
}

function getWords() {
  fetch('/unjumbler')
    .then((response) => {
      return response.json()
    })
    .then((json) => {
      let words = JSON.parse(json)
      return words
    })
    .then((words) => {
      let jumbledWord = document.getElementById('jumbledWord').value
      let exactWords = document.getElementById('exactWordsRadio')
      let allWords = document.getElementById('allWordsRadio')

      if (exactWords.checked) {
        return findExactWords(jumbledWord, words)
      }
      else {
        return findAllWords(jumbledWord, words)
      }
    })
    .then((matchingWords) => {
      displayWords(matchingWords)
    })
}
