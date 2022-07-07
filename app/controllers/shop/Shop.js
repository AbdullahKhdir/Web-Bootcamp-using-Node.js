'use strict';

const BaseController  = require("../../../core/controller/BaseController");
const BadRequestError = require("../../../core/error/types/BadRequestError");
const JsonResponse = require("../../../core/response/types/JsonResponse");
const Response = require("../../../core/response/types/Response");
const Cart            = require("../../models/shop/Cart");
const CartItem        = require("../../models/shop/CartItem");
const Product         = require("../../models/shop/Product");

/*
* Customer Actions 
*/
module.exports = class Shop extends BaseController{
    constructor() {
        super();
        /**
        * ! DYNAMIC ROUTES MUST BE THE LAST INDEX OF THE METHODS ARRAY
        */
        this.methods = [
            'products',
            'index',
            'cart',
            'checkout',
            'orders',
            'postCart',
            'deleteCartProduct',
            'dynProductInfo'
        ];
        this.product     = new Product();
        this.cart_object = new Cart();
        this.cart_items_object = new CartItem();

        /*
         ? DEMO OF THE CORS CONFIGURATIONS 
         */
        this.corsOptions = {
            origin:               'http://localhost:9009.com',
            methods:              ['GET'],
            preflightContinue:    false,
            maxAge:               86400,
            allowedHeaders:       ['Content-Type', 'Authorization'],
            optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
        }
    }

    products = () => this.getRouterInstance().get('/products', (req, res, next) => {
        const user_products = req.registered_user.getProducts();
        user_products
            .then(rows => {
                res.render(
                    'shop/product-list',
                    {
                        products: rows,
                        page_title: 'All Products',
                        path: '/products/',
                        lodash: this._
                    }
                );
            });
    });

    index = () => this.getRouterInstance().get('/shop', this.cors(this.corsOptions),(req, res, next) => {
        const user_products = req.registered_user.getProducts();
        // throw new BadRequestError('User not registered');
        // return new JsonResponse('SUCCESS', this._.pick({ 'a': 1, 'b': '2', 'c': 3 }, ['a', 'c'])).sendAsJson(res);
        user_products
            .then((rows) => {
                return this.render(
                    res,
                    'shop/index',
                    {
                        products: rows,
                        page_title: 'Shop',
                        path: '/',
                        lodash: this._
                    }
                );
            })
            .catch(err => console.log(err)); 
    });

    cart() {
        return this.getRouterInstance().get('/cart', (req, res, next) => {
            const user_cart = req.registered_user.getCart();
            if (!user_cart) {
                throw new Error('User is not availabel');
            }
            user_cart
            .then(rows => {
                rows['getProducts']
                .then(users_cart => {
                    users_cart['getProducts'].then(cart_products => {
                        if (cart_products.length > 0) {
                            if (!this._.isEmpty(cart_products)) {
                                this.product.filter({id: cart_products[0].product_id})
                                .then((rows) => {
                                    cart_products[0]['title'] = rows[0].title; 
                                    res.render(
                                        'shop/cart',
                                        {
                                            page_title: 'My Cart',
                                            path : '/cart/',
                                            products: cart_products,
                                            lodash: this._                                            
                                        }
                                    );
                                })
                                .catch(err => console.log(err));
                            }
                        }
                    });
                }); 
            })
            .catch(err => console.log(err));
        });
    }

    postCart() {
        return this.getRouterInstance().post('/cart', (req, res, next) => {
            const product_id = req.body.product_id ?? '';
            this.product.filter(product_id)
            .then(rows => {
                // this.cart_object.addProduct(product_id, product.price);
                res.redirect('/cart');
            })
            .catch((err) => { throw err});
        });
    }

    checkout() {
        return this.getRouterInstance().get('/checkout', (req, res, next) => {
            res.render(
                'shop/checkout',
                {
                    page_title: 'Checkout',
                    path : '/checkout/'
                }
            );
        });
    }

    orders() {
        return this.getRouterInstance().get('/orders', (req, res, next) => {
            res.render(
                'shop/orders',
                {
                    page_title: 'My Orders',
                    path : '/orders/'
                }
            );
        });
    }

    dynProductInfo() {
        return this.getRouterInstance().get('/products/:productId', (req, res, next) => {
            const product_id = +req.params.productId ?? false;
            const user_id = +req.registered_user.id ?? false;

            this.product.get({id: product_id, user_id}).then(rows => {
                if (rows) {
                    const product = rows[0];
                    res.render(
                        'shop/product-detail',
                        {
                            page_title: product.title ?? 'Product Details',
                            path: '/products/',
                            product: product,
                            lodash: this._
                        }
                    );
                }
            })
            .catch((err) => {
                throw err
            });
        });
    }
    
    deleteCartProduct() {
        return this.getRouterInstance().post('/cart/delete-item/', (req, res, next) => {
            const cart_product = req.body.product_id ?? false;
            if (cart_product) {
                Product.findById(cart_product, product => {
                    Cart.deleteProduct(cart_product, product.price);
                    res.redirect('/cart');
                });
            }
        });
    }
}