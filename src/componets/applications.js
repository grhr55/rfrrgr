const express = require('express');
const mongoose = require('mongoose');
const app = express()





mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('Заявки ');
    })
    .catch(err => {
        console.log('Ошибка подключения к MongoDB:', err);
    });


const ZauvSchema = new mongoose.Schema({
    tel: { type: String ,required: true  },
},{ timestamps: true });

const Zauv = mongoose.model('Zauv', ZauvSchema);


app.post( '/zauvs', async(req ,res) => {
  
   try{
    const {tel} = req.body
    const zauv = new Zauv({tel})
    await zauv.save()
    return res.sendStatus(200)
   }catch(error){
   return req.sendStatus(400)

   }
  

})

app.get( '/zauvsi' , async (req,res)=> {

  try{
    const application = await Zauv.find().lean()
    return res.status(200).json(application )

  }catch(error){
   return res.sendStatus(400)

  }

})

app.delete('/zauvsi/:id', async (req, res) => {
  try {
    const deleted = await Zauv.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Не найдено' });
    res.json(deleted);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = app;
