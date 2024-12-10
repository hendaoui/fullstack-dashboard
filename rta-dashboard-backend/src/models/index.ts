import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../config/database';

// User
interface UserAttributes {
    id?: number;
    email: string;
    password: string;
    role: 'ADMIN' | 'USER';
    department: 'PTA' | 'HR';
}
interface UserCreationAttributes extends Optional<UserAttributes, 'id'> { }
export class User extends Model<UserAttributes & UserCreationAttributes> implements UserAttributes {
    public id!: number;
    public email!: string;
    public password!: string;
    public role!: 'ADMIN' | 'USER';
    public department!: 'PTA' | 'HR';
}
User.init(
    {
        id: { type: DataTypes.INTEGER, autoIncrement: true,primaryKey: true, allowNull: false },
        email: { type: DataTypes.STRING, unique: true, allowNull: false },
        password: { type: DataTypes.STRING, allowNull: false },
        role: { type: DataTypes.ENUM('ADMIN', 'USER'), allowNull: false },
        department: { type: DataTypes.ENUM('PTA', 'HR', ''), allowNull: true, defaultValue: '' },
    },
    { sequelize, modelName: 'user', timestamps: false, }
);

// Metric
interface MetricAttributes {
    id: number;
    name: string;
    department: 'PTA' | 'HR';
    description: string;
}
interface MetricsCreationAttributes extends Optional<MetricAttributes, 'id'> { }
export class Metric extends Model<MetricAttributes, MetricsCreationAttributes> implements MetricAttributes {
    public id!: number;
    public name!: string;
    public department!: 'PTA' | 'HR';
    public description!: string;
}
Metric.init(
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
        name: { type: DataTypes.STRING, allowNull: false },
        department: { type: DataTypes.ENUM('PTA', 'HR'), allowNull: false },
        description: { type: DataTypes.STRING },
    },
    { sequelize, modelName: 'metric', timestamps: false, }
);

// DataEntry
interface DataEntryAttributes {
    id: number;
    metric_id: number;
    value: string;
    entry_date: Date;
    last_update: Date;
    created_by: string;
}
interface DataEntryCreationAttributes extends Optional<DataEntryAttributes, 'id'> { }
export class DataEntry extends Model<DataEntryAttributes, DataEntryCreationAttributes> implements DataEntryAttributes {
    public id!: number;
    public metric_id!: number;
    public value!: string;
    public entry_date!: Date;
    public last_update!: Date;
    public created_by!: string;
}
DataEntry.init(
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
        metric_id: { type: DataTypes.INTEGER, allowNull: false },
        value: { type: DataTypes.STRING, allowNull: false },
        entry_date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
        last_update: { type: DataTypes.DATE },
        created_by: { type: DataTypes.STRING, allowNull: false },
    },
    { sequelize, modelName: 'data_entry', timestamps: false, }
);

User.sync();
Metric.sync();
DataEntry.sync();