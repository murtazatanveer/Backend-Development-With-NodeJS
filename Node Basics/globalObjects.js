// These are available anywhere in your Node.js app
console.log(global); // Global object (like window in browser)
console.log(__dirname); // Current directory path
console.log(__filename); // Current file path
console.log(module); // Current module reference
console.log(exports); // Shortcut to module.exports
console.log(require); // Function to import modules
console.log(process); // Information about current process

a = 10;

globalThis.a = 20;

console.log(a);
