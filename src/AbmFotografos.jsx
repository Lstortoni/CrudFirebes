import React from 'react'
import { useState } from 'react'
import {firebase} from './firebase'

const AbmFotografos = () => {

    const[fotografos,setFotografos] = React.useState([])
    
   const[modeoEdicion,setModoedicion]= React.useState(false)

   const[nombre,setNombre]= React.useState('')

   const[apellido,setApellido]= React.useState('')

   const[instagram,setInstagram]= React.useState('')

   const[pagina,setPagina]= React.useState('')

   const[tipo,setTipo]= React.useState('')


   const agregarFotografo =(e)=>{
    console.log("Agrega")
   }

   const editarFotografo =(e)=>{
       console.log("Edita")
  }

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
     obteberDatos()   //ejecuto la funcion de inmediato para leer los fotografos .

   }, [])
         

  return (
    <div className='container mt-3'>
       <form onSubmit={(e)=> modeoEdicion? editarFotografo(e):agregarFotografo(e)}> 
       <h1 className='text-center'>Listado de fotografos</h1>
         <div className="row">
            <div className="col-12">

                <ul className="list-group">
                    {
                  
                    fotografos.length===0 ?(
                      <li className="list-group-item" >No hay fotografos </li>

                    ):(

                        
                    fotografos.map( (item, index) => (

                      <li className="list-group-item" key={item.id}>

                          Nombre: {item.apyn} - Instagram : {item.instagram} - Tipo de tofografia : {item.tipodefotografo}  
                      </li>

                      ))
                    )

                    }
                </ul>

            </div>
        </div>
        <h1 className='text-center'>Forumulario de edición</h1>
        <div className="row">
        
              <div className="col-6">
                  <input  type="text" className="form-control mb-2"  placeholder="Ingrese nombre" onChange={ (e)=>setNombre(e.target.value)}  value={nombre}  />
              </div>

              <div className="col-6">
                  <input  type="text" className="form-control mb-2"  placeholder="Ingrese apellido" onChange={ (e)=>setApellido(e.target.value)}  value={apellido}  />
              </div>

              <div className="col-4">
                 <input  type="text" className="form-control mb-2"  placeholder="Ingrese instagram" onChange={ (e)=>setInstagram(e.target.value)}  value={instagram}  />
              </div>

              <div className="col-4">
                 <input  type="text" className="form-control mb-2"  placeholder="Ingrese página web" onChange={ (e)=>setPagina(e.target.value)}  value={pagina}  />
              </div>
              <div className="col-4">
                 <input  type="text" className="form-control mb-2"  placeholder="Ingrese tipo de fotógrafo" onChange={ (e)=>setTipo(e.target.value)}  value={tipo}  />
              </div>
          
                          
              <div className ='col text-center'>
               {
                                      //EN ESTE CASO NO SE DEVUELVE STRING, ENTONCES VA CON PARENTESIS 

                  modeoEdicion? (<button className="btn btn-warning btn-block" type="submit">Editar Fotógrafo</button> ) : (<button className="btn btn-dark btn-block" type="submit">Agregar Tarea</button>)
               }   
                              
            </div>  
                     
           
          </div>
          </form>
   </div>
  )
}

export default AbmFotografos