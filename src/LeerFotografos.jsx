import React from 'react'
import { useState } from 'react'
import {firebase} from './firebase'

const LeerFotografos = () => {

    const[fotografos,setFotografos] = React.useState([])

   React.useEffect(() => {

      const obteberDatos=async ()=>{
       
        try {
            
            const db = firebase.firestore()
            const data = await db.collection('fotografos').get()

            const arryFotografos = data.docs.map(doc=>({id:doc.id,...doc.data()}))

            setFotografos(arryFotografos)
            console.log(arryFotografos) 

        } catch (error) {
            console.log(error)
        }

      }
     obteberDatos()   //ejecuto la funcion de inmediato

   }, [])
   

  return (
    <div className='container mt-3'>
         <div className="row">
            <div className="col-8">

            <ul className="list-group">
                {
               
                fotografos.length===0 ?(
                  <li className="list-group-item" >No hay fotografos </li>

                ):(

                     
                fotografos.map( (item, index) => (

                  <li className="list-group-item" key={item.id}>

                       Nombre: {item.nombre} - Apellido : {item.apellido} 
                   </li>

                  ))
                )

                 }
            </ul>

            </div>
            <div className="col-4">
               Formulario
            </div>
          </div>
   </div>
  )
}

export default LeerFotografos