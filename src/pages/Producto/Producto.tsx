import React, { useEffect, useState } from "react";
import clienteAxios from "../../config/axios";
import Header from "../../components/Header";

import ImageGallery from "react-image-gallery";
import { useForm } from "react-hook-form";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "./Producto.css";
import Footer from "../../components/Footer";
import CountDown from './CountDown';

dayjs.extend(relativeTime);

const Producto = (props: any) => {
  const productId = props.match.params.id;
  const Product = {
    images: [],
    id: "",
    currency: "",
    features: [{ key: "", name: "", value: "" }],
    title: "",
    price: "",
    offer: { price: null, expires_at: "" },
  };
  const Question = [
    {
      answer: "",
      customer_name: "",
      question: "",
      sent_at: "",
    },
  ];

  const [products, setProducts] = useState(Product);
  const [questions, setQuestions] = useState(Question);
  
  const [successMessage, setSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [hour,setHour]=useState(0)
  const [minute,setMinutes]=useState(0)
  const [second,setSeconds]=useState(0)
 
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
if(products.offer!==null ){
setInterval(() => {
    const getTodayDate = dayjs(new Date());



const productExpires=dayjs(products.offer.expires_at)

    
    const productMinutes = productExpires.diff( Number(getTodayDate), "minute");
    const productSeconds = productExpires.diff( Number(getTodayDate), "second");
    setHour(Number(productSeconds))
    setMinutes(productMinutes)
    setSeconds(productSeconds)
    
    
  
    
  }, 1000);
  
  }
  

  const onSubmit = (data: object) => {
    clienteAxios
      .post("/questions", data)
      .then((res) => {
        if (res.status === 201) {
          setSuccessMessage(true);
          reset({ email: "" });
          setTimeout(() => {
            setSuccessMessage(false);
          }, 2000);
        }
      })
      .catch((error) => {
        if (error) {
          setErrorMessage(true);
          setTimeout(() => {
            setErrorMessage(false);
          }, 2000);
        }
      });
  };

  useEffect(() => {
   function getData(){
    clienteAxios
    .get(`/items/${productId}`)
    .then((res) => {
      
      setProducts({ ...Product, ...res.data });
      
    
    })
    .catch((error) => {
      console.log(error);
    });
  clienteAxios
    .get(`/questions/?item_id=${productId}`) 
    .then((res) => {
      setQuestions(res.data);
    })
    .catch((error) => {
      console.log(error);
    });
   }

      
   getData()
  }, [productId]); 

  let images: any = [];
   products.images.forEach((image) =>
    images.push({ original: image })
  );
  const features = products.features.map((feature) => {
    return (
      <tr key={feature.key}>
        <th>{feature.name}</th>
        <td>{feature.value}</td>
      </tr>
    );
  });
  const questionAndAnswers = questions.map((question) => {
    const date = question.sent_at.slice(0, 10);
    return (
      <div className="user-question-cn" key={question.customer_name}>
        <p>
          {question.question} -<span>{question.customer_name}</span>
        </p>
        <div className="user-answer">
          <div className="user-answer-icon-cn">
            {" "}
            <img src="/images/caret-right-solid.svg" alt='caret-icon'></img>
          </div>
          <p>
            {question.answer} <span className="date">{date}</span>
          </p>
        </div>
      </div>
    );
  });
 

  
  return (
    <>
      <Header></Header>
      <div id="productDetail-cn">
        <div className="productDetail-img-info-cn">
          <div className="imageGallery-cn">
            <ImageGallery
              showPlayButton={false}
              autoPlay={true}
              showBullets={true}
              showThumbnails={false}
              items={images}
            ></ImageGallery>
            <div className="productDetail-info-cn">
              <h2>{products.title}</h2>
              {products.offer !== null ? (
                <div className="prices-cn">
                  <p className="before-price">
                    <span>{products.currency}</span>
                    {products.price}
                  </p>
                  <p className="sale-price product-detail">
                    <span>{products.currency}</span>
                    {products.offer.price}
                  </p>
                  <CountDown hour={hour} minute={minute} second={second}></CountDown>
                 
                </div>
              ) : (
                <p className="no-offer-price">
                  <span>{products.currency}</span>
                  {products.price}{" "}
                </p>
              )}
              <div>
              <h4>Devolucion gratis</h4>
              <p>Tenés 30 días desde que lo recibís.</p>
              </div>
              
              <h5>Stock disponible</h5>
              <h5>Cantidad:1 unidad</h5>
              <button className='blue-btn buy'>Comprar ahora</button>
              <button className='blue-btn add-car'>Agregar al carrito</button>
            </div>
          </div>
          <div className="features-cn">
            <h3>Características principales</h3>
            <table>
              <tbody>{features}</tbody>
            </table>
          </div>
          <div className="questions-cn">
            <h4>Preguntas y respuestas</h4>
            <form onSubmit={handleSubmit(onSubmit)}>
              <label>
                Email:
                <input
                  className={errors.email ? "error" : ""}
                  type="email"
                  {...register("email", { required: true })}
                  placeholder="example@.com"
                ></input>
                {errors.email && (
                  <p className="error">Ingrese un email valido.</p>
                )}
              </label>
              <div className="textArea-and-btn">
                <label>
                  Pregúntale al vendedor
                  <textarea
                    className={errors.textarea ? "error" : ""}
                    placeholder="Escribí tu pregunta...
                    
"
                    {...register("textarea", {
                      required: true,
                      minLength: 10,
                      maxLength: 500,
                    })}
                  ></textarea>
                  {errors.textarea && (
                    <p className="error">
                      Su pregunta debe tener entre 10 y 500 caracteres.
                    </p>
                  )}
                </label>
                <button className='blue-btn' type="submit">Enviar</button>
              </div>
            </form>
            {successMessage ? (
              <div className="success-general-cn">
                <div className="successMessage">
                  <p className="sucessfull-send">Pregunta enviada correctamente.</p>
                </div>
              </div>
            ) : null}
            {errorMessage ? (
              <div className="error-general-cn">
                <div className="errorMessage">
                  <p>
                    Algo a salido mal, recarga la pagina y vuelve a intentarlo.
                  </p>
                </div>
              </div>
            ) : null}
          </div>
          <div className="answers-cn">
            <h5>Últimas realizadas</h5>
            <div className="user-question-answer-cn">
              {questions.length > 0 ? (
                questionAndAnswers
              ) : (
                <p>Aun no hay preguntas, se el primero.</p>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
};
export default Producto;
