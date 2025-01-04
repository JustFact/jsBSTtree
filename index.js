function Node() {
  let data;
  let left = null;
  let right = null;

  return {
    data,
    left,
    right,
  };
}

function BSTtree(arr) {
  let root = { node: null };
  let cleanArray;

  const cleanUpArray = (arr) => {
    for (let i = 0; i < arr.length; i++) {
      for (let j = i + 1; j < arr.length; j++) {
        let temp;
        if (arr[i] > arr[j]) {
          temp = arr[j];
          arr[j] = arr[i];
          arr[i] = temp;
        }
      }
    }
    let cleanArr = [];
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] !== arr[i + 1]) {
        cleanArr.push(arr[i]);
      }
    }
    return cleanArr;
  };

  const buildTree = (arr, start, end) => {
    if (start > end) {
      return null;
    }

    let mid = Math.floor((start + end) / 2);

    let node = Node();
    node.data = arr[mid];

    node.left = buildTree(arr, start, mid - 1);
    node.right = buildTree(arr, mid + 1, end);

    return node;
  };

  const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };

  const insert = (value) => {
    let currentNode = root.node;
    let node = Node();
    node.data = value;
    while (currentNode) {
      if (currentNode.data === value) {
        break;
      }
      if (currentNode.data > value && currentNode.left) {
        currentNode = currentNode.left;
      } else if (currentNode.data < value && currentNode.right) {
        currentNode = currentNode.right;
      } else if (currentNode.data < value) {
        currentNode.right = node;
        break;
      } else if (currentNode.data > value) {
        currentNode.left = node;
        break;
      }
    }
  };

  const deleteItem = (value) => {
    let currentNode = root.node;
    let lastNode;
    while (currentNode) {
      if (currentNode.data === value) {
        //If the value exists then the following code will run
        if (currentNode.left === null && currentNode.right === null) {
          //if found value is a leaf node
          if (lastNode.pos === "l") {
            lastNode.node.left = null;
          } else if (lastNode.pos === "r") {
            lastNode.node.right = null;
          }
        } else if (
          (currentNode.left !== null && currentNode.right === null) ||
          (currentNode.left === null && currentNode.right !== null)
        ) {
          //if found value has a single child
          if (lastNode.pos === "l") {
            if (currentNode.left) {
              lastNode.node.left = currentNode.left;
            } else if (currentNode.right) {
              lastNode.node.left = currentNode.right;
            }
          } else if (lastNode.pos === "r") {
            if (currentNode.left) {
              lastNode.node.right = currentNode.left;
            } else if (currentNode.right) {
              lastNode.node.right = currentNode.right;
            }
          }
        } else if (currentNode.left !== null && currentNode.right !== null) {
          //if found value has both child

          let successorNode = currentNode.right;
          let successorParent = currentNode;
          while (successorNode.left) {
            successorParent = successorNode;
            successorNode = successorNode.left;
          }

          if (currentNode === root.node) {
            successorParent.left = successorNode.right;
            successorNode.left = root.node.left;
            successorNode.right = root.node.right;
            root.node = successorNode;
          } else {
            if (successorParent !== currentNode) {
              successorParent.left = successorNode.right;
            } else {
              successorParent.right = successorNode.right;
            }
            successorNode.left = currentNode.left;
            successorNode.right = currentNode.right;

            if (!lastNode) {
              root.node = successorNode;
            } else if (lastNode.pos === "l") {
              lastNode.node.left = successorNode;
            } else if (lastNode.pos === "r") {
              lastNode.node.right = successorNode;
            }
          }
        }
        // exiting function after deleting the node
        return;
      } else if (currentNode.data > value) {
        //traversing left subtree while caching last node
        lastNode = { node: currentNode, pos: "l" };
        currentNode = currentNode.left;
      } else if (currentNode.data < value) {
        //traversing right subtree while caching last node
        lastNode = { node: currentNode, pos: "r" };
        currentNode = currentNode.right;
      }
    }
    //if no value is found then the function simply ends
  };

  const find = (value) => {
    let currentNode = root.node;
    while (currentNode) {
      if (currentNode.data === value) {
        return currentNode;
      } else if (currentNode.data > value) {
        currentNode = currentNode.left;
      } else if (currentNode.data < value) {
        currentNode = currentNode.right;
      } else {
        return null;
      }
    }
  };

  const levelOrder_iteration = (callback) => {
    if (!callback) {
      throw new Error("A callback is required");
    }
    let queue = [root.node];
    while (queue.length !== 0) {
      let node = queue.shift();
      callback(node);
      if (node.left !== null) {
        queue.push(node.left);
      }
      if (node.right !== null) {
        queue.push(node.right);
      }
    }
  };

  const levelOrder_recursion = (callback, queue = [root.node]) => {
    if (!callback) {
      throw new Error("A callback is required");
    }
    if (queue.length === 0) {
      return;
    }

    let node = queue.shift();
    callback(node);
    if (node.left) {
      queue.push(node.left);
    }
    if (node.right) {
      queue.push(node.right);
    }
    levelOrder_recursion(callback, queue);
  };

  const inOrder = (callback, node = root.node) => {
    if (!callback) {
      throw new Error("A callback is required");
    }
    if (!node) {
      return;
    }
    inOrder(callback, node.left);
    callback(node);
    inOrder(callback, node.right);
  };

  const preOrder = (callback, node = root.node) => {
    if (!callback) {
      throw new Error("A callback is required");
    }
    if (!node) {
      return;
    }
    callback(node);
    preOrder(callback, node.left);
    preOrder(callback, node.right);
  };

  const postOrder = (callback, node = root.node) => {
    if (!callback) {
      throw new Error("A callback is required");
    }
    if (!node) {
      return;
    }
    postOrder(callback, node.left);
    postOrder(callback, node.right);
    callback(node);
  };

  const height = (node = root.node) => {
    if (!node) {
      return -1;
    }
    let left = 1 + height(node.left);
    let right = 1 + height(node.right);
    return left > right ? left : right;
  };

  const depth = (node) => {
    if (!node) {
      return 0;
    }

    let currentNode = root.node;
    let result = 0;
    while (currentNode) {
      if (currentNode.data > node.data) {
        result = result + 1;
        currentNode = currentNode.left;
      } else if (currentNode.data < node.data) {
        result = result + 1;
        currentNode = currentNode.right;
      } else if (currentNode.data === node.data) {
        return result;
      }
    }
    return null;
  };

  const isBalanced = (node = root.node) => {
    if (!node) {
      return true;
    }

    if (Math.abs(height(node.left) - height(node.right)) > 1) {
      return false;
    }

    return isBalanced(node.left) && isBalanced(node.right);
  };

  const rebalance = () => {
    let arr = [];
    inOrder((node) => arr.push(node.data));
    root.node = buildTree(arr, 0, arr.length - 1);
  };

  cleanArray = cleanUpArray(arr);
  root.node = buildTree(cleanArray, 0, cleanArray.length - 1);
  return {
    root,
    prettyPrint,
    insert,
    deleteItem,
    find,
    levelOrder_iteration,
    levelOrder_recursion,
    inOrder,
    preOrder,
    postOrder,
    height,
    depth,
    isBalanced,
    rebalance,
  };
}

function randomArray(max) {
  let arr = [];
  while (arr.length < max) {
    arr.push(Math.floor(Math.random() * max));
  }
  return arr;
}
let tree = BSTtree(randomArray(100));
console.log(tree.isBalanced());
tree.prettyPrint(tree.root.node);
console.log("Level Order:");
tree.levelOrder_iteration((node) => console.log(node.data));
console.log("In Order:");
tree.inOrder((node) => console.log(node.data));
console.log("Pre Order:");
tree.preOrder((node) => console.log(node.data));
console.log("Post Order:");
tree.postOrder((node) => console.log(node.data));

let newArr = randomArray(200);
newArr.forEach((e) => tree.insert(e));
console.log(tree.isBalanced());
tree.prettyPrint(tree.root.node);
tree.rebalance();
console.log(tree.isBalanced());
tree.prettyPrint(tree.root.node);
console.log("Level Order:");
tree.levelOrder_recursion((node) => console.log(node.data));
console.log("In Order:");
tree.inOrder((node) => console.log(node.data));
console.log("Pre Order:");
tree.preOrder((node) => console.log(node.data));
console.log("Post Order:");
tree.postOrder((node) => console.log(node.data));
