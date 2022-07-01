'use strict';

const BaseController = require("../../../core/controller/BaseController");
const Product = require("../../models/shop/Product");
const Lodash = require("../../utils/Lodash");

/*
* Admin Actions 
*/
module.exports = class Admin extends BaseController {
    
    constructor() {
        super();
        this.methods = [
            'product',
            'addProduct',
            'products',
            'postEditedProduct',
            'deleteProduct',
            'editProduct'
        ];
        this.product_object = new Product();
        this._ = new Lodash()._;
    }

    product() {
        return this.getRouterInstance().get('/admin/add-product', (req, res, next) => {
            res.render(
                'admin/add-product',
                {
                    page_title: 'Add Product',
                    path : '/admin/add-product/'
                }
            );
        });
    }

    editProduct() {
        return this.getRouterInstance().get('/admin/edit-product/:product_id', (req, res, next) => {
            const product_id = +req.params.product_id ?? false;
            const user_id    = +req.registered_user.id;
            
            if (this._.isNumber(user_id) && this._.isNumber(product_id)) {
                this.product_object.filter({id: product_id, user_id: user_id})
                .then(rows => {
                    if (!this._.isEmpty(rows)) {
                        const product = rows[0];
                        res.render(
                            'admin/edit-product',
                            {
                                page_title: 'Edit Product',
                                path : '/admin/edit-product/',
                                product_id: product_id,
                                // editing: edit_mode,
                                product: product
                            }
                        );
                    } else {
                        res.redirect('/products/');
                    }
                })
                .catch((err) => {
                    throw err;
                });
            } else if (this._.isNumber(product_id)) {
                // this.product_object.filter(product_id)
                // .then(rows => {
                //     const product = rows[0];
                //     res.render(
                //         'admin/edit-product',
                //         {
                //             page_title: 'Edit Product',
                //             path : '/admin/edit-product/',
                //             product_id: product_id,
                //             // editing: edit_mode,
                //             product: product
                //         }
                //     );
                // })
                // .catch((err) => {
                //     throw err;
                // });
            } else {
                return res.redirect('/');
            }
        });
    }

    postEditedProduct() {
        return this.getRouterInstance().post('/admin/edit-product/', (req, res, next) => {
            const product_id = +req.body.product_id ?? false;
            const title = req.body.title ?? false;
            const price = req.body.price ?? false;
            const description = req.body.description ?? false;
            const image = req.body.imageUrl ?? false;

            const values = {
                title: title,
                price: price,
                description: description,
                imageUrl: image
            };

            if (product_id) {
                this.product_object.update(values, product_id).then((result) => {
                    if (result[0].affectedRows) {
                        return res.redirect('/admin/products');
                    }
                }).catch((err) => {
                    throw err;
                });
            }
        });
    }

    addProduct() {
        return this.getRouterInstance().post('/admin/add-product', (req, res, next) => {
            const title       = req.body.title;
            const imageUrl    = req.body.imageUrl;
            const description = req.body.description;
            const price       = req.body.price;
            const user_id     = req.registered_user.id;

            this.product_object.create({title: title, imageUrl: imageUrl, description: description, price: price, user_id: user_id}).then((results) => {
                const primary_key = results[0].insertId
                if (primary_key) {
                    res.redirect('/');
                }
                res.end();
            }).catch((err) => {
                throw err;
            });
        });
    }

    deleteProduct() {
        return this.getRouterInstance().post('/admin/delete-product/', (req, res, next) => {
            const product_id = req.body.product_id ?? false;
            const user_id = +req.registered_user.id ?? false;
            
            if (product_id && user_id) {
                this.product_object.get({id: product_id, user_id: user_id})
                    .then(rows => {
                       if (!this._.isEmpty(rows)) {
                            const id = rows[0].id;
                            this.product_object.delete(id).then((result) => {
                                res.redirect('/admin/products/');
                            }).catch((err) => {
                                throw err
                            });                
                        }
                    })
                    .catch(err => console.log(err));
            }
        });
    }

    products() {
        return this.getRouterInstance().get('/admin/products', (req, res, next) => {
            const user_products = req.registered_user.getProducts();
            user_products
                .then(rows => {
                    res.render(
                        'admin/products',
                        {
                            products: rows,
                            page_title: 'Admin Products',
                            path : '/admin/products/'
                        }
                    );
                });
        });
    }
}