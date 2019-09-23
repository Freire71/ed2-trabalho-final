import { HashTable } from "./hashTable";
import { BST } from "./binarySearchTree";
const fs = require("fs");
let keywords = fs
  .readFileSync("palavras.txt")
  .toString()
  .replace(/[\r]/g, "")
  .toLowerCase()
  .split("\n");

const text = fs
  .readFileSync("indice.txt")
  .toString()
  .replace(/[\r]/g, "")
  .toLowerCase()
  .split("\n");

// Remove palavras chaves duplicadas
keywords = [...new Set(keywords)];

const mountIndex = dataStructure => {
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
            dataStructure.add(keyword, [index + 1]);
          } else {
            register.push(index + 1);
          }
        }
      }
    });
  });
};

function useHashTable() {
  let ht = new HashTable();
  mountIndex(ht);
  console.log(">>> RESULTADO TABELA HASH:");
  ht.values();
  console.timeEnd(">>> Time:");
}

function useBinaryTree() {
  const bst = new BST();
  mountIndex(bst);
  console.log(">>> RESULTADO ÁRVORE BINÁRIA:");
  bst.inOrder();

  console.timeEnd(">>> Time:");
}

const algorithm = process.argv[2];
console.time(">>> Time:");

if (algorithm === "bst") {
  useBinaryTree();
} else if (algorithm === "ht") {
  useHashTable();
} else {
  console.log(
    "Argumento inválido! Insira como argumento um dos valores disponíveis (bst/ht)"
  );
}
