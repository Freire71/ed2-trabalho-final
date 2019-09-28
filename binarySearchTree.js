class Node {
  constructor(data, array = []) {
    this.data = data;
    this.left = null;
    this.right = null;
    this.array = array;
  }
}

export class BST {
  constructor() {
    this.root = null;
  }

  add(data, array = []) {
    var node = new Node(data, array);

    if (!this.root) {
      this.root = node;
      return this;
    }
    let current = this.root;
    while (current) {
      // procura por duplicados
      if (data === current.data) {
        return;
      }

      // inserção no nó da esquerda
      if (data < current.data) {
        if (!current.left) {
          current.left = node;
          break;
        }
        current = current.left;
      }

      // inserção no nó da direita
      if (data > current.data) {
        if (!current.right) {
          current.right = node;
          break;
        }
        current = current.right;
      }
    }
  }

  find(data) {
    if (!this.root) return null;
    let current = this.root;

    while (current) {
      if (data == current.data) return current.array;

      if (current.right && data > current.data) {
        current = current.right;
      } else {
        current = current.left;
      }
    }

    return false;
  }

  inOrder() {
    const data = [];

    function move(node) {
      if (node.left) move(node.left);
      data.push(node);
      if (node.right) move(node.right);
    }
    move(this.root);

    data.forEach(node => {
      console.log(`${node.data} ${[node.array].join(",")}`);
    });
  }
}
