import { Model } from "sequelize"; // we make models by extending the class from the Model package of the sequelize

class EcSuppliers extends Model {
  // model defines the structure of the table
  public id?: number;
  public full_name!: string;
  public e_mail!: string;
  public password!: string;
  public profile_pic!: Buffer | null;
  public registration_id?: string;
  public registration_time_stamp?: Date;
  public createdAt?: Date;
  public updatedAt?: Date;
}

export default EcSuppliers; // we use default since when we call it by whatever name the default will come when we import
