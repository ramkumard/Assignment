const assert = require('assert');
const phone = require('./phone');

const checkNumberToPhone = () => {
    console.log("Should print FLUKE,3-LUKE for the input 35853");
    let numbers = "35853";
    console.log('The Number is:', numbers);
    output = phone.letterCombinations(numbers);
}

const checkmatchDictionary = () => {
    console.log("Dictionary  should return meaningful word")
    console.log('The input is: call');
    output = phone.matchDictionary("call");
    console.log('The output is: '+ output)
    assert.equal(output, 'call');
}

const checkDictionary = () => {
    console.log("Dictionary should return empty")
    console.log('The input is: aaaa');
    output = phone.matchDictionary("aaa");
    console.log('The output is: '+ output)
    assert.equal(output, '');
}


const checkStringCombinations = () =>{
    console.log("Check the possible chars combinations")
    output = phone.generateCombinations(['a', 'b', 'c'])
    assert.deepEqual(output, ['a', 'ab', 'abc', 'b', 'bc', 'c' ]);
}

const checkgenerateStringCombinations = () => {
    console.log("Check the possible combinations for a number and check a word")
    let digits = "35853"
    let temp = []
    let result = []
    let Wordslist = [];
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
    phone.generateStringCombinations(digits, temp, result, Wordslist)
    assert.equal(result.indexOf('djtjd'), 0);
}

checkNumberToPhone();
checkmatchDictionary();
checkDictionary();
checkStringCombinations();
checkgenerateStringCombinations();
