import DefaultFunctionPane from "../Components/DefaultFunctionPane"

let defaultFunctions = [{
    name: 'Console', //name displayed on block
    code: 'console.log',//actual code
    //overall description of function
    description: 'The console.log() method outputs a message to the web console. The message may be a single string (with optional substitution values), or it may be any one or more JavaScript objects.',
    //meaningful name of parameters
    inputs: [
        'msg'
    ],
    //description of above parameters
    inputsDoc: [
        'A JavaScript string containing zero or more substitution strings.'
    ],
    //meaningful name of output
    output: []
},
{
    name: 'Timeout',
    code: 'setTimeout',
    description: 'The global setTimeout() method sets a timer which executes a function or specified piece of code once the timer expires.',
    inputs: [
        'callback',
        'time'
    ],
    inputsDoc: [
        'A function to be executed after the timer expires',
        'The time, in milliseconds that the timer should wait before the specified function or code is executed'
    ],
    output: []
},
{
    name: 'Absolute',
    code:'Math.abs',
    description: 'The Math.abs() function returns the absolute value of a number. That is, it returns x if x is positive or zero, and the negation of x if x is negative.',
    inputs: [
        'number'
    ],
    inputsDoc: ['a number'],
    output: ['number']
},
{
    name: 'cos',
    code:'Math.cos',
    description: 'The Math.cos() static function returns the cosine of the specified angle, which must be specified in radians.',
    inputs: ['number'],
    inputsDoc: ['The angle in radians for which to return the cosine.'],
    output: ['number']
},
{
    name: 'sin',
    code:'Math.sin',
    description: 'The Math.sin() function returns the sine of a number.',
    inputs: ['number'],
    inputsDoc: ['The angle in radians for which to return the sine'],
    output: ['number']
},
{
    name: 'tan',
    code:'Math.tan',
    description: 'The Math.tan() function returns the tangent of a number.',
    inputs: ['number'],
    inputsDoc: ['The angle in radians for which to return the tangent'],
    output: ['number']
},
{
    name: 'require',
    code:'require',
    description: 'The require() function returns obj',
    inputs: ['name'],
    inputsDoc: ['The name of file'],
    output: ['file/obj']
},
{
    name: 'Random',
    code:'Math.random',
    description: 'The Math.random() function returns a floating-point, pseudo-random number in the range 0 to less than 1 (inclusive of 0, but not 1) with approximately uniform distribution over that range',
    inputs: [],
    inputsDoc: [],
    output: ['number']
},
{
    name: 'Round',
    code:'Math.round',
    description: 'The Math.round() function returns the value of a number rounded to the nearest integer.',
    inputs: ['number'],
    inputsDoc: ['A number'],
    output: ['number']
},
{
    name: 'Max',
    code:'Math.max',
    description: 'The Math.max() function returns the largest of the zero or more numbers given as input parameters',
    inputs: ['value1, value2, ... , valueN'],
    inputsDoc: ['Zero or more numbers among which the largest value will be selected and returned.'],
    output: ['value']
},
{
    name: 'Min',
    code:'Math.min',
    description: 'The static function Math.min() returns the lowest-valued number passed into it',
    inputs: ['value1, value2, ..., valueN'],
    inputsDoc: ['Zero or more numbers among which the lowest value will be selected and returned.'],
    output: ['value']
},
{
    name: 'Square Root',
    code:'Math.sqrt',
    description: 'The Math.sqrt() function returns the square root of a number',
    inputs: ['number'],
    inputsDoc: ['The number for which square root is to be returned'],
    output: ['number']
},
{
    name: 'Power',
    code:'Math.pow',
    description: 'The Math.pow() static method, given two arguments, base and exponent, returns base^exponent',
    inputs: ['base','exponent'],
    inputsDoc: ['The base number', 'The exponent used to raise the base'],
    output: ['number']
},
{
    name: 'natural log',
    code:'Math.log',
    description: 'The Math.log() function returns the natural logarithm (base e) of a number, ln(x)',
    inputs: ['number'],
    inputsDoc: ['Number for which natural log is required'],
    output: ['number']
},
{
    name: 'log 10',
    code:'Math.log10',
    description: 'The Math.log10() function returns the base 10 logarithm of a number',
    inputs: ['number'],
    inputsDoc: ['number for which log with base 10 is required'],
    output: ['number']
},
{
    name: 'Array values',
    code:'values',
    description: 'The values() method returns a new array iterator object that contains the values for each index in the array',
    inputs: [],
    inputsDoc: [],
    output: ['Array']
},
{
    name: 'Fill Array',
    code:'fill',
    description: 'The fill() method changes all elements in an array to a static value, from a start index (default 0) to an end index (default array.length). It returns the modified array.',
    inputs: ['value', 'start', 'end'],
    inputsDoc: ['value to fill the array with, start and end positions are optional.'],
    output: []
},
{
    name: 'Filter Array',
    code:'filter',
    description: 'The filter() method creates a new array with all elements that pass the test implemented by the provided function.',
    inputs: ['callbackFn'],
    inputsDoc: ['function that will run on each element of the array'],
    output: []
},
{
    name: 'Map Array',
    code:'map',
    description: 'The map() method creates a new array populated with the results of calling a provided function on every element in the calling array. ',
    inputs: ['callbackFn'],
    inputsDoc: ['function that will run on each element of array'],
    output: ['Array']
},
{
    name: 'pop',
    code:'pop',
    description: 'The pop() method removes the last element from an array and returns that element. This method changes the length of the array.',
    inputs: [],
    inputsDoc: [],
    output: ['element/NaN']
}
,
{
    name: 'push',
    code:'push',
    description: 'The push() method adds one or more elements to the end of an array and returns the new length of the array.',
    inputs: ['elementN'],
    inputsDoc: ['The element(s) to add to the end of the array.'],
    output: ['length']
}
,
{
    name: 'reverse',
    code:'reverse',
    description: 'The reverse() method reverses an array in place. The first array element becomes the last, and the last array element becomes the first.',
    inputs: [],
    inputsDoc: [],
    output: ['Array']
}
,
{
    name: 'shift',
    code:'shift',
    description: 'The shift() method removes the first element from an array and returns that removed element. This method changes the length of the array.',
    inputs: [],
    inputsDoc: [],
    output: ['element']
}
,
{
    name: 'concat',
    code:'concat',
    description: 'The concat() method concatenates the string arguments to the calling string and returns a new string.',
    inputs: ['strN'],
    inputsDoc: ['One or more strings to concatenate to str.'],
    output: ['string']
}
,
{
    name: 'endsWith',
    code:'endsWith',
    description: 'The endsWith() method determines whether a string ends with the characters of a specified string, returning true or false as appropriate.',
    inputs: ['searchString', 'length'],
    inputsDoc: ['The characters to be searched for at the end of str.', 'length if provided is used as the length of str. Defaults to str.length    '],
    output: ['boolean']
}
,
{
    name: 'includes',
    code:'includes',
    description: 'The includes() method performs a case-sensitive search to determine whether one string may be found within another string, returning true or false as appropriate.',
    inputs: ['searchString', 'position'],
    inputsDoc: ['A string to be searched for within str', 'The position within the string at which to begin searching for searchString. (Defaults to 0.)'],
    output: ['boolean']
}
,
{
    name: 'match',
    code:'match',
    description: 'The match() method retrieves the result of matching a string against a regular expression',
    inputs: ['regexp'],
    inputsDoc: ['A regular expression object. If regexp is a non-RegExp object, it is implicitly converted to a RegExp by using new RegExp(regexp)'],
    output: ['Array']
}
,
{
    name: 'to String',
    code:'toString',
    description: 'The toString() method returns a string representing the specified object.',
    inputs: [],
    inputsDoc: [],
    output: ['string']
}
,
{
    name: 'upper case',
    code:'toUpperCase',
    description: 'The toUpperCase() method returns the calling string value converted to uppercase (the value will be converted to a string if it isnt one).',
    inputs: [],
    inputsDoc: ['A new string representing the calling string converted to upper case.'],
    output: ['string']
}
,
{
    name: 'lower case',
    code:'toLowerCase',
    description: 'The toLowerCase() method returns the calling string value converted to lower case.',
    inputs: [],
    inputsDoc: [],
    output: ['string']
}
,
{
    name: 'search',
    code:'search',
    description: 'The search() method executes a search for a match between a regular expression and this String object.',
    inputs: ['regexp'],
    inputsDoc: ['regexp object '],
    output: ['index']
}
,
{
    name: 'JSON Parse',
    code:'JSON.parse',
    description: 'Json string to object',
    inputs: ['str'],
    inputsDoc: ['string'],
    output: ['JSON obj']
}
,
{
    name: 'JSON Stringify',
    code:'JSON.stringify',
    description: 'Json object to string',
    inputs: ['obj'],
    inputsDoc: ['object'],
    output: ['JSON string']
}
,
{
    name: 'Date now',
    code:'Date.now',
    description: 'Current time in ms',
    inputs: [],
    inputsDoc: [],
    output: ['ms']
}
,
{
    name: 'res.status',
    code:'res.status',
    description: 'Set status `code`',
    inputs: ['code'],
    inputsDoc: ['code'],
    output: ['ServerResponse']
}
,
{
    name: 'res.send',
    code:'res.send',
    description: 'Send a response',
    inputs: ['any'],
    inputsDoc: ['string|number|boolean|object|Buffer'],
    output: []
}
,
{
    name: 'res.json',
    code:'res.json',
    description: 'Send JSON response',
    inputs: ['any'],
    inputsDoc: ['string|number|boolean|object'],
    output: []
}
,
{
    name: 'res.sendStatus',
    code:'res.sendStatus',
    description: 'Send given HTTP status code',
    inputs: ['code'],
    inputsDoc: ['code'],
    output: []
}
,
{
    name: 'res.sendFile',
    code:'res.sendFile',
    description: 'Transfer the file at the given `path`',
    inputs: ['path'],
    inputsDoc: ['filepath'],
    output: []
}
,
{
    name: 'res.redirect',
    code:'res.redirect',
    description: 'Redirect to the given `url`',
    inputs: ['url'],
    inputsDoc: ['Redirect url'],
    output: []
}
,
{
    name: 'res.render',
    code:'res.render',
    description: 'Render `view`',
    inputs: ['view'],
    inputsDoc: ['view'],
    output: []
}
]

export default defaultFunctions
