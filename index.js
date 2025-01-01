function Node() {
  let data;
  let left;
  let right;

  return {
    data,
    left,
    right,
  };
}

function BSTtree(arr) {
  let root;
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
  cleanArray = cleanUpArray(arr);
  root = buildTree(cleanArray, 0, cleanArray.length - 1);
  return {
    root,
    prettyPrint,
  };
}

let arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
let tree = BSTtree(arr);
tree.prettyPrint(tree.root);
