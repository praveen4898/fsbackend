const express=require("express")
const { auth } = require("../middleware/authmiddleware")
const { NoteModel,UserModel } = require("../model/usermodel")

const notesRouter=express.Router()


notesRouter.post("/",auth,async(req,res)=>{
   try {
    const note=new NoteModel(req.body)
    await note.save()
    res.send({"msg":"new note has been added"})
   } catch (error) {
    res.send({"msg":error})
   }
})

notesRouter.get("/",auth,async(req,res)=>{
    try {
        const notes=await NoteModel.find({userID:req.body.userID})
res.send({"msg":"availabale notes are",notes})
    } catch (error) {
        res.send({"msg":"error occured"})
    }
})

notesRouter.patch("/:noteID",auth,async(req,res)=>{
    const {noteID}=req.params
    try {
        const note=await NoteModel.findOne({_id:noteID})
        if(note.userID==req.body.userID){
            await NoteModel.findByIdAndUpdate({_id:noteID},req.body)
            res.send({"msg":"notes has been updated"})
        }
        else{
            res.send({"msg":"you are not authorised to udpate it"})
        }
    } catch (error) {
        res.send({"msg":"error occured"})
    }
})

notesRouter.delete("/:noteID",auth,async(req,res)=>{
    const {noteID}=req.params
    try {
        const note=await NoteModel.findOne({_id:noteID})
        if(note.userID==req.body.userID){
            await NoteModel.findByIdAndDelete({_id:noteID})
            res.send({"msg":"notes has been deleted"})
        }
        else{
            res.send({"msg":"you are not authorised to delete it"})
        }
    } catch (error) {
        res.send({"msg":"error occured"})
    }
})


module.exports={
    notesRouter
}