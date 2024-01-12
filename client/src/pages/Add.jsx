import React, { useEffect, useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import UseFetchData from '../hooks/UseFetchData';
import { useParams } from 'react-router-dom';
import "./Add.scss"

const Add = () => {
  const {data} = UseFetchData()
  const {id} = useParams()
  const [products, setProducts] = useState([]);
  const URL = /^((https?|ftp):\/\/)?(www.)?(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i

  const handleDeleteProduct = async (productId) => {
    await axios.delete(`http://localhost:8000/${productId}`)
  }

  useEffect(() => {
    if (data) {
      setProducts(data);
    }
  }, [data]);

  return (
    <>
      <Helmet>
        <title>Add</title>
      </Helmet>
      <Formik
        initialValues={{ name: '', description: '', price: '', image: '' }}
        validationSchema={Yup.object({
          name: Yup.string()
            .max(15, 'Must be 15 characters or less')
            .required('Required'),
            description: Yup.string()
            .max(50, 'Must be 50 characters or less')
            .required('Required'),
            price: Yup.number().required('Required'),
            image: Yup.string().matches(URL, "Invalid URL").required('Required'),

        })}
        onSubmit={async ( values, { resetForm } ) => {
            try {
              const response = await axios.post("http://localhost:8000/", values)
              setProducts((prevProducts) => [...prevProducts, response.data]);
              resetForm()
            } catch (error) {
              console.log(error);
            }
        }}>
        {formik => (
         <form onSubmit={formik.handleSubmit}>
           <input
             id="name"
             type="text"
             {...formik.getFieldProps('name')}
             placeholder='Name'
           />
           {formik.touched.name && formik.errors.name ? (
             <div>{formik.errors.name}</div>
           ) : null}
 
           <input
             id="description"
             type="text"
             {...formik.getFieldProps('description')}
             placeholder='Description'
           />
           {formik.touched.description && formik.errors.description ? (
             <div>{formik.errors.description}</div>
           ) : null}
 
           <input id="price" type="text" {...formik.getFieldProps('price')} placeholder='price'/>
           {formik.touched.price && formik.errors.price ? (
             <div>{formik.errors.price}</div>
           ) : null}

          <input id="price" type="text" {...formik.getFieldProps('image')} placeholder='image'/>
           {formik.touched.image && formik.errors.image ? (
             <div>{formik.errors.image}</div>
           ) : null}
 
           <button type="submit">Submit</button>
         </form>
       )}
      </Formik>
      <div>
        <table>
          <thead>
            <tr>
              <td>Image</td>
              <td>Name</td>
              <td>Description</td>
              <td>Price</td>
              <td></td>
            </tr>
          </thead>  
          <tbody>
            {
              products && products.map((item) => {
                return (
                  <tr key={item._id}>
                    <td className='w-[80px] h-[80px]'><img src={item.image} alt="" /></td>
                    <td>{item.name}</td>
                    <td>{item.description}</td>
                    <td>{item.price}</td>
                    <td><button onClick={() => handleDeleteProduct(item._id)}>Delete</button></td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Add