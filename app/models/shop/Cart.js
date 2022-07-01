const BaseModel = require("../../../core/model/BaseModel");
const Lodash = require("../../utils/Lodash");

module.exports = class Cart extends BaseModel{

    constructor() {
        super();

        this.table = 'node.carts';
        this.reverse_references = {
            /*
             SELECT `products`.`id`, `products`.`title`, `products`.`price`, `products`.`imageUrl`, 
                    `products`.`description`, `products`.`created_at`, `products`.`updated_at`, `products`.`user_id`,
                    `products`.`price`, `cart_items`.`created_at`, `cart_items`.`updated_at`, `cart_items`.`created_at`, 
                    `cart_items`.`cart_id`, `cart_items`.`product_id` from products 
            INNER JOIN 
                    `cart_items` on `products`.`id` = ``cart_items`.`product_id` 
            AND     `cart_items`.`cart_id` = 1;

             */
            getCartItems: {
                table: 'node.cart_items',
                class: 'shop/CartItem',
                column: 'cart_id'
            }
        };
        this.columns = {
            id: {
                label: 'id'
            },
            user_id: {
                label: 'user_id',
                references: {
                    name: 'user_cart',
                    table: 'node.users',
                    class: 'shop/User'
                }
            },
            created_at: {
                label: 'created_at'
            },
            updated_at: {
                label: 'updated_at'
            }
        };

        this._ = new Lodash()._;
    }
};