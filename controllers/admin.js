const mongodb = require('mongodb');
const Product =  require('../models/product');

const ObjectId = mongodb.ObjectId;

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const price = req.body.price;
  const imageUrl = req.body.imageUrl;
  const description = req.body.description;
  const product = new Product(title, price, imageUrl, description);

  product
    .save()                       // models/product ==> save
    .then(result => {
      console.log('Created Product');
      res.redirect('products');
    })
    .catch(err => {
      console.log(err);
    })
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if(!editMode) {
    return res.redirect('/');
  }
  const prodId = req.params.productId;
  Product.findById(prodId) // models/product ==> findById
    .then(product => { 
    if(!product) {
      return res.redirect('/');
    }
    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing: editMode,
      product: product
    })
    .catch(err => console.log(err));
  })
};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedImageUrl = req.body.imageUrl;
  const updatedPrice = req.body.price;
  const updatedDesc = req.body.description;

  Product.findById(prodId)
    .then(productData => {
      const product = new Product(
        updatedTitle,
        updatedPrice,
        updatedImageUrl,
        updatedDesc,
        new ObjectId(prodId)
      );
      product
        .save()                             // models/product ==> save
        .then( result => {
          console.log("Updated Product!");
          res.redirect("/admin/products");
        })
        .catch(err => console.log(err));
    })
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll()  // models/product ==> fetchAll
    .then(products => {
      res.render('admin/products', {
        prods: products,
        pageTitle: 'Admin products',
        path: '/admin/products'
      });
  });
};

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.deleteById(prodId)
    .then(() => {
      console.log('DESTROYED PRODUCT')
      res.redirect("/products");
    })
    .catch(err => console.log(err));
};
