import React, { useContext, useEffect, useState } from 'react'
import { HeaderComp } from '../Nav/HeaderComp'
import { NavScreen } from '../Nav/NavScreen'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { AuthContext } from '../../auth/context/AuthContext'
import { TYPES } from '../../auth/types/TYPES'
import { SearchCategoriasScreen } from './SearchCategorias'
const URI ='http://localhost:8000/dashboard/getCategorias'
const URI2 ='http://localhost:8000/dashboard/order/'

export const CategoriaScreen = () => {
  
  const {user, dispach} = useContext(AuthContext)

  const navigate = useNavigate()
    const [product, setProduct] = useState([])
    const [search, setSearch] = useState(null)

    useEffect(()=>{
        getProduct()
      }, [])
    
      const getProduct = async () =>{
     const token = user.token
    
        const res = await axios.get(URI,  {
          headers:{"Authorization": `Bearer ${token}` }
        })
        const {message , categorias, name} = res.data

        if(message === 'permitido' || name === 'Admin'){
          setProduct(categorias)
        } else {
          const action = {
            type: TYPES.login,
            payload:{...user,orderUsers:'denegado',name }
          }
          dispach(action)
          navigate('/home')
        }
    }
    const delProduct = async(id)=>{
        await axios.delete(`${URI2}${id}`)
        getProduct()
      }
      const handleSearch = () =>{
        setSearch(true)
      }
      const handleCancel =() =>{
        setSearch(null)
      }
  return (
    <div>
<HeaderComp/>
<div className="container-fluid ">
  <div className="row container_Dash">
 <NavScreen/>
    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
      <div className="d-flex flex-column justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3">
      <h1> Provedores </h1>
      <div>
      <button onClick={handleSearch} className='btn btn-info mb-4'> <i className="fa-solid fa-magnifying-glass"></i> </button>
      <button onClick={handleCancel} className='btn btn-danger mr-3 mb-4'> <i className="fa-solid fa-x"></i> </button>
      </div>
      { search 
        ? <SearchCategoriasScreen/>
       :
       <table className='table text-white '>
       <thead className='table-primary'>
           <tr>
               <th>Descripcion</th>
               <th>Creado</th>
               <th>actualizado</th>
               <th>Action</th>
           </tr>
       </thead>
       <tbody>
           {
             
               product.map((product)=>(
                   <tr key={product.id}> 
                       <td>{product.descripcion}</td>
                       <td>{product.createdAt}</td>
                       <td>{product.updatedAt}</td>
                       <td>
                           <Link to={`/home/categorias/${product.id}`} className='btn btn-info'><i className="fa-solid fa-pen-to-square"></i></Link>
                           <button onClick={()=> delProduct(product.id)} className='btn btn-danger'><i className="fa-solid fa-trash"></i></button>
                       </td>
                   </tr>
               ))
           }
       </tbody>
   </table>
       }
      </div> 
    </main>
  </div>
</div>
    </div>
  )
}
