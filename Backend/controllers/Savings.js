import User from "../models/UserModel.js";
import {Op} from "sequelize";
import Saving from "../models/SavingModel.js";

export const getSaving = async (req, res) =>{
    try {
        let response;
        if(req.role === "admin"){
            response = await Saving.findAll({
                attributes:['uuid','name','amount','paymentDate'],
                include:[{
                    model: User,
                    attributes:['name','email','idNumber','phoneNumber']
                }]
            });
        }else{
            response = await Saving.findAll({
                attributes:['uuid','name','amount','paymentDate'],
                where:{
                    userId: req.userId
                },
                include:[{
                    model: User,
                    attributes:['name','email','idNumber','phoneNumber']
                }]
            });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const getSavingById = async(req, res) =>{
    try {
        const savings= await Saving.findOne({
            where:{
                uuid: req.params.id
            }
        });
        if(!savings) return res.status(404).json({msg: "Data not found"});
        let response;
        if(req.role === "admin"){
            response = await Saving.findOne({
                attributes:['uuid','name','amount','paymentDate'],
                where:{
                    id: savings.id
                },
                include:[{
                    model: User,
                    attributes:['name','email','idNumber','phoneNumber']
                }]
            });
        }else{
            response = await Saving.findOne({
                attributes:['uuid','name','amount','paymentDate'],
                where:{
                    [Op.and]:[{id: savings.id}, {userId: req.userId}]
                },
                include:[{
                    model: User,
                    attributes:['name','email','idNumber','phoneNumber']
                }]
            });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const createSaving = async(req, res) =>{
    const {name, amount,paymentDate} = req.body;
    try {
        await Saving.create({
            name: name,
            amount: amount,
            paymentDate:paymentDate,
            userId: req.userId
        });
        res.status(201).json({msg: "Product Created Successfuly"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const updateSaving = async(req, res) =>{
    try {
        const savings = await Saving.findOne({
            where:{
                uuid: req.params.id
            }
        });
        if(!savings) return res.status(404).json({msg: "Data not found"});
        const {name, amount, paymentDate} = req.body;
        if(req.role === "admin"){
            await Saving.update({name, amount, paymentDate},{
                where:{
                    id: savings.id
                }
            });
        }else{
            if(req.userId !== savings.userId) return res.status(403).json({msg: "Access Denied"});
            await Saving.update({name, price},{
                where:{
                    [Op.and]:[{id: savings.id}, {userId: req.userId}]
                }
            });
        }
        res.status(200).json({msg: "Savings updated successfuly"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const deleteSaving = async(req, res) =>{
    try {
        const savings = await Saving.findOne({
            where:{
                uuid: req.params.id
            }
        });
        if(!savings) return res.status(404).json({msg: "Data not found"});
        const {name, amount,paymentDate} = req.body;
        if(req.role === "admin"){
            await Saving.destroy({
                where:{
                    id: savings.id
                }
            });
        }else{
            if(req.userId !== savings.userId) return res.status(403).json({msg: "Access Denied"});
            await Saving.destroy({
                where:{
                    [Op.and]:[{id: savings.id}, {userId: req.userId}]
                }
            });
        }
        res.status(200).json({msg: "Savings deleted successfuly"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}