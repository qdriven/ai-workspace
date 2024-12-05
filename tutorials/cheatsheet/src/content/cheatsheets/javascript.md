---
title: JavaScript Cheatsheet
description: Essential JavaScript concepts and snippets
category: Programming
tags: [javascript, web, frontend]
---

# JavaScript Cheatsheet

## Variables and Data Types

```javascript
// Variable declarations
let name = 'John';
const age = 30;
var oldStyle = 'not recommended';

// Data types
const string = 'Hello';
const number = 42;
const boolean = true;
const array = [1, 2, 3];
const object = { key: 'value' };
```

## Functions

```javascript
// Function declaration
function add(a, b) {
  return a + b;
}

// Arrow function
const multiply = (a, b) => a * b;

// Function with default parameters
const greet = (name = 'Guest') => `Hello ${name}!`;
```

## Arrays

```javascript
const fruits = ['apple', 'banana', 'orange'];

// Array methods
fruits.push('mango');     // Add to end
fruits.pop();            // Remove from end
fruits.unshift('grape'); // Add to start
fruits.shift();         // Remove from start

// Modern array methods
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(n => n * 2);
const even = numbers.filter(n => n % 2 === 0);
const sum = numbers.reduce((acc, n) => acc + n, 0);
```
