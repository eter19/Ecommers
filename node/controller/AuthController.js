import { UserModel } from "../models/authModel.js";
import bcryptjs from 'bcryptjs'
import { userModelModal } from "../models/dashModal.js";
import jwt from 'jsonwebtoken'

//funcion de registro

export const register = async(req, res) =>{
    try {
      
        const newUser ={
            name:req.body.name,
             password:req.body.password,
               mail:req.body.mail
          }
        let passHash = await bcryptjs.hash(newUser.password, 8)

        const logUser = await UserModel.findAll({
            where:{
                name:newUser.name
            }
        })
        
        if(logUser.length > 0){
            res.json([{message: 'Ususario ya existente'}])
        } else {
            
        await UserModel.create(
            {name:newUser.name, password:passHash, mail:newUser.mail}
            )
            res.json([{
                'message': 'Usuario creado Correctamente'
            }])
        }
    } catch (error) {
        res.json({message: error.message})
    }
}

export const login = async(req, res)=>{
    try {
        const loginUser={
             name: req.body.name,
             password: req.body.password,
             
        }
        if(!loginUser.name || !loginUser.password){
            res.json([{'message': 'user/pass invalid'}])
        } 
        else 
        {
           const logUser = await userModelModal.findAll({
                where:{
                    name: loginUser.name
                }
            })
            if(logUser.length === 0 || !(await bcryptjs.compare(loginUser.password, logUser[0].password))){
                res.json({'message': 'user/pass invalid'})
            } else {
                    if(logUser[0].name === 'Admin'){
                        const payload = {
                            check:true,
                            editProduct: logUser[0].editProduct,  
                            name: logUser[0].name,
                            mail: logUser[0].mail,
                            cell: logUser[0].cell,
                            direction: logUser[0].direction,
                            editProduct: logUser[0].editProduct,
                            putProduct: logUser[0].putProduct,
                            editUsers: logUser[0].editUsers,
                            editVentas: logUser[0].editVentas,
                            putVentas: logUser[0].putVentas,
                            putFacturas: logUser[0].putFacturas,
                            editFacturas: logUser[0].editFacturas,
                            proveedoresEdit:logUser[0].proveedoresEdit,
                            proveedoresPut:logUser[0].proveedoresPut,
                            editCategorias: logUser[0].editCategorias,
                            putCategorias: logUser[0].putCategorias,
                            id:logUser[0].id
                        }
                        const token = jwt.sign(payload, 'superKeySecret',{
                            expiresIn: '7d'
                        })
                        res.json(
                            {
                                message: 'El usuario ingreso correctamente',
                                token,
                                
                                
                            }
                        )

                    } else {
                        const payload = {
                            check:true,
                            name: logUser[0].name,
                            mail: logUser[0].mail,
                            cell: logUser[0].cell,
                            direction: logUser[0].direction,
                            editProduct: logUser[0].editProduct,
                            putProduct: logUser[0].putProduct,
                            editUsers: logUser[0].editUsers,
                            orderUsers: logUser[0].orderUsers,
                            editVentas: logUser[0].editVentas,
                            putFacturas: logUser[0].putFacturas,
                            editFacturas: logUser[0].editFacturas,
                            putVentas: logUser[0].putVentas,
                            editCategorias: logUser[0].editCategorias,
                            putCategorias: logUser[0].putCategorias,
                            proveedoresEdit:logUser[0].proveedoresEdit,
                            id:logUser[0].id
                           
                        }
                        const token = jwt.sign(payload, 'superKeySecret',{
                            expiresIn: '7d'
                        })
                        res.json(
                            {
                                message: 'El usuario ingreso correctamente',
                                token
                                
                            }
                        )
                    }
                
               
                
                
            }
        }
    } catch (error) {
        res.json({message: error.message})
    }
    
     
}
// * Control-Access *

//Edit Products-control
export const editProduct = async(req, res)=>{
    const dataUser = req.decode
    if(dataUser.name === 'Admin' || dataUser.editProduct === 'permitido'){
        res.json(dataUser)
    } else {
        res.json('Personal no autorizado')
    }
}
export const putProduct = async(req, res)=>{
    const {name , putProduct} = req.decode
    if(name === 'Admin' || putProduct === 'permitido'){
        res.json({message: 'permitido'})
    } else {
        res.json({message: 'denegado', name})
        return
    }
}
//Edit Ventas
export const editVentas =(req, res)=>{
    const dataOrder = req.decode
    if(dataOrder.name === 'Admin' || dataOrder.editVentas === 'permitido'){
        res.json({message:'permitido'})
    } else {
        res.json({message:'No autorizado'})
    }
}
export const putVentas =(req, res)=>{
    const dataOrder = req.decode
    if(dataOrder.name === 'Admin' || dataOrder.putVentas === 'permitido'){
        res.json({message:'permitido'})
    } else {
        res.json({message:'No autorizado'})
    }
}
//Edit Proveerdores
export const proveedoresEdit =(req, res)=>{
    const dataOrder = req.decode
    if(dataOrder.name === 'Admin' || dataOrder.proveedoresEdit === 'permitido'){
        res.json({message:'permitido'})
    } else {
        res.json({message:'No autorizado'})
    }
}
export const proveedoresPut =(req, res)=>{
    const dataOrder = req.decode
    if(dataOrder.name === 'Admin' || dataOrder.proveedoresPut === 'permitido'){
        res.json({message:'permitido'})
    } else {
        res.json({message:'No autorizado'})
    }
}
//Facturas
export const editFacturas =(req, res)=>{
    const dataOrder = req.decode
    if(dataOrder.name === 'Admin' || dataOrder.editFacturas === 'permitido'){
        res.json({message:'permitido'})
    } else {
        res.json({message:'No autorizado'})
    }
}
export const putFacturas =(req, res)=>{
    const dataOrder = req.decode
    if(dataOrder.name === 'Admin' || dataOrder.putFacturas === 'permitido'){
        res.json({message:'permitido'})
    } else {
        res.json({message:'No autorizado'})
    }
}
//Categorias
export const editCategorias =(req, res)=>{
    const dataOrder = req.decode
    if(dataOrder.name === 'Admin' || dataOrder.editCategorias === 'permitido'){
        res.json({message:'permitido'})
    } else {
        res.json({message:'No autorizado'})
    }
}
export const putCategorias =(req, res)=>{
    const dataOrder = req.decode
    if(dataOrder.name === 'Admin' || dataOrder.putCategorias === 'permitido'){
        res.json({message:'permitido'})
    } else {
        res.json({message:'No autorizado'})
    }
}
//Edit Users-control
export const editUsers = (req, res)=>{
    const dataClient = req.decode
    if(dataClient.name === 'Admin' || dataClient.editUsers === 'permitido'){
        res.json(dataClient)
    } else {
        res.json('Personal no autorizado')
    }
}
//Edit Admin-control
export const editAdmin = (req, res)=>{
    const dataAdmin = req.decode
    if(dataAdmin.name === 'Admin' ){
        res.json(dataAdmin)
    } else {
        res.json('Personal no autorizado')
    }
}

//funcion de todos los usuarios//funcion de session



