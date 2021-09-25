// variable to hold the db connection
let db;

// connection to indexedDB database called pizza_hunt, set it to version 1
const request = indexedDB.open('pizza_hunt', 1);

// this event emits if the database version changes (nonexistant to version 1, 2, etc)
// this event will emit if the database version changes (nonexistant to version 1, v1 to v2, etc.)
request.onupgradeneeded = function(event) {
    // save a reference to the database 
    const db = event.target.result;
    // create an object store (table) called `new_pizza`, set it to have an auto incrementing primary key of sorts 
    db.createObjectStore('new_pizza', { autoIncrement: true });
  };

// upon a successful
request.onsuccess = function(event) {
    //when db is successfully crteated with its object store (from onupgradeneeded above), 
    //or from established connection, save reference to db in a global variable
    db = event.target.result;

    //check if app is online. if yes, run uploadPizza() to send local db data to api
    if (navigator.online) {
        uploadPizza(); 
    }
};

request.onerror = function(event) {
    // log error here
    console.log(event.target.errorCode)
}


// This function will be executed if we attempt to submit a new pizza and there's no internet connection
function saveRecord(record) {
    // open a new transaction with the database with read and write permissions 
    const transaction = db.transaction(['new_pizza'], 'readwrite');
  
    // access the object store for `new_pizza`
    const pizzaObjectStore = transaction.objectStore('new_pizza');
  
    // add record to your store with add method
    pizzaObjectStore.add(record);
  }

function uploadPizza() {
    // open a transaction on the db\const transaction = db.transaction(['new_pizza'], 'readwrite');

    // access the object store
    const pizzaObjectStore = transaction.objectStore('new_pizza');

    // get all record from store and send to a variable
    const getAll = pizzaObjectStore.getAll();

    // upon successful getAll execution, run this 
    getAll.onsuccess = function() {
        // if there's data in the IDB, send it to the API
        if (getAll.result.length > 0) {
            fetch('/api/pizzas', {
                method: 'POST',
                body: JSON.stringify(getAll.result),
                headers: {
                    Accept: 'application/json, text/plain, */*',
                    'Content-Type': 'application.json'
                }
            })
            .then(response => response.json())
            .then(serverResponse => {
                if (serverResponseResponse.message) {
                    throw new Error(serverResponse);
                }
                // open one more transaction
                const transaction = db.transaction(['new-pizza'], 'readwrite');
                // access the new_pizza object store
                const pizzaObjectStore = transaction.objectStore('new_pizza');
                // clear all items in the store
                pizzaObjectStore.clear();

                alert('All saved pizza has been submitted!');
            })
            .catch(err => {
                console.log(err);
            });
        }
    }
}

// listen for app coming back online
window.addEventListener('online', uploadPizza);