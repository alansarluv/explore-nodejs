const Product = require('../models/product');

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
      res.redirect('admin/products');
    })
    .catch(err => {
      console.log(err);
    })
};

// exports.getEditProduct = (req, res, next) => {
//   let editMode = req.query.edit;
//   if(!editMode) {
//     return res.redirect('/');
//   }
//   const prodId = req.params.productId;
//   Product.findById(prodId, product => { // models/product ==> findById
//     if(!product) {
//       return res.redirect('/');
//     }
//     res.render('admin/edit-product', {
//       pageTitle: 'Edit Product',
//       path: '/admin/edit-product',
//       editing: editMode,
//       product: product
//     });
//   })
// };

// exports.postEditProduct = (req, res, next) => {
//   const prodId = req.body.productId;
//   const updatedTitle = req.body.title;
//   const updatedImageUrl = req.body.imageUrl;
//   const updatedPrice = req.body.price;
//   const updatedDesc = req.body.description;
//   const updatedProduct = new Product(
//     prodId,
//     updatedTitle,
//     updatedImageUrl,
//     updatedPrice,
//     updatedDesc
//   );
//   updatedProduct.save();            // models/product ==> save
//   res.redirect("/admin/products");
// };

// exports.getProducts = (req, res, next) => {
//   Product.fetchAll((products) => {  // models/product ==> fetchAll
//     res.render('admin/products', {
//       prods: products,
//       pageTitle: 'Admin products',
//       path: '/admin/products'
//     });
//   });
// };

// exports.postDeleteProduct = (req, res, next) => {
//   const prodId = req.body.productId;
//   Product.deleteById(prodId);                  // models/product ==> delete
//   res.redirect("/admin/products");
// };
