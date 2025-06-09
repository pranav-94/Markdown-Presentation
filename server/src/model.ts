import { DataType, DataTypes, Model } from "sequelize";
import sequelize from "./db";

class Slide extends Model {
    public id!: number;
    public title!: string;
    public markdown!: string;
    public layout!: string;
}

Slide.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      markdown: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      layout: {
        type: DataTypes.STRING,
        defaultValue: "default",
      },
    },
    {
      sequelize,
      modelName: "Slide",
    }
  );

export default Slide