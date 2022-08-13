import React from 'react'
import { useState } from 'react'
import {firebase} from './firebase'

const AbmFotografos =() => {

    const[fotografos,setFotografos] = React.useState([])
    
   const[modoEdicion,setModoedicion]= React.useState(false)

   const[apyn,setApyn]= React.useState('')


   const[instagram,setInstagram]= React.useState('')



   const[tipo,setTipo]= React.useState('')


   const[idFotografo,setIdFotografo]= React.useState('')


   React.useEffect(() => {

//******************************************************************Obtiene los datos de la base de firebis******************************************************************************************** */
    const obteberDatos=async ()=>{
     
      try {
          
        const db = firebase.firestore()
         const data = await db.collection('fotografos').get()
    
        const arryFotografos = data.docs.map(doc=>({id:doc.id,...doc.data()}))
    
         setFotografos(arryFotografos)

      } catch (error) {
          console.log(error)
      }

    }
   obteberDatos()   //ejecuto la funcion de inmediato para leer los fotografos .

 }, [])
       
//**********************************************************Agrega un nuevo fotografo***************************************************************************************************** */
   const AgregarFotografoSave = async(e)=>{
   
    e.preventDefault()
   
    if( (!apyn.trim()) && (!instagram.trim()) && (!tipo.trim()) ){

      console.log('Elemento vacio')
  
     //  SetMensaje('No se ha escrito niguna tarea...')
      return    
    }

   
    try {
   
      const db = firebase.firestore()

      const NuevoFotografo ={apyn:apyn, instagram: instagram, tipodefotografo: tipo }

      const data = await db.collection('fotografos').add(NuevoFotografo)
      
      setApyn('')
      setInstagram('')
      setTipo('')

      //const data2 = await db.collection('fotografos').get()

      ///const arryFotografos = data2.docs.map(doc=>({id:doc.id,...doc.data()}))

     // setFotografos(arryFotografos)

      setFotografos([...fotografos,{...NuevoFotografo,id:data.id}]) 
       
     // traerDatosBase()
    

      //console.log(arryFotografos)
      }

   
    catch (error) {
      console.log(error)
    }
   }
//******************************************************************Edita un fotografo****************************************************************************************** */
   const EditarFotografo =(item)=>{
        
      setModoedicion(true) 
      setApyn(item.apyn)
      setInstagram(item.instagram)
      setTipo(item.tipodefotografo)
      setIdFotografo(item.id)
      console.log('porque se dispara 1')
  }

  //******************************************************************Edita un fotografo****************************************************************************************** */
  const EditarFotografoSave =async(e)=>{
    
    e.preventDefault()
    try {
      
     const db = firebase.firestore()

     const UpdateFotografo ={apyn:apyn, instagram: instagram, tipodefotografo: tipo }

      let id = idFotografo

     await db.collection('fotografos').doc(id).update(UpdateFotografo)
      
      
   

     const  arrayEditado = fotografos.map(item=> item.id===id ? {id:id, apyn:apyn,instagram:instagram,tipodefotografo:tipo} : item)


     setFotografos(arrayEditado) 

     
     setIdFotografo('')

     setModoedicion(false)
    console.log('porque se dispara 2')
    } 
    catch (error) {
      
    }

  }
//*********************************************************************Eliminar Fotografo************************************************************************************** */

 const EliminarFotografo =async (id)=>{
 
    let arrayFiltrado = [];
    arrayFiltrado= fotografos.filter(item=> item.id!==id)

    setFotografos(arrayFiltrado) 



    try {
   
      const db = firebase.firestore()

      

      await db.collection('fotografos').doc(id).delete()
      
      
      const arrayFiltrado= fotografos.filter(item=> item.id!==id)

      setFotografos(arrayFiltrado) 

      }

   
    catch (error) {
      console.log(error)
    }




 }

//*********************************************************************************************************************************************************************************** */


  return (
    <div className='container mt-3'>
     
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
                          <button className="btn btn-danger  btn-sm float-right mx-2" onClick={()=>EliminarFotografo(item.id)}>Eliminar</button> 

                          <button className="btn btn-warning  btn-sm float-right mx-2" onClick={()=>EditarFotografo(item)}>Editar</button> 
                      </li>

                      ))
                    )

                    }
                </ul>

            </div>
        </div>
      
        <hr>
        </hr>
        <h4 className="text-center">
                    {

                        modoEdicion ? 'Editar formulario' : 'Agregar formulario' 
                    }
                    
                    
                
                
                </h4>
        <form onSubmit={(e)=> modoEdicion? EditarFotografoSave(e):AgregarFotografoSave(e)}> 
        <div className="row">
        
              <div className="col-12">
                  <input  type="text" className="form-control mb-2"  placeholder="Ingrese nombre y apellido" onChange={ (e)=>setApyn(e.target.value)}  value={apyn}  />
              </div>

           

              <div className="col-6">
                 <input  type="text" className="form-control mb-2"  placeholder="Ingrese instagram" onChange={ (e)=>setInstagram(e.target.value)}  value={instagram}  />
              </div>

             
              <div className="col-6">
                 <input  type="text" className="form-control mb-2"  placeholder="Ingrese tipo de fotógrafo" onChange={ (e)=>setTipo(e.target.value)}  value={tipo}  />
              </div>
          
                          
              <div className ='col text-center'>
               {
                                      //EN ESTE CASO NO SE DEVUELVE STRING, ENTONCES VA CON PARENTESIS 

                  modoEdicion? (<button className="btn btn-warning btn-block" type="submit">Editar Fotógrafo</button> ) : (<button className="btn btn-dark btn-block" type="submit">Agregar Fotógrafo</button>)
               }   
                              
            </div>  
                     
           
          </div>
          </form>
   </div>
  )
}

export default AbmFotografos