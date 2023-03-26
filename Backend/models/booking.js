const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {}
  Booking.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      guest_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      guest_email: {
        type: DataTypes.STRING,
        validate: {
          isEmail: true,
        }, 
        allowNull: false,
      },
      guest_phone: {
        type: DataTypes.STRING(15),
        allowNull: false,
      },
      checkin: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      checkout: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      total_guests: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      total_nights: {
        type: DataTypes.INTEGER,
        allowNull: false,
      }
    },
    {
      sequelize,
      tableName: "bookings",
      modelName: "Booking",
      timestamps: false,
    }
  );
  return Booking;
};
