import React,{useState, useEffect} from 'react'
import {  useSelector } from "react-redux";
import Alert from './Alert';
const getLocalStorage = () => {
    let list = localStorage.getItem('form');
    if (list) {
      return (list = JSON.parse(localStorage.getItem('form')));
    } else {
      return [];
    }
  };
const Bookform = () => {
    let product = useSelector((state) => state.allProducts.product);
    const {name: inputname, language: inputLanguage} = product;
  const [alert, setAlert] = useState({ show: false, msg: '', type: '' });

    const [list, setList] = useState(getLocalStorage());
    const [values, setValues] = useState({
        
        name: "",
        language: "",
        myname: "",
        email: "",
    })
    const {name, email} = values;
    const showAlert = (show = false, type = '', msg = '') => {
        setAlert({ show, type, msg });
      };
  
    useEffect(() => {
        if(product){
            setValues({ ...product})
        }
    }, [])
    const handleChange = (e)=>{
       setValues((prevValues)=>({
          ...prevValues,
          [e.target.name]: e.target.value,
       }))
       
    }
    const handleSubmit =(e)=>{
        e.preventDefault();
        if(!values.email){
            showAlert(true, 'danger', 'please fill the form');
        }
        else{
            showAlert(true, 'success', 'Movie booked');
        const newItem = { id: new Date().getTime().toString(), name: values.name, email: values.email, language: values.language,
        myname: values.myname};

        setList([...list, newItem]);
        console.log(list);
        setValues({
          
            myname: "",
            email: "",
        })
        }
       
    }
    useEffect(() => {
        localStorage.setItem('form', JSON.stringify(list))
    }, [list])
    
    return (
        <section>
        <div className='container mt-5 py-5'>
            <div className='row'>
                <div className=' my-5'>
                {alert.show && <Alert {...alert} removeAlert={showAlert} list={list} />}
                </div>
          
                <div className='col-md-8 mx-auto'>
                    <form onSubmit={handleSubmit}>
                       
                        <div class="mb-3">
                            <label for="name" class="form-label">Movie name:</label>
                            <input type="text"  class="form-control" 
                         
                            id="name" placeholder="Enter name" 
                            name='name'
                            onChange={handleChange}
                            value={values.name}
                            />
                        </div>
                        <div class="mb-3">
                            <label for="schedule" class="form-label">Language:</label>
                            <input type="text"  class="form-control" 
                         
                            id="schedule" placeholder="Enter name" 
                            name='schedule'
                            onChange={handleChange}
                            value={values.language}
                            />
                        </div>
                        <div class="mb-3">
                            <label for="myname" class="form-label">Your name</label>
                            <input type="text"  class="form-control" 
                         
                            id="myname" placeholder="Enter Your name" 
                            name='myname'
                            onChange={handleChange}
                            value={values.myname}
                            />
                        </div>
                        <div class="mb-3 mt-3">
                            <label for="email" class="form-label">Email:</label>
                            <input type="text" class="form-control" onChange={handleChange} 
                             value={values.email}
                            id="email" placeholder="Enter Your email" name="email"/>
                        </div>
                      
                        <button type="submit" class="btn my-5 btn-outline-secondary">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    </section>
    )
}

export default Bookform