import { DataTypes, Model,Association, HasManyAddAssociationMixin, HasManyCountAssociationsMixin,
    HasManyCreateAssociationMixin, HasManyGetAssociationsMixin, HasManyHasAssociationMixin,
    HasManySetAssociationsMixin, HasManyAddAssociationsMixin, HasManyHasAssociationsMixin,
    HasManyRemoveAssociationMixin, HasManyRemoveAssociationsMixin, ModelDefined, Optional,
    Sequelize, InferAttributes, InferCreationAttributes, CreationOptional, NonAttribute, ForeignKey, HasOneCreateAssociationMixin, HasOneGetAssociationMixin, HasOneSetAssociationMixin, } from "sequelize";
  import { sequelize } from "."; // Pastikan Anda mengganti path sesuai dengan struktur direktori Anda
  
  class SchoolModule extends Model {
    declare unique_id: CreationOptional<number>;
    declare subscribed: boolean;
    declare tanggal_mulai: string;
    declare tanggal_berakhir: string;
  
    // createdAt can be undefined during creation
    declare createdAt: CreationOptional<Date>;
    // updatedAt can be undefined during creation
    declare updatedAt: CreationOptional<Date>;
  }
  
  SchoolModule.init(
    {
      unique_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
        unique: true,
      },
      subscribed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      tanggal_mulai: {
        type: DataTypes.STRING,
        defaultValue: null
      },
      tanggal_berakhir: {
        type: DataTypes.STRING,
        defaultValue: null
      },
  
      // timestamps
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      tableName: "schoolmodule", // Nama tabel di database
      sequelize, // Instance Sequelize yang digunakan
    }
  );
  
  export default SchoolModule;