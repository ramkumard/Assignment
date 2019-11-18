const readline = require('readline');
const fs = require('fs')

//Read the dictionary file
var dictionary = fs.readFileSync('dictionary.txt').toString().split(/\r?\n/);

var uniqueWords = []; // Stores all uniq words
var matchingWords = []; // Stores combination of matching words
var combinedList = []; // Stores combination of words with - seperated
var actualWords = []; // List of matching words
var Wordslist = []; // Mapping of phone numbers to words

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question(`Enter the number ->  `, (numbers) => {
    console.log(`Words for  ${numbers.replace(/[.-]/, '')}!`);
    letterCombinations(numbers);
});


const generateStringCombinations = (digits, temp, result, Wordslist) => {
    if (digits.length == 0) {
        let arr = [];
        for (var i = 0; i < temp.length; i++) {
            arr[i] = temp[i];
        }
        result.push(arr.join(''));
        return;
    }

    let curr = parseInt(digits.substring(0, 1));
    let letters = Wordslist[curr];
    for (var i = 0; i < letters.length; i++) {
        temp.push(letters.charAt(i));
        generateStringCombinations(digits.substring(1), temp, result, Wordslist);
        temp.pop();
    }
}


const generateCombinations = (chars) => {
    var result = [];
    if (chars.length < 1) return 0;
    if (chars.length < 2) return arr[0];

    result = [];
    var originalChar = chars.join('');
    var matchedArray = [];
    for (let i = 0; i < chars.length; i++) {
        const temp = [];
        for (let j = i; j < chars.length; j++) {
            temp.push(chars[j]);

            let strCat = temp.join('');
            result.push(strCat);
            let matchedWord = null;
            if (uniqueWords.indexOf(strCat) != -1) {
                matchedWord = strCat;
                if (matchedArray.indexOf(strCat) == -1) {
                    matchedArray.push(strCat);
                }
            } else {
                matchedWord = matchDictionary(strCat);
            }
            if (matchedWord && matchedWord != -1 && uniqueWords.indexOf(strCat) == -1) {
                uniqueWords.push(strCat);
                if (strCat.length == originalChar.length && actualWords.indexOf(strCat.toUpperCase()) == -1) {
                    actualWords.push(strCat.toUpperCase());
                }

            }
        }
    }
    if (matchedArray.length > 0 && matchedArray.length < 9) {
        if (matchedArray.join('').length >= originalChar.length && combinedList.indexOf(matchedArray.join('-')) == -1) {
            combinedList.push(matchedArray.join('-'));
            matchingWords.push(originalChar);
        }
    }
    return result;

}

const matchDictionary = (word) => {
    let match = dictionary.filter(function(item) {
        return item === word;
    });
    return match.toString();
}

const getKey = (ch) => {
    for (let i = 0; i < Object.values(Wordslist).length; i++) {
        if (Object.values(Wordslist)[i].indexOf(ch) != -1) {
            return Object.keys(Wordslist)[i];
        }
    }
    return null;
}

//Generate letter combination for the input numbers
const letterCombinations = (numbers) => {
    numbers = numbers.replace(/[.-]/, '')

    if (isNaN(numbers)) {
        console.log("Invalid Arguments");
        return;
    }
    Wordslist = [];
    Wordslist[2] = "abc";
    Wordslist[3] = "def";
    Wordslist[4] = "ghi";
    Wordslist[5] = "jkl";
    Wordslist[6] = "mno";
    Wordslist[7] = "pqrs";
    Wordslist[8] = "tuv";
    Wordslist[9] = "wxyz";
    Wordslist[0] = "0";
    Wordslist[1] = "1";

    let output = [];

    if (numbers == null || numbers.length == 0)
        return output;

    let temp = [];
    generateStringCombinations(numbers, temp, output, Wordslist);
    phoneToWords(output);

}


const phoneToWords = (list) => {
    for (let i = 0; i < list.length; i++) {
        generateCombinations(list[i].split(''));
    }

    for (let i = 0; i < matchingWords.length; i++) {
        let wrd = matchingWords[i];
        let selectedWords = combinedList[i];
        let searchedWords = [];
        let count_mismatch = 0;
        let matchedLetters = "";
        let splitArray = selectedWords.indexOf('-') > -1 ? selectedWords.split('-') : selectedWords;

        //If match found break loop and continue to next item
        if (splitArray.join('') === wrd && actualWords.indexOf(wrd.toUpperCase()) == -1) {
            actualWords.push(selectedWords.toUpperCase());
            continue;
        }

        //Check each chars to find a meaningful words
        for (let j = 0; j < wrd.length; j++) {
            let char_Match = selectedWords.indexOf(wrd[j]);
            let temp_matchedLetters = matchedLetters;
            if (char_Match == -1) {
                count_mismatch++;
                let key_Letter = getKey(wrd[j]);
                if (key_Letter) {
                    searchedWords.push(key_Letter);
                }
            } else {

                if (count_mismatch > 0)
                    matchedLetters = '';
                count_mismatch = 0;
                matchedLetters += wrd[j];
                if ((j + 1) < wrd.length) {
                    let word_Match = selectedWords.indexOf(matchedLetters + wrd[j + 1]);
                    if (word_Match == -1) {
                        if (matchedLetters.length == 1) {
                            let key_Letter = getKey(wrd[j]);
                            if (key_Letter) {
                                searchedWords.push(key_Letter);
                                matchedLetters = '';
                            }
                        } else if (splitArray.indexOf(matchedLetters) != -1) {
                            searchedWords.push(matchedLetters);
                            matchedLetters = '';
                        }
                    }
                }

            }
            //Break the loop if 2 consecutive elements are not available
            if (count_mismatch == 2) {
                matchedLetters = '';
                searchedWords = [];
                break;
            }


        }
        if (searchedWords.length > 0) {
            if (matchedLetters.length == 1) {
                let key_Letter = getKey(matchedLetters);
                if (key_Letter) {
                    searchedWords.push(key_Letter);
                }
            } else if (matchedLetters.length > 1 & (splitArray.indexOf(matchedLetters) != -1)) {
                searchedWords.push(matchedLetters);
            }
            if (searchedWords.join('').length == wrd.length && !/\d{2}/g.test(searchedWords.join('')) && actualWords.indexOf(searchedWords.join('-').toUpperCase()) == -1)
                actualWords.push(searchedWords.join('-').toUpperCase());
        }
    }

    if (actualWords.length > 0) {
        console.log(actualWords.join(','));
    } else {
        console.log("No Match Found");
    }
    rl.close();
}

module.exports = {
    letterCombinations,
    matchDictionary,
    generateCombinations,
    generateStringCombinations
};