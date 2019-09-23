import { HashTable } from "./hashTable";
import { BST } from "./binarySearchTree";
var fs = require("fs");
var keywords = fs
  .readFileSync("palavras.txt")
  .toString()
  .replace(/[\r]/g, "")
  .toLowerCase()
  .split("\n");

var text = fs
  .readFileSync("indice.txt")
  .toString()
  .replace(/[\r]/g, "")
  .toLowerCase()
  .split("\n");

const mountIndex = (dataStructure, name) => {
  keywords.forEach(keyword => {
    const keywordLength = keyword.split(" ").length;
    text.forEach((phrase, index) => {
      if (phrase.indexOf(keyword) !== -1) {
        let includes;
        if (keywordLength > 1) {
          const words = phrase.split(" ");
          for (let i = 0; i < words.length; i++) {
            if (keywordLength > 1) {
              if (`${words[i]} ${words[i + 1]}` === keyword) {
                includes = true;
                break;
              }
            }
          }
        } else {
          includes = true;
        }
        if (includes) {
          const register = dataStructure.find(keyword);
          console.log(`${phrase} INCLUE ${keyword}`);
          if (!register) {
            if (name === "hash_table") {
              dataStructure.add(keyword, [index + 1]);
            } else if (name === "binary_tree") {
              console.log(`Não tinha ${keyword}`);
              dataStructure.add(keyword, [index + 1]);
            }
          } else {
            if (name === "hash_table") {
              register.push(index + 1);
            } else if (name === "binary_tree") {
              register.array.push(index + 1);
            }
          }
        }
      }
    });
  });
};

function useHashTable() {
  let ht = new HashTable();
  mountIndex(ht, "hash_table");
  console.log(">>> RESULTADO:");
  ht.values();
}

function useBinaryTree() {
  const bst = new BST();
  mountIndex(bst, "binary_tree");
  const stringArray = bst.inOrder();
  console.log(">>> RESULTADO:");
  stringArray.forEach(node =>
    console.log(`${node.data} ${[...new Set(node.array)].join(",")}`)
  );
}

const algorithm = process.argv[2];
if (algorithm === "bst") {
  useBinaryTree();
} else if (algorithm === "ht") {
  useHashTable();
} else {
  console.log(
    "Argumento inválido! Insira como argumento um dos valores disponíveis (bst/ht)"
  );
}
