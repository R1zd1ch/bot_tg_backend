const sequelize = reqire('../db');
const { DataTypes, Sequelize } = require('sequelize');

// таблички

const User = sequelize.define('user', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, },
	telegramId: { type: DataTypes.STRING, allowNull: false, unique: false, },
	firstName: { type: DataTypes.STRING, allowNull: false, },
	lastName: { type: DataTypes.STRING, },
	username: { type: DataTypes.STRING, },
	languageCode: { type: DataTypes.STRING, },
	authDate: { type: DataTypes.DATE, defaultValue: Sequelize.NOW, },

}, { timestamps: true, });


const Cart = sequelize.define('cart', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, },
	userId: { type: DataTypes.INTEGER, allowNull: false, references: { model: User, key: 'id', }, unique: true, },
}, { timestamps: true, });


const ProductType = sequelize.define('productType', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, },
  name: { type: DataTypes.STRING, allowNull: false, unique: true, },
}, { timestamps: true, });


const Product = sequelize.define('product', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, },
  title: { type: DataTypes.STRING, allowNull: false, },
  description: { type: DataTypes.STRING, allowNull: true, },
  typeId: { type: DataTypes.INTEGER, allowNull: false, references: { model: ProductType, key: 'id', },
  }, isPurchased: { type: DataTypes.BOOLEAN, defaultValue: false, },
}, { timestamps: true,});


const ProductImage = sequelize.define('productImage', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, }, imageUrl: { type: DataTypes.STRING, allowNull: false, },
  productId: { type: DataTypes.INTEGER, allowNull: false, references: { model: Product, key: 'id', }, },
}, { timestamps: true, });


const CartProduct = sequelize.define('cartProduct', {
  id: {	type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, }, cartId: { type: DataTypes.INTEGER,	allowNull: false, references: { model: Cart, key: 'id', }, }, productId: { type: DataTypes.UUID, allowNull: false, references: { model: Product, key: 'id', }, }, }, { timestamps: true, });

// связи

User.hasOne(Cart, { foreignKey: 'userId', onDelete: 'CASCADE' });
Cart.belongsTo(User, { foreignKey: 'userId' });

ProductType.hasMany(Product, { foreignKey: 'typeId', onDelete: 'CASCADE' });
Product.belongsTo(ProductType, { foreignKey: 'typeId' });

Product.hasMany(ProductImage, { foreignKey: 'productId', onDelete: 'CASCADE' });
ProductImage.belongsTo(Product, { foreignKey: 'productId' });

Cart.hasMany(CartProduct, { foreignKey: 'cartId', onDelete: 'CASCADE' });
CartProduct.belongsTo(Cart, { foreignKey: 'cartId' });

Product.hasMany(CartProduct, { foreignKey: 'productId', onDelete: 'CASCADE' });
CartProduct.belongsTo(Product, { foreignKey: 'productId' });

module.exports = {
	User,
	Cart,
	ProductType,
	ProductImage,
	Product,
	CartProduct,
};