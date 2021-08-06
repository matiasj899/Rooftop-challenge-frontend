import React, { useEffect, useState } from "react";
import clienteAxios from "../../config/axios";
import Header from "../../components/Header";

import ImageGallery from "react-image-gallery";
import { useForm } from "react-hook-form";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "./Producto.css";
import Footer from "../../components/Footer";

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
  const [inputError, setInputError] = useState("");
  const [successMessage, setSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [hour, setHour] = useState(Number);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
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
    clienteAxios
      .get(`/items/${productId}`)
      .then((res) => {
        console.log(res);
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

    const getTodayDate = dayjs(new Date());
    const now = dayjs(getTodayDate);

    const productOfferExpires = dayjs(products.offer.expires_at);

    const productHour = productOfferExpires.diff(getTodayDate, "minute");
    const productSecond = productOfferExpires.diff(getTodayDate, "second");
    if(productHour!==NaN){
      setHour(productHour);
    }else{console.log('error')}
    
   
  }, [hour]);

  let images: any = [];
  const newImagesArray = products.images.forEach((image) =>
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
            <img src="/images/caret-right-solid.svg"></img>
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
                <div>
                  <p className="before-price">
                    <span>{products.currency}</span>
                    {products.price}
                  </p>
                  <p className="sale-price">
                    <span>{products.currency}</span>
                    {products.offer.price}
                  </p>
                  <p>esta oferta termina en {hour} horas.</p>
                </div>
              ) : (
                <p>
                  <span>{products.currency}</span>
                  {products.price}{" "}
                </p>
              )}
              <button>Comprar ahora</button>
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
                <button type="submit">Enviar</button>
              </div>
            </form>
            {successMessage ? (
              <div className="success-general-cn">
                <div className="successMessage">
                  <p>Pregunta enviada correctamente.</p>
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
