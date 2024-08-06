const express=require('express')
const router=express.Router();
const{createUser, findAll,deleteUser,updateData}=require('../conrollers/userControllers')

router.get('/', findAll)
router.post('/',createUser)
router.delete('/:id',deleteUser)
router.put('/:id',updateData)


module.exports=router;