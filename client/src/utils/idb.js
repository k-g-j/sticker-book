export function idbPromise(storeName, method, object) {
  return new Promise((resolve, reject) => {
    // open connectio to the database 'sticker-book' with version of 1
    const request = window.indexedDB.open('sticker-book', 1)

    // create variables to hold reference to the database, transaction (tx), and object store
    let db, tx, store

    // if version has changed (or if this is the first time using the database), run this method and create the three object stores
    request.onupgradeneeded = function (e) {
      const db = request.result
      // create object store for each type of data and set "primary" key index to the '_id' of the data store
      db.createObjectStore('goals', { keyPath: '_id' })
    }

    // handle any errors with connecting
    request.onerror = function (e) {
      console.log('There was an error')
    }

    request.onsuccess = function (e) {
      db = request.result
      tx = db.transaction(storeName, 'readwrite')
      store = tx.objectStore(storeName)

      db.onerror = function (e) {
        console.log('error', e)
      }
      // perform CRUD operations
      switch (method) {
        case 'put':
          store.put(object)
          resolve(object)
          break
        case 'get':
          const all = store.getAll()
          all.onsuccess = function () {
            resolve(all.result)
          }
          break
        case 'delete':
          store.delete(object._id)
          break
        default:
          console.log('No valid method')
          break
      }

      // when the transaction is complete, close the connection
      tx.oncomplete = function () {
        db.close()
      }
    }
  })
}