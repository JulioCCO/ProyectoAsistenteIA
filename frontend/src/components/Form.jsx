import AvocadoForm from "./AvocadoForm";
import WineForm from "./WineForm";
import StrokeForm from "./StrokeForm";
import HeartForm from "./HeartForm";
import RecruitmentForm from "./RecruitmentForm";
import { useState } from "react";
// eslint-disable-next-line react/prop-types
const Form = ({ model, onSubmit, handleInputChange }) => {
  const [isOpen, setIsOpen] = useState(true);
  const onClose = () => {
    onSubmit();
    setIsOpen(false);
  };
  if (model == "aguacate") {
    return (
      <AvocadoForm isOpen={isOpen} onClose={onClose} handleInputChange={handleInputChange} />
    );
  } else if (model == "vino") {
    return (
      <WineForm isOpen={isOpen} onClose={onClose} handleInputChange={handleInputChange}/>
    );
  } else if (model == "cerebro") {
    return (
      <StrokeForm isOpen={isOpen} onClose={onClose} handleInputChange={handleInputChange} />
    );
  }else if (model == "corazón") {
    return (
      <HeartForm isOpen={isOpen} onClose={onClose} handleInputChange={handleInputChange}/>
    );
  } else if (model == "reclutamiento") {
    return (
      <RecruitmentForm isOpen={isOpen} onClose={onClose} handleInputChange={handleInputChange}/>
    );
  }else {
    return (
      null
    );
  }
};

export default Form;
