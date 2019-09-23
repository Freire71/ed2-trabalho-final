/* Hash Table */

export var hash = (string, max) => {
  var hash = 0;
  for (var i = 0; i < string.length; i++) {
    hash += string.charCodeAt(i);
    // console.log(`charcorde: ${string.charCodeAt(i)}`);
  }
  // console.log({ hash });
  // console.log(`hash % max = ${hash % max}`);
  return hash % max;
};

export let HashTable = function() {
  let storage = [];
  const storageLimit = 100;

  this.print = function() {
    console.log(JSON.stringify(storage, undefined, 2));
  };

  this.add = function(key, value) {
    var index = hash(key, storageLimit);
    if (storage[index] === undefined) {
      storage[index] = [[key, value]];
    } else {
      var inserted = false;
      for (var i = 0; i < storage[index].length; i++) {
        if (storage[index][i][0] === key) {
          storage[index][i][1] = value;
          inserted = true;
        }
      }
      if (inserted === false) {
        storage[index].push([key, value]);
      }
    }
  };

  this.remove = function(key) {
    var index = hash(key, storageLimit);
    if (storage[index].length === 1 && storage[index][0][0] === key) {
      delete storage[index];
    } else {
      for (var i = 0; i < storage[index].length; i++) {
        if (storage[index][i][0] === key) {
          delete storage[index][i];
        }
      }
    }
  };

  this.find = function(key) {
    var index = hash(key, storageLimit);
    if (storage[index] === undefined) {
      return undefined;
    } else {
      for (var i = 0; i < storage[index].length; i++) {
        if (storage[index][i][0] === key) {
          return storage[index][i][1];
        }
      }
    }
  };

  this.values = function() {
    const flatValues = [];
    storage.forEach(bucket => {
      if (bucket.length === 1) {
        flatValues.push(bucket[0]);
      } else {
        bucket.forEach(value => {
          flatValues.push(value);
        });
      }
    });
    flatValues.sort(function(a, b) {
      if (a[0] > b[0]) return 1;
      if (a[0] < b[0]) return -1;
      return 0;
    });

    flatValues.forEach(value => {
      console.log(`${value[0]} ${value[1].join(",")} `);
    });
  };
};
