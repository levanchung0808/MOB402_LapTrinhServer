const productModel = require("./product_model");

const get = async (page, size) => {
  //select id,name from products
  // const items = products.slice((page - 1) * size, page * size);
  const items = await productModel
    .find()
    .skip((page - 1) * size)
    .limit(size);
    console.log(items)
  return items;
};

const getById = async (id) => {
  const product = products.find((product) => product._id.toString() == id);
  return product;
};

const insert = async (product) => {
  const p = {
    name: product.name,
    price: product.price,
    quantity: product.quantity,
    image: product.image,
    category: product.category,
  };
  products.push(p);
};

const update = async (id, product) => {
  const p = products.find((p) => p._id.toString() == id);
  p.name = product.name;
  p.price = product.price;
  p.quantity = product.quantity;
  p.image = product.image ? product.image : p.image;
  p.category = product.category;
};

const remove = async (id) => {
  products = products.filter((p) => p._id.toString() != id.toString());
  return products;
};

module.exports = { get, getById, insert, update, remove };

var products = [
  {
    _id: 52,
    name: "Golden-mantled ground squirrel",
    price: 28,
    quantity: 99,
    category: 1,
    image:
      "https://community.akamai.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXU5A1PIYQNqhpOSV-fRPasw8rsUFJ5KBFZv668FFQxnaecIT8Wv9rilYTYkfTyNuiFwmhUvpZz3-2Z9oqg0Vew80NvZzuiJdeLMlhpwFO-XdA/360fx360f",
  },
  {
    _id: 74,
    name: "Duck, blue",
    price: 92,
    quantity: 62,
    category: 2,
    image:
      "https://community.akamai.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXU5A1PIYQNqhpOSV-fRPasw8rsUFJ5KBFZv668FFQwnfCcJmxDv9rhwIHZwqP3a-uGwz9Xv8F0j-qQrI3xiVLkrxVuZW-mJoWLMlhpWhFkc9M/360fx360f",
  },
  {
    _id: 97,
    name: "Pied avocet",
    price: 61,
    quantity: 98,
    category: 3,
    image:
      "https://community.akamai.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou-6kejhz2v_Nfz5H_uO1gb-Gw_alIITSj3lU8Pp8j-3I4IHKhFWmrBZyYDz2IobGcwdoYFCG8lW4l7jnjMC6vZybyHVk7CEjtHaMyh20iBsdbfsv26IzXLrUVA/360fx360f",
  },
  {
    _id: 100,
    name: "Rufous-collared sparrow",
    price: 96,
    quantity: 42,
    category: 4,
    image:
      "https://community.akamai.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXU5A1PIYQNqhpOSV-fRPasw8rsUFJ5KBFZv668FFQxnaecIT8Wv9rilYTYkfTyNuiFwmhUvpZz3-2Z9oqg0Vew80NvZzuiJdeLMlhpwFO-XdA/360fx360f",
  },
  {
    _id: 21,
    name: "Northern fur seal",
    price: 90,
    quantity: 6,
    category: 5,
    image:
      "https://community.akamai.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXU5A1PIYQNqhpOSV-fRPasw8rsUFJ5KBFZv668FFQxnaecIT8Wv9rilYTYkfTyNuiFwmhUvpZz3-2Z9oqg0Vew80NvZzuiJdeLMlhpwFO-XdA/360fx360f",
  },
  {
    _id: 17,
    name: "White-mantled colobus",
    price: 54,
    quantity: 43,
    category: 6,
    image:
      "https://community.akamai.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXU5A1PIYQNqhpOSV-fRPasw8rsUFJ5KBFZv668FFQxnaecIT8Wv9rilYTYkfTyNuiFwmhUvpZz3-2Z9oqg0Vew80NvZzuiJdeLMlhpwFO-XdA/360fx360f",
  },
];
