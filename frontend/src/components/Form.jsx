import AvocadoForm from "./AvocadoForm";
import WineForm from "./WineForm";
import StrokeForm from "./StrokeForm";
import HeartForm from "./HeartForm";
import RecruitmentForm from "./RecruitmentForm";
import { useState } from "react";
import { EmotionForm } from "./EmotionForm";
import BankForm from "./BankForm";
import FlightForm from "./FlightForm";
import MoodForm from "./MoodForm";
import SalaryForm from "./SalaryForm";
import TitanicForm from "./TitanicForm";
import { ErrorForm } from './ErrorForm';

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
      <WineForm isOpen={isOpen} onClose={onClose} handleInputChange={handleInputChange} />
    );
  } else if (model == "cerebro") {
    return (
      <StrokeForm isOpen={isOpen} onClose={onClose} handleInputChange={handleInputChange} />
    );
  } else if (model == "corazón") {
    return (
      <HeartForm isOpen={isOpen} onClose={onClose} handleInputChange={handleInputChange} />
    );
  } else if (model == "reclutamiento") {
    return (
      <RecruitmentForm isOpen={isOpen} onClose={onClose} handleInputChange={handleInputChange} />
    );
  } else if (model == "banco") {
    return (
      <BankForm isOpen={isOpen} onClose={onClose} handleInputChange={handleInputChange} />
    );
  } else if (model == "vuelo") {
    return (
      <FlightForm isOpen={isOpen} onClose={onClose} handleInputChange={handleInputChange} />
    );
  } else if (model == "humor") {
    return (
      <MoodForm isOpen={isOpen} onClose={onClose} handleInputChange={handleInputChange} />
    );
  } else if (model == "salario") {
    return (
      <SalaryForm isOpen={isOpen} onClose={onClose} handleInputChange={handleInputChange} />
    );
  } else if (model == "titanic") {
    return (
      <TitanicForm isOpen={isOpen} onClose={onClose} handleInputChange={handleInputChange} />
    );
  } else if (model == 'emociones') {
    return (
      <EmotionForm isOpen={isOpen} onClose={onClose} handleInputChange={handleInputChange} />
    );
  } else {
    return (
      <ErrorForm />
    );
  }
};

export default Form;
