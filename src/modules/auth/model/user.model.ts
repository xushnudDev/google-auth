import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Schema({collection: 'users', timestamps: true,versionKey: false})
export class User extends Model {
    @Prop({required: true})
    fullName: string;

    @Prop({required: true})
    email: string;

    @Prop()
    password: string;

    @Prop()
    provider: string;
}

export const UserSchema = SchemaFactory.createForClass(User);