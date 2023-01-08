const express = require("express");
const router = express.Router();

// AUT-CONTROLLERS
const AuthController = require("../controllers/auth/AuthController");

// ADMIN-CONTROLLERS
const AdminDashboardController = require("./../controllers/admin/AdminDashboardController");
const AdminCategoriesController = require("./../controllers/admin/AdminCategoriesController");
const AdminProductsController = require("./../controllers/admin/AdminProductsController");
const AdminOrdersController = require("./../controllers/admin/AdminOrdersController");
const AdminUsersController = require("./../controllers/admin/AdminUsersController");
const AdminSettingsController = require("./../controllers/admin/AdminSettingsController");

// USER-CONTROLLERS
const UserProfileController = require("./../controllers/user/UserProfileController");
const UserAddressesController = require("./../controllers/user/UserAddressesController");
const UserOrdersController = require("./../controllers/user/UserOrdersController");
const UserCartController = require("./../controllers/user/UserCartController");
const UserWishlistController = require("./../controllers/user/UserWishlistController");


/*
|==========================================================
| AUTH-ROUTES 
|==========================================================
*/
router.post("/login", AuthController.login);
router.post("/signup", AuthController.signup);
// router.post("/username-check", AuthController.usernameCheck);
// router.post("/email-check", AuthController.emailCheck);
// router.post("/set-user-attributes", userController.setUserAttributes);


/*
|==========================================================
| ADMIN-ROUTES
|==========================================================
*/
// DASHBOARD
router.get("/admin/dashboard", AdminDashboardController.index);

// CATEGORIES
router.get("/admin/categories", AdminCategoriesController.index);
router.get("/admin/category/create", AdminCategoriesController.create);
router.post("/admin/category/store", AdminCategoriesController.store);
router.get("/admin/category/edit", AdminCategoriesController.edit);
router.put("/admin/category/update", AdminCategoriesController.update);
router.delete("/admin/category/delete", AdminCategoriesController.destroy);
router.post("/admin/category/delete-multiple", AdminCategoriesController.destroyMultiple);

// PRODUCTS
router.get("/admin/products", AdminProductsController.index);
router.get("/admin/product/create", AdminProductsController.create);
router.post("/admin/product/store", AdminProductsController.store);
router.get("/admin/product/edit", AdminProductsController.edit);
router.put("/admin/product/update", AdminProductsController.update);
router.delete("/admin/product/delete", AdminProductsController.destroy);
router.post("/admin/product/delete-multiple", AdminProductsController.destroyMultiple);

// ORDERS
router.get("/admin/orders", AdminOrdersController.index);
router.get("/admin/order/show", AdminOrdersController.show);
router.put("/admin/order/update", AdminOrdersController.update);
router.delete("/admin/order/delete", AdminOrdersController.destroy);
router.post("/admin/order/delete-multiple", AdminOrdersController.destroyMultiple);

// USERS
router.get("/admin/users", AdminUsersController.index);
router.get("/admin/user/show", AdminUsersController.show);
router.put("/admin/user/update", AdminUsersController.update);
router.delete("/admin/user/delete", AdminUsersController.destroy);
router.post("/admin/user/delete-multiple", AdminUsersController.destroyMultiple);

// SETTINGS
router.get("/admin/settings/edit", AdminSettingsController.edit);
router.put("/admin/settings/update", AdminSettingsController.update);


/*
|==========================================================
| USER-ROUTES
|==========================================================
*/
// PROFILE
router.get("/user/profile", UserProfileController.edit);
router.put("/user/profile", UserProfileController.update);
router.delete("/user/profile", UserProfileController.destroy);

// ADDRESSES
router.get("/user/addresses", UserAddressesController.index);
router.get("/user/address/create", UserAddressesController.create);
router.post("/user/address/store", UserAddressesController.store);
router.get("/user/address/edit", UserAddressesController.edit);
router.put("/user/address/update", UserAddressesController.update);
router.delete("/user/address/delete", UserAddressesController.destroy);
router.post("/user/address/delete-multiple", UserAddressesController.destroyMultiple);

// ORDERS
router.get("/user/orders", UserOrdersController.index);
router.post("/user/order/store", UserOrdersController.store);
router.get("/user/order/show", UserOrdersController.show);
router.post("/user/order/cancel", UserOrdersController.cancel);

// CART
router.get("/user/cart-items", UserCartController.index);
router.put("/user/cart-items/add", UserCartController.add);
router.delete("/user/cart-items/remove-single", UserCartController.removeSingle);
router.post("/user/cart-items/remove-multiple", UserCartController.removeMultiple);

// WISHLIST
router.get("/user/wishlist-items", UserWishlistController.index);
router.post("/user/wishlist-item/add", UserWishlistController.store);
router.delete("/user/wishlist-items/remove-single", UserWishlistController.removeSingle);
router.post("/user/wishlist-items/remove-multiple", UserWishlistController.removeMultiple);



module.exports = router;